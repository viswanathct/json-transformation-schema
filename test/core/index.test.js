/**
 * Testing the core.
 */

describe('Functionality of the core', () => {

	/* Test Targets */
	const { standardizeSchema, transform } = require('../../src/core');

	/* Helpers */
	const { clone } = require('@laufire/utils').collection;
	const verifyTransformation = ({data, schema, expectation, info = ''}) => {
		info && console.log(info);
		const transformed = transform(data, standardizeSchema(schema)); //NOTE: The test helper, verifyTransformation could not be used, as the test is for a different function.
		expect(transformed).toEqual(expectation);
		return transformed;
	}

	/* Mocks and Stubs */
	const mns = require('../test-helpers/mocksAndStubs');

	/* Tests */
	test('standardizeSchema adds default props and calls relevant type-handlers', () => { //TODO: Write relevant tests.
		standardizeSchema;
	});

	test.only('standardizeSchema options.defaults to all sub-schemas, without overriding config', () => {
		const schema = clone(mns.mixed.schema);

		expect(schema.properties.a.type).toEqual('integer');
		expect(schema.properties.b.type).toEqual('string');

		delete schema.properties.b.type;
		const standardizedSchema = standardizeSchema(schema, {
			defaults: {
				type: 'number',
			},
		});

		expect(standardizedSchema.properties.a.type).toEqual('integer');
		expect(standardizedSchema.properties.b.type).toEqual('number');
	});

	test.only('standardizeSchema options.typeDefaults to the sub-schemas of the given type, without overriding config', () => {
		const schema = clone(mns.mixed.schema);
		const minValue = 5;

		const standardizedSchema = standardizeSchema(schema, {
			typeDefaults: {
				'integer': {
					minValue,
				},
			},
		});

		expect(standardizedSchema.properties.a.minValue).toEqual(minValue);
		expect(standardizedSchema.properties.b.minValue).toEqual(undefined);
	});

	test('transform handles flat schemas for primitive types', () => {
		expect(transform('1.1', { transform: 'integer' })).toEqual(1);
	});

	test('transform handles nested schemas for complex types', () => {
		const data = {
			a: {
				b: 1,
			},
		};
		const schema = {
			properties: {
				a: {
					properties: {
						b: {},
					},
				},
			},
		};
		const expectation = data;

		verifyTransformation({data, schema, expectation});
	});

	test('transform should handle type-agnostic config', () => {
		const data = {};
		const schema = {
			properties: {
				a: {
					default: 'default',
				},
			},
		};
		const expectation = {
			a: 'default',
		};

		verifyTransformation({data, schema, expectation});
	});
});
