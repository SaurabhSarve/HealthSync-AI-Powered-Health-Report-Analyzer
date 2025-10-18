import fs from "fs";
import path from "path";
import Tesseract from "tesseract.js";
import pdfjsLib from "pdfjs-dist/legacy/build/pdf.js"; // use legacy build for Node

export const extractText = async (filePath) => {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const ext = path.extname(filePath).toLowerCase();
  let text = "";

  if (ext === ".pdf") {
    const data = new Uint8Array(fs.readFileSync(filePath));

    // Path to fonts folder
    const fontsDir = path.join(process.cwd(), "fonts") + path.sep;

    // Load PDF with standardFontDataUrl
    const pdfDoc = await pdfjsLib.getDocument({
      data,
      standardFontDataUrl: fontsDir, // must point to folder containing fonts
    }).promise;

    for (let i = 1; i <= pdfDoc.numPages; i++) {
      const page = await pdfDoc.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item) => item.str).join(" ") + "\n";
    }
  } else if ([".jpg", ".jpeg", ".png"].includes(ext)) {
    const result = await Tesseract.recognize(filePath, "eng");
    text = result.data.text || "";
  } else {
    throw new Error("Unsupported file type");
  }

  return text.trim();
};

export default { extractText };
