# env-guarder

A simple, lightweight environment variable validator for Node.js.

## 🚀 Features

* Validate required environment variables
* Provide default values
* Clean CLI for quick checks
* Zero configuration needed

---

## 📦 Installation

```bash
npm install env-guarder
```

---

## ⚡ Usage (CLI)

Check environment variables directly from terminal:

```bash
npx env-guarder PORT DB_URL
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

---

## 🧠 Usage (Code)

```js
import { validateEnv } from "env-guarder";

const env = validateEnv({
  PORT: { required: true },
  DB_URL: { required: true },
  NODE_ENV: { default: "development" }
});

console.log(env.PORT);
```

---

## 📄 .env Example

Create a `.env` file in your project:

```env
PORT=3000
DB_URL=mongodb://localhost:27017/app
```

---

## ⚠️ Notes

* Missing required variables will stop the process
* Defaults are used when values are not provided
* Works with `.env` via dotenv

---

## 🛠 Roadmap

* Type parsing (number, boolean)
* Auto `.env.example` generator
* Config file support
* Better error formatting

---

## 👤 Author

Shakhawat Hossain

---

## 📄 License

MIT
