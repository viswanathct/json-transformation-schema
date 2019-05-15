/**
 * Testing the core.
 */

describe('Functionality of the core', () => {

	/* Test Targets */
	const { standardizeSchema, transform } = require('../../src/core');

	/* Tests */

	test('standardizeSchema adds default props and calls relevant type-handlers', async () => { //TODO: Write relevant tests.
		standardizeSchema;
	});

	test('transform handles default options', async () => { //TODO: Write relevant tests.
		transform;
	});

	test('transform delegates transformation to type-handlers', async () => { //TODO: Write relevant tests.
		transform;
	});

	test('transform handles flat schemas for primitive types', async () => {
		expect(transform('1.1', { transform: 'integer' })).toEqual(1);
	});

	test('transform handles nessted schemas for complex types', async () => { //TODO: Write relevant tests.
		transform;
	});
});
