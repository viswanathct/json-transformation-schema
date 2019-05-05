/**
 * Testing the core.
 */

describe('Functionality of the core', () => {

	/* Test Targets */
	const { standardizeSchema } = require('../../src/core');

	/* Tests */
	test('standardizeSchema should add a missing prop', async () => {
		const schema = {
			field: {},
		}

		expect(standardizeSchema(schema)).toEqual({
			field: {
				prop: 'field',
			},
		});
	});

	test('standardizeSchema should not alter any existing prop', async () => {
		const schema = {
			field: {
				prop: 'some-other-field',
			},
		}

		expect(standardizeSchema(schema)).toEqual(schema);
		//TODO: Ensure the the schema isn't mutated. And repeat that with every test.
	});

	test('standardizeSchema should detect property types and handle nested schema.', async () => {

		const schema = {
			field: {
				prop: 'field',
				properties: {
					subField: {
						prop: 'some-other-field',
						type: 'number',
					},
				},
			},
		};
		const expected = {
			field: {
				type: 'object',
				...schema.field,
			},
		};

		expect(standardizeSchema(schema)).toEqual(expected);
	});
});
