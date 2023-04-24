'use strict'

const express = require('express');
const api = express.Router();
const serviceController = require('./services.controller');

api.post('/add', serviceController.addService);
api.get('/get', serviceController.getServices);
api.put('/update/:id', serviceController.updateService);

module.exports = api;