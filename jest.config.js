/**
 * @type {import("jest").Config}
 */
module.exports = {
	testEnvironment: "node",
	transform: {
		"^.+\\.(t|j)sx?$": "@swc/jest",
	},
	transformIgnorePatterns: [
		// https://stackoverflow.com/a/60730519/4564097
		"node_modules/(?!chalk)",
	],
	testTimeout: 30 * 1000,
	testPathIgnorePatterns: ["<rootDir>/lib", "/node_modules/"],
	watchPathIgnorePatterns: [
		"<rootDir>/lib/",
		"README.md",
		"oclif.manifest.json",
	],
};
