/**
* Testing the type - boolean
*/

describe('Type - boolean', () => {

	/* Helpers */
	const { generateParsingTests, generateValidationTests } = require("../../test-helpers");

	/* Tests */
	generateParsingTests('boolean', {
		number: [
			[1, true],
			[0, false],
		],
		integer: [
			[1, true],
			[0, false],
		],
		string: [
			['non-empty-string', true],
			['', false],
		],
		array: [
			[['not', 'empty'], true],
			[[], false],
		],
		object: [
			[{ empty: false }, true, { properties: { empty: {} }}],
			[{}, false],
		],
		null: [
			[null, false],
		],
	});

	generateValidationTests('boolean');
});
