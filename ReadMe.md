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
			type: 'number',
			targetType: 'string',
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

* Fill any empty test cases.

* Think of the config, operators, thich would be used process values before output. These could be strings or composable functions.

* Measure and improve performance.

* Documention.
	* JS-Doc comments to allow for IDE tips.
	* Formal documentation with usecases and examples.

* Fix the coverage number at 95%.

* Offer input validation.

* Compile the schemas into functions.

* Add the support for one or more JSON Schema RFCs.

* Separate the spec from the implementation. The spec would be just the basics, without addiotional functionality like defaults, type-customization, custm transform functions etc.Extendability should be provided through the implementation. IE: A pure spec schema, should be portable.

* Test against the [official JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

* Benchmark the validator with [JSON Schema Benchmark](https://github.com/ebdrup/json-schema-benchmark).

# DevNotes

* For an example on extending jts, refer [jts-templates](https://github.com/viswanathct/jts-templates).

* The reason for throwing errors, instead of collecting them are many:
	* It reduces the learning curve for new comers.
	* It makes extending the core easy.
	* It makes the implementation easier.
	* The lib concentrates on transformation, rather than validation.
	* If needed a collection mechanism could be added later, when the lib becomes stable, or when needed.
