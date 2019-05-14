/**
 * Utis
 */

/* Exports */
const inferType = (value) => {
	const type = typeof value;

	return type !== 'object' ? type
		: value !== null
			? value.constructor.name.toLowerCase()
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
