const Reviews = () => {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Passenger Reviews</h2>

      <div className="space-y-4">
        <div className="border rounded-lg p-4">
          ⭐⭐⭐⭐⭐
          <p className="text-gray-700 mt-1">
            Very polite and smooth ride.
          </p>
        </div>

        <div className="border rounded-lg p-4">
          ⭐⭐⭐⭐
          <p className="text-gray-700 mt-1">
            Good driving but arrived late.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
