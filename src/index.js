/**
* JST
*/

/* Imports */
const { standardizeSchema, transform } = require('./core');

/* Exports */
const transformer = (schema, options = {}) => {
	schema = standardizeSchema(schema.properties);

	return {
		transform: (data) => transform(data, schema, options),
	}
}

module.exports = {
	transformer,
}
