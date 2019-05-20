/**
 * Helper functions for testing.
 */

/* Imports */
const jts = require('../../src');

/* Helpers */
const { assign, entries } = Object;

/* Exports */
const expectMockCalls = (fn) => (expectation) =>
	expect(fn.mock.calls).toEqual(expectation);

const verifyParsing = (targetType, conversions) =>
	entries(conversions).forEach(([sourceType, conversionPairs]) => {
		conversionPairs.forEach((conversionPair) => {
			const [inValue, outValue, schemaExtensions] = conversionPair;
			const schema = assign({
				source: { type: sourceType, preserve: true },
				transform: targetType,
			}, schemaExtensions);

			expect(jts.transformer(schema).transform(inValue)).toEqual(outValue);
		})
	});

const generateParsingTests = (targetType, conversions) =>
	entries(conversions).map(([sourceType, conversionPairs]) =>
		test(`type - ${targetType} parses type - ${sourceType}`, () =>
			conversionPairs.forEach((conversionPair) => {
				const [inValue, outValue, schemaExtensions] = conversionPair;
				const schema = assign({
					source: { type: sourceType, preserve: true },
					transform: targetType,
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
					transform: targetType,
				}, schemaExtensions);

				expect(jts.transformer(schema).transform(inValue)).toEqual(outValue);
			})
		));

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
	verifyParsing,
	generateParsingTests,
	verifyTransformation,
	generateTransformationTest,
	generateFormattingTests,
}
