/**
* Type - number
*
*/

/* Imports */
const { returnFirstParam, valueFn } = require('../../core/utils');

/* Exports */
module.exports = {
	parsers: {
		boolean: valueFn(Boolean),
		integer: returnFirstParam,
		null: () => 0,
		string: valueFn(parseFloat),
	},
};
