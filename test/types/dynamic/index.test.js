/**
* Testing the type - dynamic.
*/

describe('Type - dynamic', () => {

	/* Helpers */
	const { generateFormattingTests } = require("../../test-helpers");

	/* Tests */
	generateFormattingTests('dynamic', {
		number: [
			['1', 1],
			['1.1', 1.1],
		],
		integer: [
			['1', 1],
		],
		boolean: [
			['true', true],
			['', false],
		],
		null: [
			['', null],
		],
		array: [
			['a, b', ['a', 'b']],
			['a|b', ['a', 'b'], {
				delimiter: '|',
			}],
		],
		object: [
			['{}', {}],
		],
	});
});
