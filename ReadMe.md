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
		}
	}
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

* JST focuses on transformations, where as most JSON Schema implementations focus on validation.

* JST is a superset of JSON Schema.

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

* Allow for default gobal options and type specific options.

* Offer input validation.

* Think of a simpler, less-verbose, non JSON schema mode. This could well be a separate package. This might resemble the format used in doctable's render. This also could use wrapping functions, which act as schema builders.

* Fill any empty test cases.

* Fix the coverage number at 95%.

* Add the support for one or more JSON Schema RFCs.

* Test against the [official JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

* Benchmark the validator with [JSON Schema Benchmark](https://github.com/ebdrup/json-schema-benchmark).
