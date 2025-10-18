# 🩺 HealthSync – AI-Powered Health Report Analyzer

**HealthSync** is a full-stack web application that intelligently **extracts, analyzes, and summarizes medical reports** using AI-driven and rule-based processing.  
Simply upload your **lab reports (PDFs or images)** to get **instant AI-generated health insights** — all processed **securely and locally**.


## 🧠 Key Features

- 📤 **Upload PDFs or images** of medical reports  
- 🧾 **Automatic text extraction** using OCR (`Tesseract.js`) and PDF parsing (`pdfjs-dist`)  
- ⚙️ **Analyze medical values** (Hemoglobin, WBC, Cholesterol, etc.) with **rule-based AI**  
- 🧬 **Generate natural language summaries** using **local transformer models**  
- 💾 **Secure dashboard** to store and view all your reports  
- 🌓 **Modern UI** with **clean design and dark mode**  

---

## 🏗️ Tech Stack

- 🎨 **Frontend:** React.js, Framer Motion, Recharts, TailwindCSS  
- ⚙️ **Backend:** Node.js, Express.js  
- 🧠 **AI & Processing:** @xenova/transformers (local AI), Tesseract.js (OCR), pdfjs-dist  
- 🔐 **Authentication:** JWT + custom `authMiddleware.js`  
- 🧰 **File Handling:** Multer, path/url (`fileURLToPath`)  
- 🗄️ **Database:** MongoDB (Mongoose)  
- ☁️ **Deployment:** Vercel / Render / Railway (optional)  

---

### 📁 Folder Structure
```bash
healthsync-ai-powered-health-analyzer/
│
├── client/                               # Frontend (React + Tailwind)
│   ├── public/                            # Static assets (index.html, favicon, images)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── DashboardHome.jsx
│   │   │   │   ├── UploadSection.jsx
│   │   │   │   ├── ReportsSection.jsx
│   │   │   │   ├── AnalyticsSection.jsx
│   │   │   │   ├── SettingsSection.jsx
│   │   │   │   └── ReportModal.jsx
│   │   │   ├── AnalysisResult.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── UploadForm.jsx
│   │   ├── services/api.js               # Axios configuration
│   │   ├── App.js                        # Routes setup
│   │   ├── index.js                      # React entry point
│   │   ├── tailwind.config.js
│   │   ├── App.css / index.css
│   │   └── reportWebVitals.js
│   └── package.json
│
└── healthsync-backend/                   # Backend (Node.js + Express + MongoDB)
    ├── config/db.js                      # MongoDB connection
    ├── controllers/
    │   ├── authController.js
    │   └── reportController.js
    ├── middleware/authMiddleware.js
    ├── models/
    │   ├── userModel.js
    │   └── reportModel.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── reportRoutes.js
    │   └── aiRoutes.js
    ├── services/
    │   ├── aiService.js
    │   ├── ocrService.js
    │   └── fileService.js
    ├── uploads/
    ├── .env
    ├── server.js
    └── package.json
```


⚙️ Install Dependencies
🧩 Backend
```
cd healthsync-backend
npm install
```

🎨 Frontend
```
cd ../client
npm install
```

🧪 Run the App Locally

▶️ Backend
```
cd healthsync-backend
npm start
```

💻 Frontend
```
cd ../client
npm run dev
```

📜 License

MIT License — free for personal and commercial use
