import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"; // ✅ Import cors
import authRoutes from "./routes/authRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import { initModels } from "./services/aiService.js";

dotenv.config();
const app = express();
app.use(express.json());

// ✅ Enable CORS for frontend at localhost:3000
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

// Routes
app.use("/api/auth", authRoutes);  
app.use("/api/reports", reportRoutes);
app.use("/api/ai", aiRoutes);


// MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost/healthsync")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Initialize AI models first
initModels()
  .then(() => {
    console.log("✅ AI models loaded");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error("Failed to load AI models:", err);
    process.exit(1);
  });
