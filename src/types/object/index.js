/**
* Type - object
*
*/

/* Helpers */
const { assign, collect, keys, merge, select } = require('@laufire/utils').collection;
const { standardizeSchema, transform } = require('../../core');
const { inferType } = require('@laufire/utils').reflection;

/* Config */
const schemaDefaults = {
	preserve: false,
}

/* Exports */
module.exports = {
	standardizeSchema: (schema, options) => {
		const itemsConfig = schema.items;
		const properties = collect(schema.properties || {}, (propSchema, prop) =>
			merge({ prop }, itemsConfig, standardizeSchema(propSchema, options))
		);

		return merge({}, schemaDefaults, schema, { properties });
	},
	transform: (data, schema, options) => {
		const ret = {};
		const { properties = {} } = schema;
		const propList = keys(properties);

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
			const value = transform(data, propSchema, options);

			if(value !== undefined) //NOTE: To have undefined keys in the result, set the config - default to undefined.
				ret[prop] = value;
		}

		return ret;
	},
	parsers: {
		string: (value) =>
			JSON.parse(value),
	},
	validate: (value) => inferType(value) === 'object',
};
