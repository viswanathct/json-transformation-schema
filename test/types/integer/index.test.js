/**
* Testing the type - integer
*/

describe('Type - integer', () => {

	/* Helpers */
	const { generateParsingTests, generateValidationTests } = require("../../test-helpers");

	/* Tests */
	generateParsingTests('integer', {
		string: [
			['1', 1],
			['1.1', 1],
			['10', 10],
			['', NaN],
		],
		number: [
			[1.1, 1],
			[1, 1],
		],
		boolean: [
			[true, 1],
			[false, 0],
		],
		null: [
			[null, 0],
		],
	});

	generateValidationTests('integer');
});
