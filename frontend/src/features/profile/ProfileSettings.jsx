const ProfileSettings = () => {
  return (
    <div className="bg-white rounded-2xl shadow p-6 max-w-xl">
      <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800"
        />

        <input
          type="text"
          placeholder="Vehicle Number"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800"
        />

        <button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2 rounded-lg">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
