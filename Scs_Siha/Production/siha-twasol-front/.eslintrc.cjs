module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    settings: { react: { version: "18.2" } },
    plugins: ["react-refresh"],
    rules: {
        // Disable unused variables warning
        "no-unused-vars": "off", // Don't show warnings for unused variables

        // Disable prop-types validation (because you don't use TypeScript)
        "react/prop-types": "off", // Disable prop-type validation

        // Disable missing dependency warnings for useEffect
        "react-hooks/exhaustive-deps": "off", // Turn off missing dependencies in useEffect warnings

        // Enable potential error for undefined variables
        "no-undef": "error", // Show an error if a variable is used without being defined

        // Enable potential error for incorrect React component names
        "react-hooks/rules-of-hooks": [
            "error",
            {
                checkFunctions: "true", // Checks that functions using hooks have valid names
            },
        ],

        // Allow the use of React even if not explicitly needed (for JSX)
        "react/jsx-no-undef": ["error"], // Errors if there are undefined JSX components
    },
};
