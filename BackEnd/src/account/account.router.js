'use strict'

const accountController = require('./account.controller');
const express = require('express');
const api = express.Router();
const { ensureAuth, isAdmin } = require('../services/authenticated');

//Rutas públicas
api.get('/' , accountController.test);
api.get('/get',[ensureAuth,isAdmin], accountController.get)
api.post('/register',[ensureAuth,isAdmin], accountController.register);
api.post('/login', accountController.login);
api.put('/update/:id', [ensureAuth,isAdmin], accountController.update);
api.delete('/delete/:id',[ensureAuth,isAdmin], accountController.delete)

module.exports = api;