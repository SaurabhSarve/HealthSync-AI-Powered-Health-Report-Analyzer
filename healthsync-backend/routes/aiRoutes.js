import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { runAnalysis } from "../services/aiService.js";

const router = express.Router();

router.post("/analyze", authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });

    const analysis = await runAnalysis(text);
    res.json({ success: true, analysis });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI service failed", details: err.message });
  }
});

export default router;
