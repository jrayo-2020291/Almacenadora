'use strict'

const userController = require('./user.controller');
const express = require('express');
const api = express.Router();
const {ensureAuth, isAdmin} = require('../services/authenticated');

api.get('/test', userController.test);
api.post('/add', [ensureAuth, isAdmin], userController.add);
api.get('/get', ensureAuth, userController.get);
api.post('/getByDPI', [ensureAuth, isAdmin], userController.getByDPI);
api.get('/get/:id', [ensureAuth, isAdmin], userController.getById);
api.put('/update/:id', [ensureAuth, isAdmin], userController.updateUser);
api.delete('/delete/:id', [ensureAuth, isAdmin], userController.deleteUser);
module.exports = api;