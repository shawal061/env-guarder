#!/usr/bin/env node
import dotenv from "dotenv";
import chalk from "chalk";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(fs.readFileSync(join(__dirname, "../package.json"), "utf-8"));

const args = process.argv.slice(2);

function showHelp() {
    console.log(chalk.cyan(`env-guarder v${pkg.version}`));
    console.log(chalk.white(`
Usage:
  env-guarder [variables...] [options]

Options:
  --env-file <path>  Specify a custom .env file path
  --help             Show help
  --version          Show version

Example:
  env-guarder PORT DB_URL --env-file .env.production
`));
}

if (args.includes("--help") || args.includes("-h")) {
    showHelp();
    process.exit(0);
}

if (args.includes("--version") || args.length === 0 && args.includes("-v")) {
    console.log(pkg.version);
    process.exit(0);
}

let envPath = ".env";
const envFileIdx = args.indexOf("--env-file");
if (envFileIdx !== -1 && args[envFileIdx + 1]) {
    envPath = args[envFileIdx + 1];
    args.splice(envFileIdx, 2);
}

dotenv.config({ path: envPath });

const requiredVars = args.filter(v => /^[A-Z0-9_]+$/.test(v));

if (requiredVars.length === 0) {
    showHelp();
    process.exit(0);
}

const missing = requiredVars.filter(v => !process.env[v]);

if (missing.length > 0) {
    console.log(chalk.red("❌ Missing environment variables:"));
    missing.forEach(v => console.log(chalk.red(` - ${v}`)));
    process.exit(1);
} else {
    console.log(chalk.green("✅ All required env variables are set!"));
}