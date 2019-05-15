/**
 * Testing the type - object.
 */

describe('Type - object', () => {

	/* Test Targets */
	const jts = require('../../../src');
	const { standardizeSchema } = require('../../../src/types/object');

	/* Tests */
	test('transform should handle objects of type - object', async () => {
		const data = {
			a: {
				b: 1,
			},
		};
		const schema = {
			properties:{
				a: {
					properties: {
						b: {},
					},
				},
			},
		};

		expect(jts.transformer(schema).transform(data)).toEqual({
			a: {
				b: 1,
			},
		});
	});

	test('standardizeSchema should add a missing prop', async () => {
		const schema = {
			properties: {
				field: {},
			},
		}

		expect(standardizeSchema(schema).properties.field.prop).toEqual('field');
	});

	test('standardizeSchema should not alter any existing prop', async () => {
		const schema = {
			properties: {
				field: {
					prop: 'some-other-field',
				},
			},
		}

		expect(standardizeSchema(schema).properties.field.prop).toEqual('some-other-field');
	});
});
