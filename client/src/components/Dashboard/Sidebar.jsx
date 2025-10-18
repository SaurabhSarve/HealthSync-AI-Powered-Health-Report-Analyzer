import { FiHome, FiUpload, FiFileText, FiBarChart2, FiSettings } from "react-icons/fi";

export default function Sidebar({ activeNav, setActiveNav, profile, logout }) {
  const navItems = [
    { id: "dashboard", name: "Dashboard", icon: <FiHome size={20} /> },
    { id: "upload", name: "Upload", icon: <FiUpload size={20} /> },
    { id: "reports", name: "Reports", icon: <FiFileText size={20} /> },
    { id: "analytics", name: "Analytics", icon: <FiBarChart2 size={20} /> },
    { id: "settings", name: "Settings", icon: <FiSettings size={20} /> },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-indigo-600 to-indigo-400 text-white p-6 flex flex-col space-y-6 shadow-xl">
      <h1 className="text-3xl font-bold mb-2 text-center tracking-wide">HealthSync</h1>
      {profile.name && <p className="text-center text-white/90 mb-4">Hello, {profile.name}!</p>}

      <nav className="flex flex-col gap-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveNav(item.id)}
            className={`flex items-center gap-2 justify-start py-3 px-4 rounded-xl font-semibold text-lg transition-all ${
              activeNav === item.id
                ? "bg-white text-indigo-600 shadow-lg"
                : "hover:bg-indigo-500 hover:text-white"
            }`}
          >
            {item.icon} {item.name}
          </button>
        ))}
      </nav>

      <button
        onClick={logout}
        className="mt-auto bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl shadow-lg transition"
      >
        Logout
      </button>
    </aside>
  );
}
