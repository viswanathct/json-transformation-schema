/**
* Type - object
*
*/

/* Imports */
const { select } = require('@laufire/utils').collection;
const core = require('../../core');

/* Helpers */
const { assign, entries, keys } = Object;

/* Config */
const schemaDefaults = {
	preserve: false,
}

/* Exports */
module.exports = {
	standardizeSchema: (schema) => {
		const properties = {};
		const itemsConfig = schema.items;

		entries(schema.properties || {}).forEach(([prop, fieldSchema]) =>
			properties[prop] = assign({ prop }, itemsConfig, core.standardizeSchema(fieldSchema))
		);

		return assign({}, schemaDefaults, schema, { properties });
	},
	transform: (data, schema, options) => {
		const ret = {};
		const { properties = {} } = schema;
		const propList = keys(properties || {});

		if(schema.preserve === true) {
			const allProps = keys(data || {});
			const untouchedProps = allProps.filter((prop) => !propList.includes(prop));
			assign(ret, select(data, untouchedProps));
		}

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
