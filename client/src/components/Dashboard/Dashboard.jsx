import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Header from "./Header";
import DashboardHome from "./DashboardHome";
import UploadSection from "./UploadSection";
import ReportsSection from "./ReportsSection";
import AnalyticsSection from "./AnalyticsSection";
import SettingsSection from "./SettingsSection";
import ReportModal from "./ReportModal";

export default function Dashboard() {
  const navigate = useNavigate();

  const [activeNav, setActiveNav] = useState("dashboard");
  const [reports, setReports] = useState([
    { id: 1, name: "Report 1", confidence: 90, risk: 10, severity: "Low", summary: "All good." },
    { id: 2, name: "Report 2", confidence: 70, risk: 30, severity: "Moderate", summary: "Monitor closely." },
    { id: 3, name: "Report 3", confidence: 50, risk: 50, severity: "High", summary: "Immediate attention required." },
  ]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [profile, setProfile] = useState({ name: "", email: "", picture: null });
  const [editProfile, setEditProfile] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setProfile(storedUser);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const saveProfile = () => {
    localStorage.setItem("user", JSON.stringify(profile));
    setEditProfile(false);
    alert("Profile updated!");
  };

  const downloadReports = () => {
    const dataStr =
      "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(reports, null, 2));
    const a = document.createElement("a");
    a.href = dataStr;
    a.download = "HealthSync_Reports.json";
    a.click();
  };

  const clearReports = () => setReports([]);

  const stats = [
    { title: "Reports Analyzed", value: reports.length, color: "from-indigo-500 to-indigo-700" },
    { title: "AI Accuracy", value: "95%", color: "from-green-400 to-green-600" },
    { title: "24/7 Monitoring", value: "Enabled", color: "from-yellow-400 to-yellow-500" },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-50 to-indigo-100 transition-colors duration-500">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} profile={profile} logout={logout} />

      <main className="flex-1 p-8 flex flex-col space-y-6">
        <Header activeNav={activeNav} profile={profile} setActiveNav={setActiveNav} logout={logout} />

        <motion.div
          key={activeNav}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeNav === "dashboard" && (
            <DashboardHome reports={reports} stats={stats} setSelectedReport={setSelectedReport} />
          )}
          {activeNav === "upload" && <UploadSection setReports={setReports} />}
          {activeNav === "reports" && (
            <ReportsSection reports={reports} setSelectedReport={setSelectedReport} />
          )}
          {activeNav === "analytics" && <AnalyticsSection reports={reports} />}
          {activeNav === "settings" && (
            <SettingsSection
              profile={profile}
              setProfile={setProfile}
              editProfile={editProfile}
              setEditProfile={setEditProfile}
              saveProfile={saveProfile}
              downloadReports={downloadReports}
              clearReports={clearReports}
              logout={logout}
            />
          )}
        </motion.div>
      </main>

      {selectedReport && (
        <ReportModal selectedReport={selectedReport} setSelectedReport={setSelectedReport} />
      )}
    </div>
  );
}
