const StatsCard = ({ label, value }) => (
  <div className="bg-white rounded-2xl shadow p-6 text-center">
    <p className="text-gray-500">{label}</p>
    <h3 className="text-2xl font-bold mt-2">{value}</h3>
  </div>
);

export default StatsCard;
