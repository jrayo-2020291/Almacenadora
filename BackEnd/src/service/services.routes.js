'use strict'

const express = require('express');
const api = express.Router();
const serviceController = require('./services.controller');
const {ensureAuth, isAdmin} = require('../services/authenticated');


api.post('/add', serviceController.addService);
api.get('/get', serviceController.getServices);
api.put('/update/:id', serviceController.updateService);
api.get('/geta', [ensureAuth, isAdmin],serviceController.find);
api.get('/get/:id',[ensureAuth, isAdmin], serviceController.getForId);


module.exports = api;