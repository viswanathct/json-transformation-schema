/**
* JTS - The main entrypoint.
*/

/* Imports */
const { clone } = require('@laufire/utils').collection;

/* Helpers */
const { standardizeSchema, transform } = require('./core');

/* Data */
const errors = require('./core/errors');
const { transformerOptions: defaultTransformerOptions } = require('./constants/defaults');

/* Exports */
const transformer = (schema, options) => {
	options = clone(options || defaultTransformerOptions);
	schema = standardizeSchema(clone(schema), options);

	return {
		transform: (data) => {

			try {
				return transform(data, schema, options);
			}
			catch(e) {
				if(options.strict || !errors[e.name])
					throw e;
			}
		},
	}
}

module.exports = {
	transformer,
}
