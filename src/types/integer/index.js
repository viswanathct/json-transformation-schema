/**
* Type - integer
*
*/

/* Imports */
const { valueFn } = require('../../core/utils');

/* Helpers */
const { floor, round } = Math;

/* Exports */
module.exports = {
	parsers: {
		number: (value) => round(value),
		boolean: (value) => value ? 1 : 0,
		string: valueFn(parseInt),
		null: () => 0,
	},
	validate: (value) => typeof value === 'number' && floor(value) === value,
};
