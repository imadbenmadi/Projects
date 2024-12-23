const babelParser = require("@babel/parser");
const babelTraverse = require("@babel/traverse").default;
const fs = require("fs");
const path = require("path");
const { exit } = require("process");

const extractedText = [];
const reactProjectDir = process.argv[2];

if (
    !fs.existsSync(reactProjectDir) ||
    !fs.lstatSync(reactProjectDir).isDirectory()
) {
    console.error("Directory not found:", reactProjectDir);
    process.exit(1);
}

console.log("Scanning directory:", reactProjectDir);
console.time("Execution Time");
scanDirectory(reactProjectDir);
console.timeEnd("Execution Time");

// Save results to a file
const outputFilePath = path.join(__dirname, "ArabicContent.json");
fs.writeFileSync(outputFilePath, JSON.stringify(extractedText, null, 2));
console.log(`Results saved to ${outputFilePath}`);

function scanDirectory(dir) {
    if (!fs.existsSync(dir) || !fs.lstatSync(dir).isDirectory()) {
        console.error("Directory should be valid:", dir);
        exit(1);
    }

    fs.readdirSync(dir).forEach((file) => {
        const filePath = path.join(dir, file);

        if (
            ["node_modules", "dist", "build", "public", "uploads"].includes(
                file
            ) ||
            fs.lstatSync(filePath).isSymbolicLink()
        ) {
            return; // Skip excluded directories and symbolic links
        }

        if (fs.lstatSync(filePath).isDirectory()) {
            scanDirectory(filePath); // Recurse into subdirectories
        } else if (/\.(js|jsx|ts|tsx)$/.test(filePath)) {
            extractTextFromFile(filePath); // Process JS/TS files
        }
    });
}

function extractTextFromFile(filePath) {
    let code = null;
    try {
        code = fs.readFileSync(filePath, "utf-8");

        const ast = babelParser.parse(code, {
            sourceType: "module",
            plugins: [
                "jsx",
                "typescript",
                "classProperties",
                "decorators-legacy",
                "dynamicImport",
                "optionalChaining",
            ],
        });

        babelTraverse(ast, {
            JSXText(path) {
                const text = path.node.value.trim();
                if (isValidText(text)) {
                    extractedText.push({ filePath, content: text });
                }
            },
            JSXExpressionContainer(path) {
                if (path.node.expression.type === "StringLiteral") {
                    const text = path.node.expression.value.trim();
                    if (isValidText(text)) {
                        extractedText.push({ filePath, content: text });
                    }
                }
            },
        });
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);

        if (error.loc) {
            const { line, column } = error.loc;
            console.error(`Error location: Line ${line}, Column ${column}`);

            // Show the problematic code snippet
            if (code) {
                const lines = code.split("\n");
                const errorLine = lines[line - 1];
                console.error(`Problematic line: ${errorLine}`);
                console.error(`Error column: ${" ".repeat(column - 1)}^`);
            }
        }
    }
}

// Improved validation for meaningful Arabic text
function isValidText(text) {
    return (
        text &&
        text.trim().length > 2 &&
        /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(text) && // Arabic character range
        !/^\d+$/.test(text) // Excludes pure numbers
    );
}
