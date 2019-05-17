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
	const complexData = require('../../test-helpers/mocksAndStubs').complex.data;

	/* Tests */
	test('transform should handle objects of type - object', async () => {
		const schema = {
			properties:{
				parent: {
					properties: {
						child: {
							properties: {
								grandChild: {},
							},
						},
					},
				},
			},
		};

		expect(jts.transformer(schema).transform(complexData)).toEqual({
			parent: {
				child: {
					grandChild: 'grandChild',
				},
			},
		});
	});

	test('standardizeSchema adds missing prop config', async () => {
		const schema = {
			properties: {
				field: {},
			},
		}

		expect(standardizeSchema(schema).properties.field.prop).toEqual('field');
	});

	test('standardizeSchema doesn\'t alter existing prop config', async () => {
		const schema = {
			properties: {
				field: {
					prop: 'some-other-field',
				},
			},
		}

		expect(standardizeSchema(schema).properties.field.prop).toEqual('some-other-field');
	});

	test('transformation handles various configs as described', () => {

		verifyTransformation({
			desc: 'properties aren\'t preserved by default',
			data: complexData,
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
			desc: 'properties are preserved when the "preserve" config is set to true',
			data: complexData,
			schema: {
				preserve: true,
			},
			expectation: complexData,
		});

		verifyTransformation({
			desc: 'configs from the items object are applied to all the properties',
			data: complexData,
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

		verifyTransformation({
			desc: 'object transformation allows the access of decendant values',
			data: complexData,
			schema: {
				type: 'object',
				properties: {
					grandChild: {
						prop: 'parent/child/grandChild',
					},
				},
			},
			expectation: {grandChild: 'grandChild'},
		});
	});
});
