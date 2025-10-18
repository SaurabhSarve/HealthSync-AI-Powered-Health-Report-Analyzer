import { motion } from "framer-motion";

export default function SettingsSection({
  profile,
  setProfile,
  editProfile,
  setEditProfile,
  saveProfile,
  downloadReports,
  clearReports,
  logout,
}) {
  return (
    <motion.div className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto space-y-8 transition-colors duration-500">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Settings</h2>

      {/* Profile */}
      <div className="bg-indigo-50 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-700">Profile</h3>
          <button
            onClick={() => setEditProfile(!editProfile)}
            className="text-indigo-600 font-semibold"
          >
            {editProfile ? "Cancel" : "Edit"}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          {profile.picture && (
            <img
              src={profile.picture}
              alt="Profile"
              className="w-24 h-24 rounded-full shadow-md"
            />
          )}
          <div className="flex-1">
            {editProfile ? (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-indigo-400"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="border p-2 rounded-lg w-full mt-2 focus:ring-2 focus:ring-indigo-400"
                />
                <input
                  type="file"
                  onChange={(e) =>
                    setProfile({ ...profile, picture: URL.createObjectURL(e.target.files[0]) })
                  }
                  className="border p-2 rounded-lg w-full mt-2"
                />
                <button
                  onClick={saveProfile}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg shadow-md mt-3"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <p className="font-medium text-gray-800">{profile.name}</p>
                <p className="text-gray-600">{profile.email}</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-green-50 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
        <div className="flex flex-wrap gap-4">
          <button
            onClick={downloadReports}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg shadow-md transition"
          >
            Download Reports
          </button>
          <button
            onClick={clearReports}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md transition"
          >
            Clear Reports
          </button>
        </div>
      </div>

      {/* Logout */}
      <div className="flex justify-end">
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-xl shadow-md transition"
        >
          Logout
        </button>
      </div>
    </motion.div>
  );
}
