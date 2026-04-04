export function validateEnv(schema) {
    const errors = [];
    const result = {};

    for (const key in schema) {
        const value = process.env[key];

        if (value === undefined || value === "") {
            if (schema[key]?.required) {
                errors.push(key);
            } else {
                result[key] = schema[key]?.default;
            }
        } else {
            result[key] = value;
        }
    }

    if (errors.length) {
        console.error("❌ Missing environment variables:");
        errors.forEach(e => console.error(` - ${e}`));
        process.exit(1);
    }

    return result;
}