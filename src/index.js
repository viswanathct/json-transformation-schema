/**
* JST
*/

/* Imports */
const { standardizeSchema, transform } = require('./core');

/* Exports */
const transformer = (schema, options = {}) => {
	schema = standardizeSchema(schema); //TODO: Clone the intial schema, so that mutations won't be a concern.

	return {
		transform: (data) => transform(data, schema, options),
	}
}

module.exports = {
	transformer,
}
