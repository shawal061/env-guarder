#!/usr/bin/env node
import dotenv from "dotenv";

dotenv.config();

const requiredVars = process.argv.slice(2);

if (requiredVars.length === 0) {
    console.log("⚠️  Please provide env variables to check:");
    console.log("Example: env-guarder PORT DB_URL");
    process.exit(0);
}

const missing = requiredVars.filter(v => !process.env[v]);

if (missing.length > 0) {
    console.log("❌ Missing environment variables:");
    missing.forEach(v => console.log(` - ${v}`));
    process.exit(1);
} else {
    console.log("✅ All required env variables are set!");
}