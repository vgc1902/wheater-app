/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: "jit",
	content: ["./public/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	purge: [
		"./node_modules/@vechaiui/**/*.{js,ts,jsx,tsx}",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: "class",
	theme: {
		extend: {},
	},
	plugins: [require("@tailwindcss/forms"), require("@vechaiui/core")],
};
