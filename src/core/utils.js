/**
 * Utis
 */

/* Exports */
const inferType = (val) => {
	const type = typeof val;

	return type !== 'object' ? type
		: val !== null
			? val.constructor.name.toLowercase()
			: 'object';
}

const valueFn = (fn) => (value) => fn(value);

const returnNothing = () => {};

const returnFirstParam = (x) => x;

module.exports = {

	inferType,
	valueFn,
	returnNothing,
	returnFirstParam,
}
