/**
* Type - object
*
*/

/* Imports */
const core = require('../../core');

/* Helpers */
const { assign, entries, keys } = Object;

/* Config */
const schemaDefaults = {
	preserve: true,
	//TODO: Plan for a prop - items, that acts like Array.items.
}

/* Exports */
module.exports = {
	standardizeSchema: (schema) => {
		const properties = {};

		entries(schema.properties || {}).forEach(([prop, fieldSchema]) =>
			properties[prop] = assign({ prop }, core.standardizeSchema(fieldSchema))
		);

		return assign({}, schemaDefaults, schema, { properties });
	},
	transform: (data, schema, options) => {
		const ret = {};
		const { properties = {} } = schema;
		const propList = keys((schema.preserve !== false ? data : properties) || {});
		const propCount = propList.length;
		let propIndex = 0;

		while(propIndex < propCount) {
			const prop = propList[propIndex++];
			const propSchema = properties[prop] || {};
			const value = core.transform(data[propSchema.prop || prop], propSchema, options);

			if(value !== undefined || !options.skipUndefined)
				ret[prop] = value;
		}

		return ret;
	},
};
