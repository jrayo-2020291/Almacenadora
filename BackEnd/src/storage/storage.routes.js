'use strict'

const storageController = require('./storage.controller');
const express = require('express');
const api = express.Router();
const { ensureAuth, isAdmin } = require('../services/authenticated');

//Rutas públicas
api.get('/' , storageController.test);
api.get('/get',[ensureAuth,isAdmin], storageController.get)
api.post('/getForId/:id',[ensureAuth,isAdmin],storageController.getForId)
api.post('/getForName',[ensureAuth,isAdmin],storageController.getForName)
api.post('/getForAvailability',[ensureAuth,isAdmin], storageController.getForAvailability)
api.post('/add',[ensureAuth,isAdmin], storageController.add)
api.put('/update/:id',[ensureAuth,isAdmin],storageController.update)
api.delete('/delete/:id',[ensureAuth,isAdmin],storageController.delete)

module.exports = api;