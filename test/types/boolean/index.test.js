/**
* Testing the type - boolean
*/

describe('Type - boolean', () => {

	/* Helpers */
	const { verifyParsing } = require("../../test-helpers");

	/* Tests */
	test('parsing values of various types', async () => {

		verifyParsing('boolean', {
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
				[{ empty: false }, true],
				[{}, false],
			],
			null: [
				[null, false],
			],
		});
	});
});
