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
const { assign, entries, keys } = Object;

const detectType = (() => {
	const propMarkers = typesByPropMarkers.map((item) => item[0]);
	const types = typesByPropMarkers.map((item) => item[1]);

	return (fieldSchema) => {
		const props = keys(fieldSchema);
		const l = props.length;
		let i = 0;

		while(i < l) {
			const index = propMarkers.findIndex(val => val === props[i++]);
			if(index > -1)
				return types[index];
		}
	}
})();

const translate = (value, schema) => {
	const inType = (schema.source || {}).type || inferType(value);
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
	const ret = {};

	entries(schema).forEach(([field, fieldSchema]) => {
		const type = fieldSchema.type || detectType(fieldSchema);
		const standardSchema = {
			...(type ? { type: type } : {}),
			prop: field,
		};
		const standardizeFieldSchema = (types[type] || {}).standardizeSchema || assign;

		ret[field] = standardizeFieldSchema(standardSchema, fieldSchema);
	});

	return ret;
}

const transform = (data, schema, options = {}) => {
	const ret = {};
	const fields = keys(schema);
	const fieldCount = fields.length;
	let fieldIndex = 0;

	while(fieldIndex < fieldCount) {
		const field = fields[fieldIndex++];
		const fieldSchema = schema[field];
		const source = fieldSchema.source;
		const prop = fieldSchema.prop;
		let value = prop !== undefined ? data[prop] : data;

		if(source) { //TODO: Try compiling the flow using eval, so that every tranformation has its own function, without branching.
			value = transform(data, source, options);
		}

		if(value == undefined && fieldSchema.required)
			throw new Exception(`Missing required field: ${field}`);

		const typeHandler = types[fieldSchema.type] || {};
		if(typeHandler.transform)
			value = typeHandler.transform(value, fieldSchema);

		const transformation = fieldSchema.transform;
		if(transformation) {
			value = typeof transformation !== 'function'
				? translate(value, fieldSchema)
				: transformation(value, fieldSchema)
		}

		if(value === undefined && fieldSchema.hasOwnProperty('default'))
			value = fieldSchema.default;

		if(value !== undefined || !options.skipUndefined)
			ret[field] = value;
	}

	return ret;
}

module.exports = {
	standardizeSchema,
	transform,
}
