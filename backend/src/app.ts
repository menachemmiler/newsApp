import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import newsRoutes from "./routes/newsRoutes";

// טעינת משתני סביבה מהקובץ .env
dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

// חיבור הראוטר
app.use("/api/news", newsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[server]: TS Proxy server is running on port ${PORT}`);
});
