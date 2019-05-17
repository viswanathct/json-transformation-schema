/**
* Testing the type - string.
*/

describe('Type - string', () => {

	/* Helpers */
	const { verifyParsing, verifyTransformation } = require("../../test-helpers");

	/* Tests */
	test('parsing values of various types', () => {

		verifyParsing('string', {
			number: [
				[1, '1'],
				[1.1, '1.1'],
			],
			integer: [
				[1, '1'],
			],
			boolean: [
				[true, 'true'],
				[false, 'false'],
			],
			null: [
				[null, ''],
			],
			array: [
				[['a', 'b'], 'a, b'],
				[['a', 'b'], 'a|b', {
					delimiter: '|',
				}],
			],
			object: [
				[{}, '{}'],
			],
		});
	});

	test('adheres to the prop, trim', () => {

		const expectation = 'some string';
		const data = ' ' + expectation;
		const schema = { trim: true };

		verifyTransformation({data, schema, expectation});
	});
});
