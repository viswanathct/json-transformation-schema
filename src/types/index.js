/**
* types
*/
const { readdirSync, lstatSync } = require('fs');
const types = require('lazy-cache')(require);

readdirSync(__dirname)
	.filter(path => lstatSync(`${__dirname}/${path}`).isDirectory())
	.forEach((module) =>
		types(`${__dirname}/${module}`, module)
	);

module.exports = types;
