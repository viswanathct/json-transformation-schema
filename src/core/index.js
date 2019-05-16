/**
* Helpers
*/

/* Imports */
const { inferType } = require('./utils');
const types = require('../types');

/* Data */
const typesByPropMarkers = [
	['properties', 'object'],
];

/* Helpers */
const { keys } = Object;

const detectType = (() => {
	const propMarkers = typesByPropMarkers.map((item) => item[0]);
	const types = typesByPropMarkers.map((item) => item[1]);

	return (schema) => {
		const props = keys(schema);
		const l = props.length;
		let i = 0;

		while(i < l) {
			const index = propMarkers.findIndex(val => val === props[i++]);
			if(index > -1)
				return types[index];
		}
	}
})();

const translate = (value, schema, type) => {
	const inType = (schema.source || {}).type || type;
	const outType = schema.transform;
	const fakeTypeHandler = { parsers: {}, formatters: {} }

	if(!outType || inType === outType)
		return value;

	const translator = ((types[inType] || fakeTypeHandler).formatters|| {})[outType]
		|| ((types[outType] || fakeTypeHandler).parsers || {})[inType];

	return translator ? translator(value, schema) : value;
}

/* Exports */
const standardizeSchema = (schema) => {
	const { source } = schema;
	const type = schema.type || detectType(schema);
	const standardizeTypeSchema = (types[type] || {}).standardizeSchema;

	return {
		...(type ? { type: type } : {}),
		...schema,
		...(standardizeTypeSchema ? standardizeTypeSchema(schema) : {}),
		...(source ? { source: standardizeSchema(source) } : {}), //TODO: This could be a hinderance, if the types wanted to modify the source prop. This could be remedied by working over the clone of the root schema.
	};
}

const transform = (value, schema, options) => {
	const source = schema.source;
	const type = schema.type || inferType(value);

	if(source) { //TODO: Try compiling the flow using eval, so that every tranformation has its own function, without branching.
		value = transform(value, source, options);
	}

	if(value == undefined && schema.required)
		throw new Exception(`Missing required field: ${field}`);

	const typeHandler = types[type] || {};
	if(typeHandler.transform)
		value = typeHandler.transform(value, schema, options);

	const transformation = schema.transform;
	if(transformation) {
		value = typeof transformation !== 'function'
			? translate(value, schema, type)
			: transformation(value, schema)
	}

	if(value === undefined && schema.hasOwnProperty('default'))
		value = schema.default;

	return value;
};

module.exports = {
	standardizeSchema,
	transform,
}
