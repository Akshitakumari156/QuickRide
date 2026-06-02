const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    passengerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    captainId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Captain',
        default: null
    },
    pickup: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    destination: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    fare: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['PENDING', 'ACCEPTED', 'ONGOING', 'COMPLETED', 'CANCELLED'],
        default: 'PENDING'
    },
    // ⚡ THE CRITICAL FIX: Define these missing fields so Mongoose allows them to be saved!
    distanceKm: {
        type: Number,
        required: true
    },
    durationMin: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Ride', rideSchema);