'use strict'

const mongoose = require('mongoose');

const leaseSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    storage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Storage',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rentalDate:{
        type: Date,
        required: true
    }
    ,
    dueDate: {
        type: Date,
        required: true
    },
    services: [{
        service: {type: mongoose.Schema.Types.ObjectId, ref: 'Services', required: true},
        price: {type: Number, required:true}
    }],
    total: {
        type: Number,
        required: true
    }
},{
    timeStamps: true,
    versionKey: false
});

module.exports = mongoose.model('Lease', leaseSchema);