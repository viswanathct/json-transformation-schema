/**
 * Testing the type - object.
 */

describe('Type - object', () => {

	/* Helpers */
	const { generateTransformationTest } = require("../../test-helpers");

	/* Test Targets */
	const jts = require('../../../src');
	const { standardizeOptions } = require('../../../src/core');
	const { standardizeSchema } = require('../../../src/types/object');

	/* Mocks and Stubs */
	const { complex } = require('../../test-helpers/mocksAndStubs');
	const standardizedOptions = standardizeOptions({});

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

		expect(jts.transformer(schema).transform(complex.data)).toEqual({
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

		expect(standardizeSchema(schema, standardizedOptions).properties.field.prop).toEqual('field');
	});

	test('standardizeSchema doesn\'t alter existing prop config', () => {
		const schema = {
			properties: {
				field: {
					prop: 'some-other-field',
				},
			},
		}

		expect(standardizeSchema(schema, standardizedOptions).properties.field.prop).toEqual('some-other-field');
	});

	generateTransformationTest({
		desc: 'properties aren\'t preserved by default',
		data: complex.data,
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
		data: complex.data,
		schema: {
			preserve: true,
		},
		expectation: complex.data,
	});

	generateTransformationTest({
		desc: 'configs from the items object are applied to all the properties',
		data: complex.data,
		schema: {
			items: {
				type: 'number',
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

	generateTransformationTest({
		desc: 'objects can be parsed from JSON strings',
		data: JSON.stringify(complex.data),
		schema: {
			type: 'string',
			transform: 'object',
		},
		expectation: complex.data,
	});
});
