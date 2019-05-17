/**
 * Mocks and Stubs.
 */

const simple = {
	data: {
		a: 1,
		b: 2,
	},
	schema: {
		type: "object",
		properties: {
			a: {
				type: "integer",
			},
			b: {
				type: "integer",
			},
		},
	},
}

const nested = {
	data: {
		a: 1, b: 2,
		c: {
			d: 1,
		},
	},
	schema: {
		type: "object",
		properties: {
			a: {
				type: "integer",
			},
			b: {
				type: "integer",
			},
			c: {
				type: "object",
				properties: {
					d: {
						type: "integer",
					},
				},
			},
		},
	},
}

const mixed = {
	data: {
		a: 1,
		b: "2",
	},
	schema: {
		type: "object",
		properties: {
			a: {
				type: "integer",
			},
			b: {
				type: "string",
			},
		},
	},
}

const complex = {
	data: {
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
	},
	schema: {
		properties: {
			single: {
				type: 'string',
			},
			parent: {
				type: 'object',
				properties: {
					child: {
						type: 'object',
						properties: {
							grandChild: {
								type: 'string',
							},
						},
					},
					'childless-child': {
						type: 'string',
					},
					'unescaped/child': {
						type: 'string',
					},
					'escaped\\/child': {
						type: 'string',
					},
				},
			},
			someNumber: {
				type: 'integer',
			},
			array: {
				type: 'array',
				items: {
					type: 'integer',
				},
			},
			complexArray: {
				type: 'array',
				items: {
					type: 'object',
					properties: {
						innerArray: {
							type: 'array',
							items: {
								type: 'integer',
							},
						},
					},
				},
			},
		},
	},
}

module.exports = {
	simple,
	mixed,
	nested,
	complex,
}
