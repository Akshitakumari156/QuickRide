import React, { useState } from "react";
import useRideSearch from "../../hooks/useRideSearch";
import ActiveRidePanel from "./ActiveRidePanel";
import RideRequestPanel from "./components/RideRequestPanel";
import ResumeRideCard from "./components/ResumeRideCard";

const HomeSidebar = ({
  onPickupSelect,
  onDropoffSelect,
  onCheckPrice,
  fareData,
  setFareData,
  pickupCoords,
  dropoffCoords,
  error,
}) => {
  const {
    searching,
    activeRide,
    existingRide,

    handleConfirmRide,
    handleCancelSearch,
    handleCancelRide,
    handleStartNewRide,
    handleLocationInputChange,

    clearExistingRide,
  } = useRideSearch({
    pickupCoords,
    dropoffCoords,
    fareData,
    setFareData,
  });

  const [pickupValue, setPickupValue] = useState("");
  const [dropoffValue, setDropoffValue] = useState("");
  const [showResumeCard, setShowResumeCard] = useState(true);

  const handleResumeRide = () => {
    if (!existingRide) return;

    setPickupValue(existingRide.pickup.address || "");
    setDropoffValue(existingRide.destination.address || "");

    onPickupSelect({
      lat: existingRide.pickup.lat,
      lng: existingRide.pickup.lng,
      address: existingRide.pickup.address,
      name: existingRide.pickup.address,
    });

    onDropoffSelect({
      lat: existingRide.destination.lat,
      lng: existingRide.destination.lng,
      address: existingRide.destination.address,
      name: existingRide.destination.address,
    });

    clearExistingRide();
    setShowResumeCard(false);
  };

  const handleNewRide = async () => {
    await handleStartNewRide();

    setPickupValue("");
    setDropoffValue("");

    setShowResumeCard(false);
  };

  if (existingRide && showResumeCard) {
    return (
      <ResumeRideCard
        ride={existingRide}
        onContinueRide={handleResumeRide}
        onStartNewRide={handleNewRide}
      />
    );
  }

  if (activeRide) {
    return (
      <ActiveRidePanel
        activeRide={activeRide}
        onCancelRide={handleCancelRide}
      />
    );
  }

  return (
    <RideRequestPanel
      pickupValue={pickupValue}
      setPickupValue={setPickupValue}
      dropoffValue={dropoffValue}
      setDropoffValue={setDropoffValue}
      onPickupSelect={onPickupSelect}
      onDropoffSelect={onDropoffSelect}
      onCheckPrice={onCheckPrice}
      onConfirmRide={handleConfirmRide}
      onCancelSearch={handleCancelSearch}
      onLocationInputChange={handleLocationInputChange}
      fareData={fareData}
      searching={searching}
      error={error}
    />
  );
};

export default HomeSidebar;