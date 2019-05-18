/**
 * Entry point
 */

describe('Functionalities of transform', () => {

	/* Test Targets */
	const jts = require('../src');

	/* Data */
	const errors = require('../src/core/errors');

	/* Mocks and Stubs*/
	const mns = require('./test-helpers/mocksAndStubs');
	const complexData = mns.complex.data;
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

		expect(jts.transformer(schema).transform(data)).toEqual({
			a: 1,
		});
	});

	test('transform discards internal errors, when strict mode is not set', () => {
		const transformation = () =>
			jts.transformer(missingRequiredExceptionSchema)
				.transform(complexData);

		expect(transformation()).toEqual(undefined);
	});

	test('transform throws external errors, even when strict mode is set to false', () => {
		const transformation = () =>
			jts.transformer(
				{
					transform: () => { throw new Error() },
				},
				{ strict: false },
			).transform(complexData);

		expect(transformation).toThrow(Error);
	});

	test('transform throws all errors when strict mode is set', () => {
		const transformation = () =>
			jts.transformer(
				missingRequiredExceptionSchema,
				{ strict: true },
			).transform(complexData);

		expect(transformation).toThrow(errors.MissingRequired);
	});
});
