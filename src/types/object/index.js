/**
* Type - object
*
*/

/* Imports */
const core = require('../../core');

/* Helpers */
const { assign } = Object;

/* Exports */
const standardizeSchema = (standardSchema, fieldSchema) =>
	assign(standardSchema, {
		properties: core.standardizeSchema(fieldSchema.properties),
	});

module.exports = {
	standardizeSchema,
	transform: (value, schema, options) => core.transform(value, schema.properties, options),
};
