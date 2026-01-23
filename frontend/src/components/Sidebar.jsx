const Sidebar = ({ activeTab, setActiveTab, onLogout }) => {
  const menu = [
    { id: "dashboard", label: "Dashboard" },
    { id: "history", label: "Ride History" },
    { id: "reviews", label: "Reviews" },
    { id: "profile", label: "Profile Settings" },
  ];

  return (
    <aside className="w-64 bg-[#0F172A] text-white flex flex-col p-6">
      <h2 className="text-2xl font-bold mb-8">Captain Panel</h2>

      <nav className="flex flex-col gap-3">
        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`text-left px-4 py-2 rounded-lg transition ${
              activeTab === item.id
                ? "bg-blue-600"
                : "hover:bg-[#1E293B]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <button
        onClick={onLogout}
        className="mt-auto bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
