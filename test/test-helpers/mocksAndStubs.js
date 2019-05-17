/**
 * Mocks and Stubs.
 */

const simpleObj = {
	a: 1,
	b: 2,
}

const nestedObj = {
	a: 1, b: 2,
	c: {
		d: 1,
	},
}

const complexObject = {
	single: 'single',
	parent: {
		child: {
			grandChild: 'grandChild',
		},
		'childless-child': 'childless-child',
		'unescaped/child': 'unescaped/child',
		'escaped\\/child': 'escaped\\/child',
	},
	someNumber: 1,
	undeifinedProp: undefined,
	array: [1, 2],
	complexArray: [
		{
			innerArray: [1, 3],
		},
	],
}

module.exports = {
	simpleObj,
	nestedObj,
	complexObject,
}
