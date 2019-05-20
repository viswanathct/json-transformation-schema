/**
* Type - dynamic
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
		null: () => '',
		object: valueFn(JSON.stringify),
		array: (value, schema) =>
			value.join(schema.delimiter !== undefined ? schema.delimiter : defaultDelimiter),
	},
};
