/**
 * Testing the type - date.
 */

describe('Type - object', () => {

	/* Helpers */
	const { verifyTransformation } = require("../../test-helpers");

	/* Data */
	const fixedDate = new Date('2019-01-01T00:00:00.000Z');

	/* Tests */
	test('transform should transform strings to dates', async () => {
		const data = fixedDate.toISOString();
		const expectation = fixedDate;
		const schema = {
			type: 'string',
			transform: 'date',
		};

		verifyTransformation({data, schema, expectation});
	});

	test('transform should transform dates to strings', async () => {
		const data = fixedDate;
		const expectation = fixedDate.toISOString();
		const schema = {
			type: 'date',
			transform: 'string',
		};

		verifyTransformation({data, schema, expectation});
	});

	test('transform should transform dates to strings according to the given format', async () => {
		const data = fixedDate;
		const expectation = fixedDate.getUTCFullYear().toString();
		const schema = {
			type: 'date',
			transform: 'string',
			format: 'yyyy',
		};

		verifyTransformation({data, schema, expectation});
	});
});
