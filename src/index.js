/**
* JTS - The main entrypoint.
*/

/* Imports */
const { clone } = require('@laufire/utils').collection;
const { standardizeSchema, transform } = require('./core');

/* Exports */
const transformer = (schema, options = {}) => {
	schema = standardizeSchema(clone(schema));

	return {
		transform: (data) => transform(data, schema, options),
	}
}

module.exports = {
	transformer,
}
