import fs from "fs";
import path from "path";
import Report from "../models/reportModel.js";
import ocrService from "../services/ocrService.js";
import { runAnalysis } from "../services/aiService.js";


// Ensure uploads folder exists
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

export const uploadReport = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "File required" });

    const report = new Report({
      userId: req.userId,
      fileName: file.originalname,
      filePath: file.path,
      status: "processing",
    });
    await report.save();

    // Extract text
    const text = await ocrService.extractText(file.path);
    report.rawText = text;
    await report.save();

    // Run AI analysis
    try {
      const analysis = await runAnalysis(text);
      report.aiAnalysis = analysis;
      report.status = "done";
      await report.save();
    } catch (aiErr) {
      console.error("AI analysis failed:", aiErr);
      report.status = "failed";
      await report.save();
    }

    res.json({ reportId: report._id, status: report.status });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
};

export const getReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ error: "Not found" });

    if (String(report.userId) !== String(req.userId)) {
      return res.status(403).json({ error: "Forbidden" });
    }

    res.json(report);
  } catch (err) {
    console.error("Get report error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
