/**
 * Testing the type - object.
 */

describe('Type - object', () => {

	/* Helpers */
	const { verifyTransformation } = require("../../test-helpers");

	/* Test Targets */
	const jts = require('../../../src');
	const { standardizeSchema } = require('../../../src/types/object');

	/* Mocks and Stubs */
	const data = {
		single: 'single',
		parent: {
			child: 'child',
		},
		someNumber: 1,
	}

	/* Tests */
	test('transform should handle objects of type - object', async () => {
		const schema = {
			properties:{
				parent: {
					properties: {
						child: {},
					},
				},
			},
		};

		expect(jts.transformer(schema).transform(data)).toEqual({
			parent: {
				child: 'child',
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

	test('transformation should consider suitable meta properties', () => {

		verifyTransformation({
			info: 'properties should not be preserved by default.',
			data,
			schema: {
				properties: {
					single: {},
				},
			},
			expectation: {
				single: 'single',
			},
		});

		verifyTransformation({
			info: 'properties should be preserved when the "preserve" config is set to true',
			data,
			schema: {
				preserve: true,
			},
			expectation: data,
		});

		verifyTransformation({
			info: 'configs from the items object should be applied to all the properties.',
			data,
			schema: {
				items: {
					transform: 'string',
				},
				properties: {
					someNumber: {},
				},
			},
			expectation: {
				someNumber: '1',
			},
		});

	});
});
