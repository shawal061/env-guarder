export function validateEnv(schema, options = { exitOnError: true }) {
    const errors = [];
    const result = {};

    for (const key in schema) {
        let value = process.env[key];
        const rule = schema[key] || {};

        if (value === undefined || value === "") {
            if (rule.required) {
                errors.push(`Missing required variable: ${key}`);
                continue;
            } else {
                value = rule.default;
            }
        }

        if (value !== undefined) {
            // Type casting and validation
            if (rule.type === "number") {
                const num = Number(value);
                if (isNaN(num)) {
                    errors.push(`Variable ${key} must be a number`);
                } else {
                    value = num;
                }
            } else if (rule.type === "boolean") {
                if (value === "true" || value === true) value = true;
                else if (value === "false" || value === false) value = false;
                else {
                    errors.push(`Variable ${key} must be a boolean (true/false)`);
                }
            }

            // Custom validation
            if (rule.validate && typeof rule.validate === "function") {
                const isValid = rule.validate(value);
                if (isValid !== true) {
                    errors.push(`Variable ${key} failed custom validation: ${isValid || "Invalid value"}`);
                }
            }
        }

        result[key] = value;
    }

    if (errors.length) {
        if (options.exitOnError) {
            console.error("❌ Environment validation failed:");
            errors.forEach(e => console.error(` - ${e}`));
            process.exit(1);
        }
        throw new Error(`Environment validation failed:\n${errors.join("\n")}`);
    }


    return result;
}