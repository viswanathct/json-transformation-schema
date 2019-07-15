/**
* Type - date
*
* TODO: Allow handling of timezones.
* NOTE: The reason for choosing luxon over datefns is that, the parsing function of datefns doesn't support custom formats. This seems to be fixed in the upcoming version (v2.0.0).
*/

/* Imports */
const { DateTime } = require('luxon');

/* Helpers */
const { inferType } = require('@laufire/utils').reflection;

/* Data */
const { dateFormat: defaultDateFormat } = require('../../constants/defaults');

/* Exports */
module.exports = {
	parsers: {
		string: (value, schema) =>
			DateTime.fromFormat(value, schema.format || defaultDateFormat, {zone: 'utc'}).toJSDate(),
	},
	formatters: {
		string: (value, schema) =>
			DateTime.fromJSDate(value).toUTC().toFormat(schema.format || defaultDateFormat),
	},

	validate: (value) => inferType(value) === 'date' && isNaN(value),
};
