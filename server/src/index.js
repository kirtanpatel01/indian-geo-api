import express from "express";
import { config } from "dotenv";
import { connectMongoDB } from "./db/config.js";
import geoDataRoutes from "./routes/routes.js";
import adminRoutes from './routes/admin.route.js';
import path from "path";
import { fileURLToPath } from "url";

config();

const PORT = process.env.PORT || 3000;
const app = express();
const MONGODB_URL =
   process.env.MONGODB_URL ||
   "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.2";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use("/api/geo-data", geoDataRoutes);
app.use('/api/admin', adminRoutes);

const buildPath = path.join(__dirname, "../../client/dist");
app.use(express.static(buildPath));

app.get("*", (req, res) => {
   res.sendFile(path.join(buildPath, "index.html"));
});

connectMongoDB(MONGODB_URL).then(() => {
   app.listen(PORT, () => {
      console.log(`Server is started at http://localhost:${PORT}`);
   });
});
