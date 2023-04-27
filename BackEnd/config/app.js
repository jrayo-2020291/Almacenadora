'use strict'

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3200;

const accountRoutes = require('../src/account/account.routes');
const storageRoutes = require('../src/storage/storage.routes');
const userRoutes = require('../src/users/user.routes');
const leaseRoutes = require('../src/lease/lease.routes');
const serviceRoutes = require('../src/service/services.routes');

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

//Rutas de cada coleccion
app.use('/account', accountRoutes);
app.use('/storage',storageRoutes);
app.use('/user', userRoutes);
app.use('/lease', leaseRoutes);
app.use('/service', serviceRoutes);

exports.initServer = ()=>{
    app.listen(port);
    console.log(`Server http running in port ${port}`);
}