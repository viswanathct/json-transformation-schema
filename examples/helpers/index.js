/**
 * Helpers for writing and running examples.
 */

/* Helpers */
const { keys } = Object;
const call = async (fn) => await fn();
const sleep = async (seconds = 1000) => new Promise((resolve) => setTimeout(resolve, seconds));

/* State */
const logs = [];

/* Exports */
const log = (x) => logs.push(`\t${x}`);

const runExamples = (examples, speed = 200) => call(async () => {
	const exampleNames = keys(examples);
	const count = exampleNames.length;
	let i =0;

	while(i < count) {
		const exampleName = exampleNames[i++];
		logs.push(`${exampleName}:`);
		await examples[exampleName]();
		logs.push('');
	};

	for(let i = 0, l = logs.length; i < l; i++) {
		console.log(logs[i]);
		await sleep(speed);
	}
});

module.exports = {

	log,
	runExamples,
}
