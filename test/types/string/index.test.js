/**
* Testing the type - string.
*/

describe('Type - string', () => {

	/* Helpers */
	const { generateParsingTests, generateTransformationTest } = require("../../test-helpers");

	/* Tests */
	generateParsingTests('string', {
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

	generateTransformationTest({
		desc: 'adheres to the config, trim',
		data: ' some string ',
		schema: { trim: true },
		expectation: 'some string',
	});
});
