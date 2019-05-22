/**
 * Helper functions for testing.
 */

/* Imports */
const jts = require('../../src');

/* Helpers */
const { assign, entries, keys } = Object;

/* Data */
const errors = require('../../src/core/errors');

/* Exports */
const expectMockCalls = (fn) => (expectation) =>
	expect(fn.mock.calls).toEqual(expectation);

const generateParsingTests = (targetType, conversions) =>
	entries(conversions).map(([sourceType, conversionPairs]) =>
		test(`type - ${targetType} parses type - ${sourceType}`, () =>
			conversionPairs.forEach((conversionPair) => {
				const [inValue, outValue, schemaExtensions] = conversionPair;
				const schema = assign({
					source: { type: sourceType, preserve: true },
					targetType,
				}, schemaExtensions);

				expect(jts.transformer(schema).transform(inValue)).toEqual(outValue);
			})
		));

const generateFormattingTests = (sourceType, conversions) =>
	entries(conversions).map(([targetType, conversionPairs]) =>
		test(`type - ${sourceType} formats to type - ${targetType}`, () =>
			conversionPairs.forEach((conversionPair) => {
				const [inValue, outValue, schemaExtensions] = conversionPair;
				const schema = assign({
					source: { type: sourceType, preserve: true },
					type: sourceType,
					targetType,
				}, schemaExtensions);

				expect(jts.transformer(schema).transform(inValue)).toEqual(outValue);
			})
		));

const generateValidationTests = (() => {
	const typeSamples = {
		string: 'some-string',
		integer: 1,
		number: 3.14,
		boolean: true,
		object: {},
		array: [],
		date: new Date(),
	}

	return (type, excludeTypes = []) => {
		excludeTypes = excludeTypes.slice(0).concat(type);
		const validateAgainst = keys(typeSamples).filter((type) => !excludeTypes.includes(type));
		const schema = {
			type,
			validate: true,
		};
		const options = {
			strict: true,
		};

		validateAgainst.forEach((invalidType) =>
			test(`${typeSamples[invalidType]} is not of type - ${type}`, () => {
				const transformation = () =>
					jts.transformer(schema, options).transform(typeSamples[invalidType]);

				expect(transformation).toThrow(errors.InvalidType);
			}));

		test(`${typeSamples[type]} is of type - ${type}`, () => {
			const transformation = () =>
				jts.transformer(schema, options).transform(typeSamples[testedType]);

			expect(transformation).not.toThrow(errors.InvalidType);
		});
	}
})();

const verifyTransformation = ({data, schema, expectation, desc = ''}) => {
	desc && console.log(desc);
	const transformed = jts.transformer(schema).transform(data);
	expect(transformed).toEqual(expectation);
	return transformed;
}

const generateTransformationTest = ({data, schema, expectation, desc = ''}) =>
	test(desc, () => {
		const transformed = jts.transformer(schema).transform(data);
		expect(transformed).toEqual(expectation);
	});

module.exports = {
	expectMockCalls,
	generateParsingTests,
	verifyTransformation,
	generateTransformationTest,
	generateFormattingTests,
	generateValidationTests,
}
