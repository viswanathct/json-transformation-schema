/**
 *
 * Helper functions for testing.
 */

/* Helpers */
const { entries } = Object;

/* Exports */
const expectMockCalls = (fn) => (expectation) =>
	expect(fn.mock.calls).toEqual(expectation);

const verifyParsing = (() => {
	const jts = require('../../src');

	const dataTemplate = {
		someProp: '',
	};

	const schemaTemplate = {
		properties: {
			someProp: {
				source: {},
			},
		},
	};

	return (targetType, conversions) =>
		entries(conversions).forEach(([sourceType, comparisonPairs]) => {
			comparisonPairs.forEach((comparisonPair) => {
				const [inValue, parsedValue] = comparisonPair;
				dataTemplate.someProp = inValue;
				schemaTemplate.properties.someProp.source.type = sourceType;
				schemaTemplate.properties.someProp.transform = targetType;

				expect(jts.transformer(schemaTemplate).transform(dataTemplate)).toEqual({
					someProp: parsedValue,
				});
			})
		});
})();

module.exports = {

	expectMockCalls,
	verifyParsing,
}
