/**
* JTS - The main entrypoint.
*/

/* Imports */
const { clone } = require('@laufire/utils').collection;

/* Helpers */
const { standardizeOptions, standardizeSchema, transform } = require('./core');

/* Data */
const errors = require('./core/errors');

/* Exports */
const core = require('./core');

const transformer = (schema, options = {}) => {
	options = standardizeOptions(options);
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
	core,
	transformer,
}
