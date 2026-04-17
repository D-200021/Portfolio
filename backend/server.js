import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cluster from "cluster";
import os from "os";
import path from "path";
import connectToMongoDB from './db/connectToMongoDB1.js';
import infoAuthRoutes from "./routes/info.routes.js"

const app = express();
const PORT = process.env.PORT || 4000;
const numCpus = os.cpus().length;
dotenv.config();
const __dirname = path.resolve();


// Middleware
const allowedOrigins = ["https://dhruvsheth.onrender.com"];

if (process.env.MODE === "DEV") {
  allowedOrigins.push("http://localhost:3000")
}

const corsOptions = {
  origin: (origin, callback) => {
    // Allow GET without origin (browser navigation, health checks)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Origin not allowed"));
    }
  },
  methods: ["GET", "POST", "HEAD"],
  credentials: true
};

app.enable('trust proxy', 1);

app.use(cors(corsOptions));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  const origin = req.headers.origin;

  res.removeHeader("x-powered-by");

  // Enforce HTTPS (non-DEV)
  if (process.env.MODE !== "DEV") {
    if (!req.secure) {
      return res.status(403).send("HTTPS required");
      // OR redirect:
      // return res.redirect(`https://${req.headers.host}${req.url}`);
    }
  }

  // POST must always have a valid origin
  if (req.method === "POST") {
    if (!origin || !allowedOrigins.includes(origin)) {
      return res.status(403).json({ error: "Invalid origin" });
    }
  }

  // Allow only GET, POST, OPTIONS
  if (!["GET", "POST", "OPTIONS", "HEAD"].includes(req.method)) {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  next();
});

app.use("/api/v1", infoAuthRoutes);

app.use(express.static(path.join(__dirname, "frontend", "dist")));

app.use((req, res) => {
  res.sendFile(
    path.join(__dirname, "frontend", "dist", "index.html")
  );
});

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCpus; i++) {
    cluster.fork();
  }

  // Restart worker if it dies
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    console.log("Starting a new worker...");
    cluster.fork();
  });

} else {
  app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Portfolio backend running on http://localhost:${PORT}`);
  });
}
