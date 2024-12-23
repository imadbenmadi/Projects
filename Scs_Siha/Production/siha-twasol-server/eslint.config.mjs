import globals from "globals";
import pluginJs from "@eslint/js";

// /** @type {import('eslint').Linter.Config[]} */
// export default [
//   {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
//   {languageOptions: { globals: globals.browser }},
//   pluginJs.configs.recommended,
// ];
// import globals from "globals";
// import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        files: ["**/*.js"],
        languageOptions: {
            sourceType: "commonjs", // or "module" if you are using ES modules
            globals: globals.browser, // Use the globals for browser environment
        },
        rules: {
            "no-unused-vars": "off", // Ignore warnings about unused vars
            "no-undef": "error", // Treat undefined variables as an error
            "no-console": "off", // Ignore console warnings
        },
    },
    pluginJs.configs.recommended, // Use recommended rules from the ESLint plugin
];
