/**
* Type - array
*
*/

/* Imports */
const { delimiter: defaultDelimiter } = require('../../constants/defaults');

/* Exports */
module.exports = {
	parsers: {
		string: (value, schema) =>
			value.split(schema.delimiter !== undefined ? schema.delimiter : defaultDelimiter),
	},
};
