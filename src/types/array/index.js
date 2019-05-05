/**
* Type - Array
*
*/

/* Imports */
const { delimiter: defaultDelimiter } = require('../../costants/defaults');

/* Exports */
module.exports = {
	parsers: {
		string: (value, schema) =>
			value.join(schema.delimiter !== undefined ? schema.delimiter : defaultDelimiter),
	},
};
