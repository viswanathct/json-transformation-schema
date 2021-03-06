/**
 * The cheatsheet.
 */


/* Imports */
const { stringify } = JSON;
const jts = require('../src');

/* Helpers */
const { log, runExamples } = require('./helpers');
const transformData = (data, transformation) => log(stringify(jts.transformer(transformation).transform(data)));

/* Data */
const data = {
	a: 1,
	c: {
		d: 1,
	},
};

/* Examples */
const examples = {

	'Simple Example': () => {
		const transformation = {
			properties: {
				a: {
					type: 'number',
					targetType: 'string',
				},
			},
		};

		transformData(data, transformation);
	},

	'Transformation Functions': () => {
		const transformation = {
			properties: {
				b: {
					prop: 'a',
					transform: (val) => val + 1,
				},
			},
		};

		transformData(data, transformation);
	},

	'Nested Objects': () => {
		const transformation = {
			properties: {
				c: {
					properties: {
						d: {},
					},
				},
			},
		};

		transformData(data, transformation);
	},
};

/* Main */
runExamples(examples);

module.exports = {
	examples,
}
