# JTS - JSON Transformation Schema

	A lib and a spec for document transformation, with extended JSON schema.

## The `Why`

* To help in writing readable, declarative tranformations.

## Example
```js
/* A simple transformation. */
const jts = require('json-transformation-schema');
const data = {
	a: 1,
}
const transformation = {
	properties: {
		a: {
			transform: 'string' // The target type.
		},
		b: {
			prop: 'a',
			transform: (val) => val + 1,
		},
	},
}

jts.transformer(transformation).transform(data);
/* Gives
{
	a: "1",
	b: 2,
}
```
**For more examples, check the [examples](https://github.com/viswanathct/json-transformation-schema/tree/master/examples) dir**.
```sh
# Or run the following (with node v8+):
$ node ./examples/cheatsheet.js
```

## Installation
```sh
$ npm install json-transformation-schema
```

## Use Cases

* Simple and quick document transofromations.

* Configurable trasnsformation.

## Keys

* JTS focuses on transformations, where as most JSON Schema implementations focus on validation.

* JTS is a superset of JSON Schema.

* Structure the transformation document to resemble the final document, for easier development and maintenance.

## Notes

* The tools doesn't intend to be a full fledged JSON Schema Validator, at least in the beginning.

* The tools was written to support another project [doctable](https://github.com/viswanathct/doctable).

# Development

## Setup
```sh
$ sh ./setup.sh
```

## ToDo

* Think of a simpler, less-verbose, non JSON schema mode. This could well be a separate package. This might resemble the format used in doctable's render. This also could use wrapping functions, which act as schema builders.

* Fill any empty test cases.

* Measure and improve performance.

* Documention.

* Fix the coverage number at 95%.

* Offer input validation.

* Compile the schemas into functions.

* Add the support for one or more JSON Schema RFCs.

* Separate the spec from the implementation. The spec would be just the basics, without addiotional functionality like defaults, type-customization, custm transform functions etc.Extendability should be provided through the implementation.

* Test against the [official JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

* Benchmark the validator with [JSON Schema Benchmark](https://github.com/ebdrup/json-schema-benchmark).

# DevNotes

* The reason for throwing errors, instead of collecting them are many:
	* It reduces the learning curve for new comers.
	* It makes extending the core easy.
	* It makes the implementation easier.
	* The lib concentrates on transformation, rather than validation.
	* If needed a collection mechanism could be added later, when the lib becomes stable, or when needed.
