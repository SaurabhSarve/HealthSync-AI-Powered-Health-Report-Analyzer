export default function Header({ activeNav, profile, setActiveNav, logout }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-gray-800">
        {activeNav.charAt(0).toUpperCase() + activeNav.slice(1)}
      </h1>

      <div className="relative group">
        <div className="flex items-center gap-3 cursor-pointer bg-indigo-100 px-4 py-2 rounded-2xl">
          {profile.picture ? (
            <img
              src={profile.picture}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
              {profile.name ? profile.name.charAt(0) : "U"}
            </div>
          )}
          <span className="font-medium text-gray-800">{profile.name || "User"}</span>
        </div>

        <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg hidden group-hover:block">
          <button
            onClick={() => setActiveNav("settings")}
            className="block w-full text-left px-4 py-2 hover:bg-indigo-100 rounded-xl"
          >
            Settings
          </button>
          <button
            onClick={logout}
            className="block w-full text-left px-4 py-2 hover:bg-red-100 rounded-xl"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
