/**
 * Errors
 */

/* Helpers */
const buildCustomErrorClass = (name) => {

	const wrapper = {
		[name]: function(message) {

			if (Error.captureStackTrace) {
				Error.captureStackTrace(this, customError);
			}

			this.name = name;
			this.message = message;
		},
	};

	const customError = wrapper[name];

	customError.prototype = Object.create(new Error);

	return customError;
}

/* Config */
//NOTE: Automatic class generation isn't done, so to help the IDE-s with auto-suggesting.
// const { fromEntries } = require('@laufire/utils').collection;

// const customErrors = [
// 	'MissingRequired',
// 	'InvalidType',
// ]

// module.exports = fromEntries(customErrors.map(
// 	(errorName) => [errorName, buildCustomErrorClass(errorName)]
// ));

module.exports = {
	MissingRequired: buildCustomErrorClass('MissingRequired'),
	InvalidType: buildCustomErrorClass('InvalidType'),
}
