import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cluster from "cluster";
import os from "os";
import connectToMongoDB from './db/connectToMongoDB1.js';
import infoAuthRoutes from "./routes/info.routes.js"

const app = express();
const PORT = process.env.PORT || 4000;
const numCpus = os.cpus().length;
dotenv.config();
const __dirname = path.resolve();


// Middleware
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
// app.use((req, res, next) => {
//   const filePath = new URL("./log/request.json", import.meta.url).pathname;
//   const dirPath = path.dirname(filePath);

//   // Ensure log directory exists
//   if (!fs.existsSync(dirPath)) {
//     fs.mkdirSync(dirPath, { recursive: true });
//   }

//   const logEntry = {
//     ip: req.ip || req.connection.remoteAddress,
//     method: req.method,
//     url: req.originalUrl,
//     time: new Date().toISOString(),
//   };

//   // If file exists, read, append, and write
//   if (fs.existsSync(filePath)) {
//     let logs = [];
//     try {
//       logs = JSON.parse(fs.readFileSync(filePath, "utf-8"));
//       if (!Array.isArray(logs)) logs = [];
//     } catch {
//       logs = [];
//     }
//     logs.push(logEntry);
//     fs.writeFileSync(filePath, JSON.stringify(logs, null, 2), "utf-8");
//   }
//   // If file doesn't exist, create it with the first log entry
//   else {
//     const logs = [logEntry];
//     fs.writeFileSync(filePath, JSON.stringify(logs, null, 2), "utf-8");
//   }

//   next();
// });
app.use("/api/v1", infoAuthRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
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
