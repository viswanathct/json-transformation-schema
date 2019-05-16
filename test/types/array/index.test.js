/**
 * Testing the type - array.
 */

describe('Type - array', () => {

	/* Helpers */
	const { verifyTransformation } = require("../../test-helpers");

	/* Tests */
	test('transform should transform a default delimited string to an array', async () => {
		const data = 'a, b';
		const schema = {
			type: 'string',
			transform: 'array',
		};
		const expectation = ['a', 'b'];

		verifyTransformation({ data, schema, expectation });
	});

	test('transform should transform a custom delimited string to an array', async () => {
		const data = 'a|b';
		const schema = {
			type: 'string',
			transform: 'array',
			delimiter: '|',
		};
		const expectation = ['a', 'b'];

		verifyTransformation({ data, schema, expectation });
	});
});
