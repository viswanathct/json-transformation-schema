/**
 * Testing the type - object.
 */

describe('Type - object', () => {

	/* Test Targets */
	const jts = require('../../../src');

	/* Helpers */

	/* Mocks */

	/* Setup */

	/* Tests */
	test('transform should handle objects of type - object', async () => {
		const data = {
			a: {
				b: 1,
			},
		};
		const schema = {
			properties:{
				a: {
					properties: {
						b: {},
					},
				},
			},
		};

		expect(jts.transformer(schema).transform(data)).toEqual({
			a: {
				b: 1,
			},
		});
	});
});
