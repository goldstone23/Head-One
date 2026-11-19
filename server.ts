import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import { ZipArchive } from "archiver";

dotenv.config();

let razorpay: Razorpay | null = null;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize SQLite Database
  const db = new Database("file:agency.db", { verbose: console.log });
  db.pragma("journal_mode = WAL");

  // Run migrations/schema setup
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      name TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS subscriptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      razorpay_customer_id TEXT,
      razorpay_subscription_id TEXT,
      plan_tier TEXT,
      status TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );
    CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      razorpay_order_id TEXT,
      amount INTEGER,
      service TEXT,
      tier TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );
  `);

  app.use(express.json());

  app.post("/api/razorpay/create-order", async (req, res) => {
    try {
      const { service, tier, price, type } = req.body;

      if (!razorpay) {
        console.warn("No Razorpay keys found, simulating order response.");
        return res.json({ 
          id: `mock_order_${Date.now()}`, 
          subType: type,
          isMock: true
        });
      }

      // Razorpay expects amount in subunits (paise for INR)
      // Assuming we're using USD for now (Razorpay supports multi-currency but requires config)
      const options = {
        amount: price * 100,
        currency: "USD",
        receipt: `receipt_${Date.now()}`,
        notes: {
          service,
          tier,
          type
        }
      };

      const order = await razorpay.orders.create(options);
      res.json({
        ...order,
        key_id: process.env.RAZORPAY_KEY_ID
      });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/webhooks/razorpay", async (req, res) => {
      // Mock simple webhook receiver for razorpay since razorpay sdk verifies signature differently (with crypto)
      // For simplicity, we just respond OK. In production, verify razorpay-signature.
      console.log("Razorpay webhook received:", req.body);
      res.json({ status: "ok" });
  });

  app.get("/api/download-zip", (req, res) => {
    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", 'attachment; filename="headone-website.zip"');

    const archive = new ZipArchive({ zlib: { level: 9 } });

    archive.on("error", (err) => {
      console.error("Archive error:", err);
      if (!res.headersSent) {
        res.status(500).json({ error: err.message });
      }
    });

    archive.pipe(res);

    archive.glob("**/*", {
      cwd: process.cwd(),
      dot: true,
      ignore: [
        "node_modules/**",
        "dist/**",
        ".git/**",
        ".env",
        ".env.*",
        "!.env.example",
        "file:agency.db*",
        "agency.db*",
      ],
    });

    archive.finalize();
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
