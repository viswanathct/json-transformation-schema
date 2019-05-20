/**
 * Testing the type - array.
 */

describe('Type - array', () => {

	/* Helpers */
	const { verifyTransformation } = require('../../test-helpers');

	/* Tests */
	test('transform should transform a default delimited string to an array', () => {
		const data = 'a, b';
		const schema = {
			type: 'string',
			transform: 'array',
		};
		const expectation = ['a', 'b'];

		verifyTransformation({ data, schema, expectation });
	});

	test('transform should transform a custom delimited string to an array', () => {
		const data = 'a|b';
		const schema = {
			type: 'string',
			transform: 'array',
			delimiter: '|',
		};
		const expectation = ['a', 'b'];

		verifyTransformation({ data, schema, expectation });
	});

	test('transform should apply item configuratinn to all the elements.', () => {
		const data = ['1', '2', '3'];
		const schema = {
			type: 'array',
			items: {
				type: 'string',
				transform: 'integer',
			},
		};
		const expectation = [1, 2, 3];

		verifyTransformation({ data, schema, expectation });
	});
});
