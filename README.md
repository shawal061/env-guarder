# env-guarder

A minimal, secure, and efficient environment variable validator for Node.js.

## 🚀 Features

* Validate required environment variables with optional types (`string`, `number`, `boolean`)
* Provide default values
* Clean CLI for quick checks
* Optional dotenv support
* Input sanitization to prevent injection or unsafe characters
* Minimal dependencies for lightweight performance
* Fail-safe process exit on missing variables

---

## 📦 Installation

```bash
npm install env-guarder
```

---

## ⚡ Usage (CLI)

Check environment variables directly from terminal:

```bash
npx env-guarder PORT DB_URL --dotenv
```

### ✅ Example Output

```bash
✅ All required env variables are set!
```

### ❌ Missing Variables

```bash
❌ Missing environment variables:
 - DB_URL
```

### CLI Notes

* The `--dotenv` flag loads `.env` automatically
* Only valid variable names (A-Z, 0-9, _) are processed

---

## 🧠 Usage (Code)

```js
import { validateEnv } from "env-guarder";

const env = validateEnv({
  PORT: { required: true, type: "number" },
  DB_URL: { required: true },
  NODE_ENV: { default: "development" }
}, { sanitize: true });

console.log(env.PORT);
```

* The second argument `{ sanitize: true }` ensures safe, clean values
* Types are automatically validated and converted

---

## 📄 .env Example

```env
PORT=3000
DB_URL=mongodb://localhost:27017/app
```

---

## ⚠️ Security & Notes

* Missing required variables stop the process safely with exit code 1
* Defaults are used when values are not provided
* Optional dotenv support loads `.env` securely
* CLI and library sanitize inputs to prevent unsafe characters or injection
* Minimal dependencies reduce attack surface and keep package lightweight
* Avoid committing secrets in `.env` files to public repos

---

## 🔧 Recommended Implementation Updates

1. `src/index.js`

   * Optional sanitization for safe usage
   * Type validation (`number`, `boolean`, `string`)
   * Fail-safe exits for missing variables

2. `bin/cli.js`

   * Sanitize command-line inputs
   * Optional `--dotenv` flag
   * Fail-safe exits for missing variables

3. `.gitignore`

   * Ignore `.env` and sensitive files

4. `.npmignore`

   * Exclude `.env`, node_modules, tests, and config files not needed for runtime

---

## 🛠 Roadmap

* Auto `.env.example` generator
* Config file support (`env-guarder.config.js`)
* TypeScript types for better IDE support
* Optional stricter type validation and regex patterns
* Enhanced CLI formatting with colors

---

## 👤 Author

Shakhawat Hossain

---

## 📄 License

MIT
