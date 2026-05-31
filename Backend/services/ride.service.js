const Ride = require("../models/ride.model");


const { getDistanceAndETA }=require("./map.service");
const { calculateFare } = require("./price.service");

exports.createRide = async ({
  passengerId,
  pickup,
  destination,
}) => {

  const { distanceKm, durationMin } =
    await getDistanceAndETA(
      {
        lat: pickup.lat,
        lng: pickup.lng,
      },
      {
        lat: destination.lat,
        lng: destination.lng,
      }
    );

  const fare = calculateFare(
    Number(distanceKm),
    Number(durationMin)
  );

  const ride = await Ride.create({
    passengerId,
    pickup,
    destination,
    distanceKm,
    durationMin,
    fare,
    status: "PENDING",
  });

  return ride;
};