/**
* Testing the type - boolean
*/

describe('Type - boolean', () => {

	/* Test Targets */
	const jts = require('../../../src');

	/* Helpers */
	const { entries } = Object;

	/* Tests */
	test('parsing values of various types', async () => {
		const postiveValues = {
			number: 1,
			integer: 1,
			string: 'non-empty-string',
			array: ['not', 'empty'],
			object: {
				empty: false,
			},
		};

		const negativeValues = {
			number: 0,
			integer: 0,
			string: '',
			array: [],
			object: {},
			null: null,
		};

		const testSet = (valueSet, expectedConversion) => {

			const dataTemplate = {
				someProp: '',
			};

			const schemaTemplate = {
				properties: {
					someProp: {
						source: {
							type: 'is-reset-per-test',
						},
						transform: 'boolean',
					},
				},
			};

			entries(valueSet).forEach(([sourceType, value]) => {
				dataTemplate.someProp = value;
				schemaTemplate.properties.someProp.source.type = sourceType;

				expect(jts.transformer(schemaTemplate).transform(dataTemplate)).toEqual({
					someProp: expectedConversion,
				});
			});
		};

		testSet(postiveValues, true);
		testSet(negativeValues, false);
	});
});