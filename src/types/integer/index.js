/**
* Type - integer
*
*/

/* Imports */
const { valueFn } = require('../../core/utils');

/* Helpers */
const { round } = Math;

/* Exports */
module.exports = {
	parsers: {
		number: (value) => round(value),
		boolean: valueFn(Boolean),
		null: () => 0,
		string: valueFn(parseInt),
	},
};
