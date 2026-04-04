# env-guarder 🛡️

[![npm version](https://img.shields.io/npm/v/env-guarder.svg)](https://www.npmjs.com/package/env-guarder)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A robust, lightweight, and type-safe environment variable validator for Node.js. Ensure your application has all the required configuration before it even starts.

## 🚀 Features

* **Type Validation**: Support for `string`, `number`, and `boolean`.
* **Auto-Casting**: Automatically converts "3000" to `3000` (Number) or "true" to `true` (Boolean).
* **Default Values**: Provide sensible defaults for optional variables.
* **Custom Validation**: Add your own logic with validation functions.
* **TypeScript Support**: Full type definitions included.
* **Powerful CLI**: Quickly check environment variables from your terminal.
* **Minimal Dependencies**: Only uses `chalk` and `dotenv`.

---

## 📦 Installation

```bash
npm install env-guarder
```

---

## ⚡ Usage (CLI)

Check if required environment variables are set in your `.env` file directly from the terminal.

```bash
# Basic usage
npx env-guarder PORT DB_URL

# Specify a custom .env file
npx env-guarder PORT DB_URL --env-file .env.production

# Show help
npx env-guarder --help
```

### ✅ Output Example

```bash
✅ All required env variables are set!
```

---

## 🧠 Usage (Code)

### Basic Validation

```javascript
import { validateEnv } from "env-guarder";

const env = validateEnv({
  PORT: { required: true, type: "number", default: 3000 },
  DB_URL: { required: true },
  DEBUG: { type: "boolean", default: false }
});

console.log(env.PORT); // 3000 (Number)
console.log(env.DEBUG); // false (Boolean)
```

### Custom Validation

```javascript
const env = validateEnv({
  API_KEY: {
    required: true,
    validate: (val) => val.length >= 32 || "API_KEY must be at least 32 characters long"
  }
});
```

### Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `exitOnError` | `boolean` | `true` | If true, calls `process.exit(1)` on validation failure. If false, throws an `Error`. |

---

## 📘 TypeScript

`env-guarder` comes with built-in type definitions.

```typescript
import { validateEnv } from "env-guarder";

interface Config {
  PORT: number;
  DB_URL: string;
}

const config = validateEnv<Config>({
  PORT: { required: true, type: "number" },
  DB_URL: { required: true }
});

// config.PORT is correctly typed as number
```

---

## 📄 .env Example

```env
PORT=3000
DB_URL=postgres://localhost:5432/mydb
```

---

## 🛠 Roadmap

* [ ] Auto `.env.example` generator
* [ ] Config file support (`env-guarder.config.js`)
* [ ] Glob patterns for variable names
* [ ] Support for array types

---

## 👤 Author

**Shakhawat Hossain**
* GitHub: [@shawal061](https://github.com/shawal061)

---

## 📄 License

MIT © [Shakhawat Hossain](LICENSE)

