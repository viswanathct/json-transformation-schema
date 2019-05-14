/**
 * Testing the type - date.
 */

describe('Type - object', () => {

	/* Test Targets */
	const jts = require('../../../src');

	/* Tests */
	test('transform should transform strings to dates', async () => {
		const data = {
			someDate: new Date().toISOString(),
		};
		const schema = {
			properties:{
				someDate: {
					type: 'string',
					transform: 'date',
				},
			},
		};

		const transformed = jts.transformer(schema).transform(data).someDate;

		expect(transformed).toBeInstanceOf(Date);
		expect(isNaN(transformed)).toEqual(false);
	});

	test('transform should transform dates to strings', async () => {
		const date = new Date();
		const dateString = date.toISOString();

		const data = {
			someDate: date,
		};
		const schema = {
			properties:{
				someDate: {
					type: 'date',
					transform: 'string',
				},
			},
		};

		const transformed = jts.transformer(schema).transform(data).someDate;

		expect(transformed).toEqual(dateString);
	});

	test('transform should transform dates to strings according to the given format', async () => {
		const date = new Date();
		const dateString = date.getUTCFullYear().toString();

		const data = {
			someDate: date,
		};
		const schema = {
			properties:{
				someDate: {
					type: 'date',
					transform: 'string',
					format: 'yyyy',
				},
			},
		};

		const transformed = jts.transformer(schema).transform(data).someDate;

		expect(transformed).toEqual(dateString);
	});
});
