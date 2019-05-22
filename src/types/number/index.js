/**
* Type - number
*
* TODO: Adhere to the properties like, multipleOf etc.
*/

/* Imports */
const { returnFirstParam, valueFn } = require('../../core/utils');

/* Exports */
module.exports = {
	parsers: {
		boolean: (value) => value ? 1 : 0,
		integer: returnFirstParam,
		string: valueFn(parseFloat),
		null: () => 0,
	},

	validate: (value) =>typeof value === 'number' && !isNaN(value),
};
