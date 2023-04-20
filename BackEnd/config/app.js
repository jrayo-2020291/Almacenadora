'use strict'

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3200;

const accountRoutes = require('../src/account/account.router');

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

//Rutas de cada coleccion
app.use('/account', accountRoutes);

exports.initServer = ()=>{
    app.listen(port);
    console.log(`Server http running in port ${port}`);
}