/**
 * Entry point
 */

describe('Functionalities of transform', () => {

	/* Test Targets */
	const jts = require('../src');

	/* Data */
	const errors = require('../src/core/errors');

	/* Mocks and Stubs*/
	const { simple, complex } = require('./test-helpers/mocksAndStubs');

	const missingRequiredExceptionSchema = {
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

	/* Tests */
	test('transform should handle simple transformations', () => {
		const data = {
			a: 1,
		};
		const schema = {
			properties: {
				a: {},
			},
		};
		const transformation = () =>
			jts.transformer(schema).transform(data)

		expect(transformation()).toEqual({
			a: 1,
		});
	});

	test('transform discards internal errors, when strict mode is not set', () => {
		const transformation = () =>
			jts.transformer(missingRequiredExceptionSchema)
				.transform(complex.data);

		expect(transformation()).toEqual(undefined);
	});

	test('transform allows functions as schema', () => {
		const functionAsSchema = (data) => data;
		const transformation = () =>
			jts.transformer(functionAsSchema)
				.transform(simple.data);

		expect(transformation()).toEqual(simple.data);
	});

	test('transform allows for custom types and type overrides through options', () => {
		const schema = {
			properties: {
				a: {
					type: 'integer',
					transform: 'string',
				},
			},
		};
		const typeOverrides = {
			integer: {
				formatters: {
					string: () => 'custom type',
				},
			},
		};
		const transformation = () =>
			jts.transformer(schema, { types: typeOverrides })
				.transform(simple.data);

		expect(transformation()).toEqual({
			a: 'custom type',
		});
	});


	test('transform throws external errors, even when strict mode is set to false', () => {
		const transformation = () => jts.transformer(
			{ transform: () => { throw new Error() } },
			{ strict: false },
		).transform(complex.data);

		expect(transformation).toThrow(Error);
	});

	test('transform throws all errors when strict mode is set', () => {
		const transformation = () => jts.transformer(
			missingRequiredExceptionSchema,
			{ strict: true }
		).transform(complex.data);

		expect(transformation).toThrow(errors.MissingRequired);
	});
});
