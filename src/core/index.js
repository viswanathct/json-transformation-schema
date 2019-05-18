/**
* Helpers
*/

/* Imports */
const { result } = require('@laufire/utils').collection;
const { inferType } = require('./utils');
const types = require('../types');

/* Data */
const typesByConfigMarkers = [
	['properties', 'object'],
	['items', 'array'], //NOTE: Though objects too could have the items config, arrays are considered to be the primary user.
];

/* Helpers */
const { keys } = Object;

const detectType = (() => {
	const typeMarkers = typesByConfigMarkers.map((item) => item[0]);
	const types = typesByConfigMarkers.map((item) => item[1]);

	return (schema) => {
		const props = keys(schema);
		const typeMarkerCount = typeMarkers.length;
		let typeMarkerIndex = 0;

		while(typeMarkerIndex < typeMarkerCount) {
			const marker = typeMarkers[typeMarkerIndex++];
			const matchingPropIndex = props.findIndex(val => val === marker);
			if(matchingPropIndex > -1)
				return types[typeMarkers.indexOf(props[matchingPropIndex])];
		}
	}
})();

const translate = (() => {
	const fakeTypeHandler = { parsers: {}, formatters: {} };

	return  (value, schema, type) => {
		const inType = (schema.source || {}).type || type;
		const outType = schema.transform;

		const translator = ((types[inType] || fakeTypeHandler).formatters|| {})[outType]
			|| ((types[outType] || fakeTypeHandler).parsers || {})[inType];

		return translator ? translator(value, schema) : value;
	}
})();

/* Exports */
const standardizeSchema = (schema, options = {}) => {
	const { source } = schema;
	const type = schema.type || detectType(schema);
	const standardizeTypeSchema = (types[type] || {}).standardizeSchema;

	return {
		...options.defaults,
		...(type && { type, ...((options.typeDefaults || {})[type]) }),
		...schema,
		...(source && { source: standardizeSchema(source, options) }),
		...(standardizeTypeSchema && standardizeTypeSchema(schema, options)),
	};
}

const transform = (value, schema, options) => { //TODO: Try compiling the flow using eval, so that every tranformation has its own function, without branching.
	const source = schema.source;

	if(source) {
		value = transform(value, source, options);
	}

	value = schema.prop ? result(value, schema.prop) : value;

	if(schema.required && value === undefined)
		throw new Error(schema.prop ? `Missing required prop: ${schema.prop}` : 'Missing required value');

	const type = schema.type || inferType(value);
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
