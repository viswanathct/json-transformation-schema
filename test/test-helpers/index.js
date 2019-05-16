/**
 *
 * Helper functions for testing.
 */

/* Imports */
const jts = require('../../src');

/* Helpers */
const { assign, entries } = Object;

/* Exports */
const expectMockCalls = (fn) => (expectation) =>
	expect(fn.mock.calls).toEqual(expectation);

const verifyParsing = (() => {
	return (targetType, conversions) =>
		entries(conversions).forEach(([sourceType, conversionPairs]) => {
			conversionPairs.forEach((conversionPair) => {
				const [inValue, outValue, schemaExtensions] = conversionPair;
				const schema = assign({
					source: { type: sourceType },
					transform: targetType,
				}, schemaExtensions);

				expect(jts.transformer(schema).transform(inValue)).toEqual(outValue);
			})
		});
})();

const verifyTransformation = ({data, schema, expectation, info = ''}) => {
	info && console.log(info);
	const transformed = jts.transformer(schema).transform(data);
	expect(transformed).toEqual(expectation);
	return transformed;
}

module.exports = {
	expectMockCalls,
	verifyParsing,
	verifyTransformation,
}
