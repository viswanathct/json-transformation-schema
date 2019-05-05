/**
* Type - Date
*
* NOTE: The reason for choosing luxon over datefns is that the parsing function of datefns doesn't support custom formats. This seems to be fixed in the upcoming veriosn (v2.0.0).
*/

/* Imports */
const { DateTime } = require('luxon');
const { returnNothing } = require('../../core/utils');
const { dateFormat: defaultDateFormat } = require('../../constants/defaults');

const getParser = (schema) =>
	schema.source.format
		? (val) => DateTime.fromFormat(val, source.format || defaultDateFormat)
		: () => {};

const getFormatter = (schema) =>
	schema.format
		? (val) => DateTime.toFormat(val, schema.format || defaultDateFormat)
		: returnNothing;

/* Exports */
module.exports = {
	parsers: {
		string: (value, schema) => getParser(schema)(value),
	},
	formatters: {
		string: (value, schema) => getFormatter(schema)(value),
	},
};
