'use strict'

const leaseController = require('./lease.controller');
const express = require('express');
const api = express.Router();
const { ensureAuth} = require('../services/authenticated');

api.get('/test', leaseController.test);
api.post('/add', ensureAuth, leaseController.add);
api.get('/get', ensureAuth, leaseController.get);
api.get('/get/:id', ensureAuth, leaseController.getById);
api.get('/getByUser', ensureAuth, leaseController.getByUser);
api.put('/addService/:id', ensureAuth, leaseController.addService);
api.put('/subtractService/:id', ensureAuth, leaseController.substractService);
api.put('/update/:id', ensureAuth, leaseController.updateLease);
api.delete('/delete/:id', ensureAuth, leaseController.deleteLease);

module.exports = api;