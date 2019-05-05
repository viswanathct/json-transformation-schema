/**
 *
 * Helper functions for testing.
 */

const expectMockCalls = (fn) => (expectation) =>
	expect(fn.mock.calls).toEqual(expectation);

module.exports = {

	expectMockCalls,
}
