'use strict'

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true
    },
    DPI:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    }
},{
    versionkey: false,
    timestamps: true
});

module.exports = mongoose.model('user', userSchema);