'use strict'

require('dotenv').config();
const mongoConfig = require('./config/mongo');
const app = require('./config/app');
const accountController = require('./src/account/account.controller');
const userController = require('./src/users/user.controller');

mongoConfig.connect();
app.initServer();

accountController.addAdminInitial();
userController.addDefaultUser();