const RideHistory = () => {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Ride History</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 border-b">
            <th className="py-2">Date</th>
            <th>From</th>
            <th>To</th>
            <th>Fare</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-b">
            <td className="py-3">20 Jan</td>
            <td>MG Road</td>
            <td>Airport</td>
            <td>₹420</td>
            <td className="text-green-600 font-medium">Completed</td>
          </tr>

          <tr>
            <td className="py-3">18 Jan</td>
            <td>City Mall</td>
            <td>Station</td>
            <td>₹180</td>
            <td className="text-red-500 font-medium">Cancelled</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RideHistory;
