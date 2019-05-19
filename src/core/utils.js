/**
 * Utils
 */

/* Exports */
const valueFn = (fn) => (value) => fn(value);

const returnNothing = () => {};

const returnFirstParam = (x) => x;

module.exports = {
	valueFn,
	returnNothing,
	returnFirstParam,
}
