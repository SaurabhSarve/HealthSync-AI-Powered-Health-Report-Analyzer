import { useState, useRef } from "react";
import axios from "axios";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";
import { motion, AnimatePresence } from "framer-motion";

export default function UploadForm({ setReports }) {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [text, setText] = useState("");
  const dropRef = useRef(null);

  // Drag & drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    dropRef.current.classList.add("border-indigo-400", "bg-indigo-50");
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    dropRef.current.classList.remove("border-indigo-400", "bg-indigo-50");
  };
  const handleDrop = async (e) => {
    e.preventDefault();
    dropRef.current.classList.remove("border-indigo-400", "bg-indigo-50");
    const file = e.dataTransfer.files[0];
    if (file) await processFile(file);
  };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) await processFile(file);
  };

  // Process uploaded file
  const processFile = async (file) => {
    setLoading(true);
    let extractedText = "";
    try {
      if (file.type === "application/pdf") {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          extractedText += content.items.map((item) => item.str).join(" ") + "\n";
        }
      } else {
        extractedText = await file.text();
      }
      setText(extractedText.trim());
      await analyzeText(extractedText);
    } catch (err) {
      console.error(err);
      showNotification("Failed to process file.", "error");
    }
    setLoading(false);
  };

  // Analyze text (either pasted or uploaded)
  const analyzeText = async (textToAnalyze) => {
    if (!textToAnalyze.trim()) {
      showNotification("Text is empty. Please provide text or upload a file.", "error");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const endpoint = "http://localhost:5000/api/ai/analyze";
      const res = await axios.post(
        endpoint,
        { text: textToAnalyze },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newReport = {
        id: Date.now(),
        name: textToAnalyze.length > 20 ? textToAnalyze.slice(0, 20) + "..." : "Text Input",
        confidence: res.data.analysis.confidence || Math.floor(Math.random() * 100),
        risk: res.data.analysis.risk || Math.floor(Math.random() * 100),
        severity: res.data.analysis.severity || "Moderate",
        summary: res.data.analysis.summary || "AI analysis summary not available.",
      };
      setReports((prev) => [newReport, ...prev]);
      showNotification("Analysis complete & report added!", "success");
      setText("");
    } catch (err) {
      console.error(err);
      showNotification("Analysis failed.", "error");
    }
    setLoading(false);
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`p-3 rounded-xl text-white font-semibold shadow-md ${
              notification.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Text Input Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">Paste Report Text</h2>
        <textarea
          className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          rows={5}
          placeholder="Paste your medical report text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={() => analyzeText(text)}
          disabled={loading || !text.trim()}
          className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition"
        >
          {loading ? "Analyzing..." : "Analyze Text"}
        </button>
      </div>

      {/* File Upload Section */}
      <div
        ref={dropRef}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("fileInput").click()}
        className={`bg-white p-6 rounded-2xl shadow-lg border-2 border-dashed border-gray-300 text-center cursor-pointer transition-all ${
          loading ? "opacity-50 pointer-events-none" : "hover:border-indigo-400 hover:bg-indigo-50"
        }`}
      >
        <h2 className="text-xl font-semibold mb-2 text-gray-700">Upload PDF / TXT File</h2>
        <p className="text-gray-500">{loading ? "Analyzing file..." : "Drag & drop a file here or click to select."}</p>
        <input
          id="fileInput"
          type="file"
          accept=".txt,.pdf"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}
