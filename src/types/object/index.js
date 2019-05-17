/**
* Type - object
*
*/

/* Imports */
const { assign, collect, keys, select } = require('@laufire/utils').collection;
const { standardizeSchema, transform } = require('../../core');

/* Config */
const schemaDefaults = {
	preserve: false,
}

/* Exports */
module.exports = {
	standardizeSchema: (schema) => {
		const itemsConfig = schema.items;
		const properties = collect(schema.properties || {}, (propSchema, prop) =>
			assign({ prop }, itemsConfig, standardizeSchema(propSchema))
		);

		return assign({}, schemaDefaults, schema, { properties });
	},
	transform: (data, schema, options) => {
		const ret = {};
		const { properties = {} } = schema;
		const propList = keys(properties || {});

		if(schema.preserve === true && data) {
			const allProps = keys(data);
			const untouchedProps = allProps.filter((prop) => !propList.includes(prop));
			assign(ret, select(data, untouchedProps));
		}

		const propCount = propList.length;
		let propIndex = 0;

		while(propIndex < propCount) {
			const prop = propList[propIndex++];
			const propSchema = properties[prop] || {};
			const value = transform(data[propSchema.prop || prop], propSchema, options);

			if(value !== undefined) //NOTE: To have undefined keys in the result, set the config - default to undefined.
				ret[prop] = value;
		}

		return ret;
	},
};
