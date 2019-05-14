/**
 * Testing the type - array.
 */

describe('Type - object', () => {

	/* Test Targets */
	const jts = require('../../../src');

	/* Tests */
	test('transform should transform a default delimited string to an array', async () => {
		const data = {
			someProp: 'a, b',
		};
		const schema = {
			properties:{
				someProp: {
					type: 'string',
					transform: 'array',
				},
			},
		};

		const transformed = jts.transformer(schema).transform(data).someProp;

		expect(transformed).toEqual(['a', 'b']);
	});

	test('transform should transform a custom delimited string to an array', async () => {
		const data = {
			someProp: 'a|b',
		};
		const schema = {
			properties:{
				someProp: {
					type: 'string',
					transform: 'array',
					delimiter: '|',
				},
			},
		};

		const transformed = jts.transformer(schema).transform(data).someProp;

		expect(transformed).toEqual(['a', 'b']);
	});
});
