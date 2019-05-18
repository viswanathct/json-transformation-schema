/**
 * Errors
 */

//TODO: Find a way to generate the error classes.

class MissingRequired extends Error {
	constructor(...args) {
		super(...args);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, MissingRequired);
		}

		this.name = 'MissingRequired';
	}
}

module.exports = {
	MissingRequired,
}
