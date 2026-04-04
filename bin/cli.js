#!/usr/bin/env node
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

const requiredVars = process.argv.slice(2);

if (requiredVars.length === 0) {
    console.log(chalk.yellow("⚠️  Please provide env variables to check"));
    console.log(chalk.gray("Example: env-guarder PORT DB_URL"));
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