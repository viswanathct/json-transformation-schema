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
const { assign, clone, keys, result } = require('@laufire/utils').collection;
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

	return  (type, value, schema, options) => {
		const inType = (schema.source || {}).type || type;
		const outType = schema.transform;

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
	assign(clone(defaultTransformerOptions), clone(options));

/**
 *
 * @param {*} schema - The schema to standardize.
 * @param {*} options - Standardized options.
 */
const standardizeSchema = (schema, options) => {
	if(inferType(schema) == 'function') //NOTE: Async Functions aren't supported.
		return { type: 'function', transform: schema }

	const { source } = schema;
	const type = schema.type || detectType(schema);
	const typeSchemaStandaridizer = (options.types[type] || types[type] || {}).standardizeSchema;

	return {
		...options.defaults,
		...(type && { type, ...(options.typeDefaults)[type] }),
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

	if(source)
		value = transform(value, source, options);

	value = schema.prop ? result(value, schema.prop) : value;

	if(schema.required && value === undefined)
		throw new error.MissingRequired(schema.prop ? `Missing required prop: ${schema.prop}` : 'Missing required value');

	const type = schema.type || inferType(value);
	const typeHandler = options.types[type] || types[type] || {};
	if(typeHandler.transform)
		value = typeHandler.transform(value, schema, options);

	const transformation = schema.transform;
	if(transformation) {
		value = typeof transformation !== 'function'
			? translate(type, value, schema, options)
			: transformation(value, schema, options)
	}

	if(value === undefined && schema.hasOwnProperty('default'))
		value = schema.default;

	return value;
}

module.exports = {
	standardizeOptions,
	standardizeSchema,
	transform,
}
