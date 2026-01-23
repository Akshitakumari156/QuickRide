const AvailabilityCard = ({ isOnline, setIsOnline }) => (
  <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center justify-center">
    <p className="text-gray-500 mb-2">Availability</p>

    <span
      className={`mb-4 px-4 py-1 rounded-full text-sm font-semibold ${
        isOnline
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-600"
      }`}
    >
      {isOnline ? "ONLINE" : "OFFLINE"}
    </span>

    <button
      onClick={() => setIsOnline((prev) => !prev)}
      className={`px-6 py-2 rounded-xl font-medium transition ${
        isOnline
          ? "bg-red-500 hover:bg-red-600"
          : "bg-green-500 hover:bg-green-600"
      } text-white`}
    >
      Go {isOnline ? "Offline" : "Online"}
    </button>
  </div>
);

export default AvailabilityCard;
