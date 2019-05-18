/**
 * Testing the type - object.
 */

describe('Type - object', () => {

	/* Helpers */
	const { generateTransformationTest } = require("../../test-helpers");

	/* Test Targets */
	const jts = require('../../../src');
	const { standardizeSchema } = require('../../../src/types/object');

	/* Mocks and Stubs */
	const complexData = require('../../test-helpers/mocksAndStubs').complex.data;

	/* Tests */
	test('transform should handle objects of type - object', () => {
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

	test('standardizeSchema adds missing prop config', () => {
		const schema = {
			properties: {
				field: {},
			},
		}

		expect(standardizeSchema(schema).properties.field.prop).toEqual('field');
	});

	test('standardizeSchema doesn\'t alter existing prop config', () => {
		const schema = {
			properties: {
				field: {
					prop: 'some-other-field',
				},
			},
		}

		expect(standardizeSchema(schema).properties.field.prop).toEqual('some-other-field');
	});

	generateTransformationTest({
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

	generateTransformationTest({
		desc: 'properties are preserved when the "preserve" config is set to true',
		data: complexData,
		schema: {
			preserve: true,
		},
		expectation: complexData,
	});

	generateTransformationTest({
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
});
