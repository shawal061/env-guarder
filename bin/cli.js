#!/usr/bin/env node
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const requiredVars = ["PORT", "DB_URL"]; // temp example

const missing = requiredVars.filter(v => !process.env[v]);

if (missing.length > 0) {
    console.log("❌ Missing env variables:");
    missing.forEach(v => console.log(` - ${v}`));
    process.exit(1);
} else {
    console.log("✅ All required env variables are set!");
}