/**
* Type - String
*
*/

/* Imports */
const { delimiter: defaultDelimiter } = require('../../constants/defaults');
const { valueFn } = require('../../core/utils');

/* Helpers */
const toString = (value) => value.toString()

/* Exports */
module.exports = {
	parsers: {
		integer: toString,
		number: toString,
		boolean: toString,
		object: valueFn(JSON.stringify),
		null: () => '',
		array: (value, schema) =>
			value.join(schema.delimiter !== undefined ? schema.delimiter : defaultDelimiter),
	},
	transform: (value, schema) => {
		if(schema.trim)
			value = value.trim();

		return value;
	},
};