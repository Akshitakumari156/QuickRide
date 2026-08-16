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
        lng: { type: Number, required: true },
        address: { type: String, required: true } 
    },
    destination: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
        address: { type: String, required: true } 
    },
    fare: {
        type: Number,
        required: true
    },
    otp: {
        type: String,
        select: false,
        required: true
    },
    status: {
        type: String,
        enum: ['PENDING', 'ACCEPTED', 'ARRIVED', 'ONGOING', 'COMPLETED', 'CANCELLED'],
        default: 'PENDING'
    },
    clientRequestId: {
        type: String,
        index: true,
        sparse: true,
        unique: true 
    },
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