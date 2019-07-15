/**
* Type - dynamic
*
*/

/* Delegates */
const types = require('../../types');

/* Helpers */
const { inferType } = require('@laufire/utils').reflection;
const { returnFirstParam } = require('../../core/utils');

const getFormatter = (targetType) => (value, schema, options) => {
	const sourceType = inferType(value);
	return (
		((types[sourceType] || {}).formatters || {})[targetType]
		|| ((types[targetType] || {}).parsers || {})[sourceType]
		|| returnFirstParam)(value, schema, options);
}

/* Exports */
module.exports = {
	formatters: {
		integer: getFormatter('integer'),
		number: getFormatter('number'),
		boolean: getFormatter('boolean'),
		null: () => null,
		object: getFormatter('object'),
		array: getFormatter('array'),
	},
};
