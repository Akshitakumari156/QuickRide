// Generates a client-side id to tag a single "search rider" attempt. This
// lets the backend tie together a createRide() call and a later
// cancel/abort call even when the frontend never got far enough to learn
// the real Mongo _id of the ride (e.g. the connection dropped before the
// response arrived). Falls back to a timestamp+random string if
// crypto.randomUUID isn't available (older browsers / non-HTTPS contexts).
export const generateRequestId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `req_${Date.now()}_${Math.random().toString(36).slice(2)}`;
};