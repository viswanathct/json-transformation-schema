/**
 * Entry point
 */

describe('Functionalities of transform', () => {

	/* Test Targets */
	const jst = require('../src');

	/* Helpers */

	/* Mocks */

	/* Setup */

	/* Tests */
	test('transform should handle simple transformations', async () => {
		const data = {
			a: 1,
		};
		const schema = {
			properties: {
				a: {},
			},
		};

		expect(jst.transformer(schema).transform(data)).toEqual({
			a: 1,
		});
	});
});
