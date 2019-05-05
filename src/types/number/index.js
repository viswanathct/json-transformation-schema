/**
* Type - String
*
*/

/* Helpers */
const { round } = Math;

/* Exports */
module.exports = {
	parsers: {
		integer: (value) => round(value),
		boolean: (value) => Boolean(value),
		null: () => 0,
	},
};
