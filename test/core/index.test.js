/**
 * Testing the core.
 */

describe('Functionality of the core', () => {

	/* Test Targets */
	const { standardizeSchema, transform } = require('../../src/core');

	/* Helpers */
	const { clone } = require('@laufire/utils').collection;
	const { standardizeOptions } = require('../../src/core');
	const verifyTransformation = ({data, schema, expectation, info = ''}) => {
		info && console.log(info);
		const transformed = transform(data, standardizeSchema(schema, standardizedOptions), standardizedOptions);
		expect(transformed).toEqual(expectation);
		return transformed;
	}

	/* Data */
	const errors = require('../../src/core/errors');

	/* Mocks and Stubs */
	const mns = require('../test-helpers/mocksAndStubs');
	const standardizedOptions = standardizeOptions({});

	/* Tests */
	test('standardizeSchema adds default props and calls relevant type-handlers', () => { //TODO: Write relevant tests.
		standardizeSchema;
	});

	test('standardizeSchema options.defaults to all sub-schemas, without overriding config', () => {
		const schema = clone(mns.mixed.schema);

		expect(schema.properties.a.type).toEqual('integer');
		expect(schema.properties.b.type).toEqual('string');

		delete schema.properties.b.type;
		const standardizedSchema = standardizeSchema(schema, standardizeOptions({
			defaults: {
				type: 'number',
			},
		}));

		expect(standardizedSchema.properties.a.type).toEqual('integer');
		expect(standardizedSchema.properties.b.type).toEqual('number');
	});

	test('standardizeSchema options.typeDefaults to the sub-schemas of the given type, without overriding config', () => {
		const schema = clone(mns.mixed.schema);
		const minValue = 5;

		const standardizedSchema = standardizeSchema(schema, standardizeOptions({
			typeDefaults: {
				'integer': {
					minValue,
				},
			},
		}));

		expect(standardizedSchema.properties.a.minValue).toEqual(minValue);
		expect(standardizedSchema.properties.b.minValue).toEqual(undefined);
	});

	test('transform handles flat schemas for primitive types', () => {
		const data = '1.1';
		const schema = {
			type: 'string',
			targetType: 'integer',
		};
		const expectation = 1;

		verifyTransformation({data, schema, expectation});
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

	test('transform passes values to any configured transform calls, before converting them to target type', () => {
		const data = 1;
		const schema = {
			transform: (x) => x + 1,
			type: 'number',
			targetType: 'string',
		};
		const expectation = '2';

		verifyTransformation({data, schema, expectation});
	});

	test('some config are type-agnostic, they apply for all types', () => {
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

	test('transformation allows the access of descendant values', () => {
		const data = mns.complex.data;
		const schema = {
			prop: 'parent/child/grandChild',
		};
		const expectation = 'grandChild';

		verifyTransformation({data, schema, expectation});
	});

	test('transformation throws an exception on missing required props', () => {
		const data = mns.complex.data;
		const schema = {
			properties: {
				parent: {
					properties: {
						undefinedProp: {
							required: true,
						},
					},
				},
			},
		};
		const transformation = () => transform(data, standardizeSchema(schema, standardizedOptions), standardizedOptions);

		expect(transformation).toThrow(errors.MissingRequired);
	});
});
