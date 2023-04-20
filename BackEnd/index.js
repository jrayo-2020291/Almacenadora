'use strict'

require('dotenv').config();
const mongoConfig = require('./config/mongo');
const app = require('./config/app');
const accountController = require('./src/account/account.controller');

mongoConfig.connect();
app.initServer();

accountController.addAdminInitial();