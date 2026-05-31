const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema(
{
    passengerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    captainId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Captain",
        default: null
    },

    pickup: {
        lat: Number,
        lng: Number,
        address: String
    },

    destination: {
        lat: Number,
        lng: Number,
        address: String
    },

    fare: {
        type: Number,
        required: true
    },

    distance: Number,

    status: {
        type: String,
        enum: [
            "PENDING",
            "ACCEPTED",
            "ARRIVING",
            "ONGOING",
            "COMPLETED",
            "CANCELLED"
        ],
        default: "PENDING"
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Ride", rideSchema);