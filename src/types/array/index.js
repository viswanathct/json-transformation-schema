/**
* Type - array
*
* TODO: Write a transformation to handle array specific properties like, items.
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
