/**
* Type - array
*
* TODO: Write a transformation to handle array specific properties like, items.
* NOTE: Arrays support pattern delimiters.
*/

/* Imports */
const { assign } = require('@laufire/utils').collection;
const { delimiter: defaultDelimiter } = require('../../constants/defaults');
const { standardizeSchema, transform } = require('../../core');

/* Exports */
module.exports = {
	parsers: {
		string: (value, schema) =>
			value.split(schema.delimiter !== undefined ? schema.delimiter : defaultDelimiter),
	},
	standardizeSchema: (schema, options) => {
		const items = schema.items ? standardizeSchema(schema.items, options) : undefined;
		return assign(items ? { items } : {}, schema);
	},
	transform: (values, schema, options) =>
		schema.items
			? values.map((item) => transform(item, schema.items, options))
			: values,
};
