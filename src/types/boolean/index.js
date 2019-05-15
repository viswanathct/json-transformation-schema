/**
* Type - boolean
*
*/

/* Imports */
const { valueFn } = require('../../core/utils');

/* Helpers */
const { keys } = Object;
const toBool = valueFn(Boolean);

/* Exports */
module.exports = {
	parsers: {
		string: toBool,
		integer: toBool,
		number: toBool,
		null: () => false,
		array: (value) => Boolean(value.length),
		object: (value) => Boolean(keys(value).length),
	},
};
