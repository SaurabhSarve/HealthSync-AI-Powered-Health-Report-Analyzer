// services/aiService.js
import { pipeline } from "@xenova/transformers";

let summarizer = null;

export async function initModels() {
  try {
    console.log("🧠 Loading summarization model...");
    summarizer = await pipeline("summarization", "Xenova/bart-large-cnn");
    console.log("✅ Summarization model loaded successfully");
  } catch (error) {
    console.error("❌ Model loading failed:", error);
  }
}

export async function runAnalysis(text) {
  if (!summarizer) {
    throw new Error("Model not initialized — call initModels() first");
  }

  const lower = text.toLowerCase();
  const findings = [];

  // Helper to extract numeric value
  const extractValue = (pattern) => {
    const match = lower.match(pattern);
    return match ? parseFloat(match[1]) : null;
  };

  // -----------------------------
  // 🧪 Common Medical Parameters
  // -----------------------------
  const hemoglobin = extractValue(/hemoglobin[:\s]+(\d+(\.\d+)?)/);
  const wbc = extractValue(/wbc[:\s]+(\d+(\.\d+)?)/);
  const platelet = extractValue(/platelet[:\s]+(\d+(\.\d+)?)/);
  const glucose = extractValue(/(fasting\s*)?glucose[:\s]+(\d+(\.\d+)?)/) || extractValue(/blood sugar[:\s]+(\d+(\.\d+)?)/);
  const cholesterol = extractValue(/cholesterol[:\s]+(\d+(\.\d+)?)/);
  const creatinine = extractValue(/creatinine[:\s]+(\d+(\.\d+)?)/);
  const bpSys = extractValue(/(\d{2,3})\s*\/\s*(\d{2,3})/);
  const bpDia = lower.match(/(\d{2,3})\s*\/\s*(\d{2,3})/) ? parseFloat(lower.match(/(\d{2,3})\s*\/\s*(\d{2,3})/)[2]) : null;
  const rbc = extractValue(/rbc[:\s]+(\d+(\.\d+)?)/);
  const hct = extractValue(/hct[:\s]+(\d+(\.\d+)?)/);
  const mcv = extractValue(/mcv[:\s]+(\d+(\.\d+)?)/);

  // -----------------------------
  // 🩸 Hemoglobin (Normal: 13–17)
  // -----------------------------
  if (hemoglobin !== null) {
    if (hemoglobin < 12)
      findings.push("Hemoglobin is mildly low (possible anemia).");
    else if (hemoglobin > 17)
      findings.push("Hemoglobin is elevated (possible dehydration or polycythemia).");
    else
      findings.push("Hemoglobin level is normal.");
  }

  // ⚪ WBC (Normal: 4000–11000)
  if (wbc !== null) {
    if (wbc < 4000)
      findings.push("WBC count is low (leukopenia).");
    else if (wbc > 11000)
      findings.push("WBC count is slightly elevated (may indicate infection).");
    else
      findings.push("WBC count is normal.");
  }

  // 🟡 Platelet (Normal: 150000–450000)
  if (platelet !== null) {
    if (platelet < 150000)
      findings.push("Platelet count is low (thrombocytopenia).");
    else if (platelet > 450000)
      findings.push("Platelet count is elevated (thrombocytosis).");
    else
      findings.push("Platelet count is normal.");
  }

  // 🍬 Glucose (Normal: <100 fasting)
  if (glucose !== null) {
    if (glucose < 70)
      findings.push("Fasting glucose is low (hypoglycemia).");
    else if (glucose >= 126)
      findings.push("Fasting glucose is high (possible diabetes).");
    else if (glucose >= 100)
      findings.push("Fasting glucose is slightly elevated (prediabetes).");
    else
      findings.push("Fasting glucose is normal.");
  }

  // 🧈 Cholesterol (Normal: <200)
  if (cholesterol !== null) {
    if (cholesterol >= 240)
      findings.push("Cholesterol level is high (hypercholesterolemia).");
    else if (cholesterol >= 200)
      findings.push("Cholesterol is borderline high.");
    else
      findings.push("Cholesterol level is normal.");
  }

  // 💧 Creatinine (Normal: 0.6–1.3)
  if (creatinine !== null) {
    if (creatinine > 1.3)
      findings.push("Creatinine level is elevated (possible kidney dysfunction).");
    else if (creatinine < 0.6)
      findings.push("Creatinine level is low (possible low muscle mass).");
    else
      findings.push("Creatinine level is normal.");
  }

  // ❤️ Blood Pressure (Normal: <120/80)
  if (bpSys !== null && bpDia !== null) {
    if (bpSys > 140 || bpDia > 90)
      findings.push("Blood pressure is high (hypertension).");
    else if (bpSys < 90 || bpDia < 60)
      findings.push("Blood pressure is low (hypotension).");
    else
      findings.push("Blood pressure is normal.");
  }

  // 🔴 RBC (Normal: 4.5–5.9)
  if (rbc !== null) {
    if (rbc < 4.0)
      findings.push("RBC count is low (possible anemia).");
    else if (rbc > 6.0)
      findings.push("RBC count is elevated (erythrocytosis).");
    else
      findings.push("RBC count is normal.");
  }

  // 🧬 HCT (Normal: 38–50%)
  if (hct !== null) {
    if (hct < 38)
      findings.push("Hematocrit is low (possible anemia).");
    else if (hct > 50)
      findings.push("Hematocrit is high (possible dehydration).");
    else
      findings.push("Hematocrit is normal.");
  }

  // 📊 MCV (Normal: 80–100)
  if (mcv !== null) {
    if (mcv < 80)
      findings.push("MCV is low (microcytic anemia).");
    else if (mcv > 100)
      findings.push("MCV is high (macrocytic anemia).");
    else
      findings.push("MCV is normal.");
  }

  // ✅ If medical values found → return rule-based summary instantly
  if (findings.length > 0) {
    return {
      summary: findings.join(" "),
      originalText: text,
    };
  }

  // 🧠 Otherwise use summarization model
  const summaryOutput = await summarizer(text, {
    max_length: 80,
    min_length: 20,
  });

  return {
    summary: summaryOutput[0].summary_text,
    originalText: text,
  };
}
