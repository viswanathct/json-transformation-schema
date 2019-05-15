/**
* Testing the type - number.
*/

describe('Type - number', () => {

	/* Helpers */
	const { verifyParsing } = require("../../test-helpers");

	/* Tests */
	test('parsing values of various types', async () => {

		verifyParsing('number', {

			string: [
				['1', 1],
				['1.1', 1.1],
				['10', 10],
				['', NaN],
			],
			integer: [
				[1, 1],
				[0, 0],
			],
			boolean: [
				[true, 1],
				[false, 0],
			],
			null: [
				[null, 0],
			],
		});
	});
});
