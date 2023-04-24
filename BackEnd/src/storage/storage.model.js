
'use strict'

const mongoose = require('mongoose');

const storageSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    availability: {
        type: String,
        required: true,
        lowercase: true
    },
    monthlyPrice: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Storage', storageSchema);