/**
 * Testing the core.
 */

describe('Functionality of the core', () => {

	/* Test Targets */
	const { standardizeSchema, transform } = require('../../src/core');

	/* Helpers */
	const verifyTransformation = ({data, schema, expectation, info = ''}) => {
		info && console.log(info);
		const transformed = transform(data, standardizeSchema(schema)); //NOTE: The test helper, verifyTransformation could not be used, as the test is for a different function.
		expect(transformed).toEqual(expectation);
		return transformed;
	}

	/* Tests */
	test('standardizeSchema adds default props and calls relevant type-handlers', async () => { //TODO: Write relevant tests.
		standardizeSchema;
	});

	test('transform handles flat schemas for primitive types', async () => {
		expect(transform('1.1', { transform: 'integer' })).toEqual(1);
	});

	test('transform handles nested schemas for complex types', async () => {
		const data = {
			a: {
				b: 1,
			},
		};
		const schema = {
			properties: {
				a: {
					properties: {
						b: {},
					},
				},
			},
		};
		const expectation = data;

		verifyTransformation({data, schema, expectation});
	});

	test('transform should handle type-agnostic config', async () => {
		const data = {};
		const schema = {
			properties: {
				a: {
					default: 'default',
				},
			},
		};
		const expectation = {
			a: 'default',
		};

		verifyTransformation({data, schema, expectation});
	});
});
