/**
* Testing the type - number.
*/

/* Test Targets */
const jts = require('../../../src');

describe('Type - number', () => {

	/* Helpers */
	const { verifyParsing } = require("../../test-helpers");

	/* Tests */
	test('parsing values of various types', async () => {

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
			object: [
				[{}, '{}'],
			],
		});
	});

	test('adheres to the prop, trim', async () => { // Enable the test, once trim is fixed.

		const someString = 'some string';
		const data = {
			someProp: ' ' + someString,
		};
		const schema = {
			properties:{
				someProp: {
					trim: true,
				},
			},
		};

		const transformed = jts.transformer(schema).transform(data).someProp;

		expect(transformed).toEqual(someString);
	});
});
