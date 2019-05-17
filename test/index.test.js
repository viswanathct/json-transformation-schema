/**
 * Entry point
 */

describe('Functionalities of transform', () => {

	/* Test Targets */
	const jts = require('../src');

	/* Helpers */

	/* Mocks */

	/* Setup */

	/* Tests */
	test('transform should handle simple transformations', () => {
		const data = {
			a: 1,
		};
		const schema = {
			properties: {
				a: {},
			},
		};

		expect(jts.transformer(schema).transform(data)).toEqual({
			a: 1,
		});
	});
});
