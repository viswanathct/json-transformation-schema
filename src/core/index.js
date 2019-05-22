/**
* The Core
*/

/* Data */
const { transformerOptions: defaultTransformerOptions } = require('../constants/defaults');
const types = require('../types');
const error = require('./errors');
const typesByConfigMarkers = [
	['properties', 'object'],
	['items', 'array'], //NOTE: Though objects too could have the items config, arrays are considered to be the primary user.
];

/* Helpers */
const { keys, merge, result } = require('@laufire/utils').collection;
const { inferType } = require('@laufire/utils').reflection;

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

	return  (value, schema, options) => {
		const inType = (schema.source || {}).targetType || schema.type || inferType(value);
		const outType = schema.targetType;

		const translator =
			((options.types[inType] || fakeTypeHandler).formatters || {})[outType]
			|| ((options.types[outType] || fakeTypeHandler).parsers || {})[inType]
			|| ((types[inType] || fakeTypeHandler).formatters || {})[outType]
			|| ((types[outType] || fakeTypeHandler).parsers || {})[inType];

		return translator ? translator(value, schema) : value;
	}
})();

/* Exports */
const standardizeOptions = (options) =>
	merge({}, defaultTransformerOptions, options);

/**
 *
 * @param {*} schema - The schema to standardize.
 * @param {*} options - Standardized options.
 */
const standardizeSchema = (schema, options) => {
	if(inferType(schema) == 'function') //NOTE: Async Functions aren't supported.
		schema = { type: 'function', transform: schema }

	const { source } = schema;
	const type = schema.type || detectType(schema);
	const typeSchemaStandaridizer = (options.types[type] || types[type] || {}).standardizeSchema;

	return {
		...options.defaults,
		...(type && merge({ type }, options.typeDefaults[type])),
		...schema,
		...(source && { source: standardizeSchema(source, options) }),
		...(typeSchemaStandaridizer && typeSchemaStandaridizer(schema, options)),
	}
}

/**
 *
 * @param {*} value - The value to transform.
 * @param {*} schema - A standardized schema to base the transformation on.
 * @param {*} options - Standardized options for the transformation.
 */
const transform = (value, schema, options) => { //TODO: Try compiling the flow using eval, so that every tranformation has its own function, without branching.
	const source = schema.source;

	value = schema.prop ? result(value || {}, schema.prop) : value; // Allow for accessing descendants, through the config - prop.

	if(source)
		value = transform(value, source, options);

	if(schema.required && value === undefined)
		throw new error.MissingRequired(schema.prop ? `Missing required prop: ${schema.prop}` : 'Missing required value');

	const type = schema.type;
	const typeHandler = options.types[type] || types[type] || {};
	if(value !== undefined && typeHandler.transform)
		value = typeHandler.transform(value, schema, options);

	if(value !== undefined && schema.transform)
		value = schema.transform(value, schema, options)

	if(value !== undefined && schema.targetType)
		value = translate(value, schema, options);

	if(value === undefined && schema.hasOwnProperty('default'))
		value = schema.default;

	return value;
}

module.exports = {
	standardizeOptions,
	standardizeSchema,
	transform,
}
