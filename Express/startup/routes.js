const express = require("express");
const router = express.Router();
const datos = require("../routes/datos");
const cargas = require('../routes/cargas'); 
const gasolineras = require('../routes/gasolineras');
module.exports = function(base_url, app) {
    router.use("/datos", datos);
    router.use('/cargas', cargas);
    router.use('/gasolineras', gasolineras);
    app.use(base_url, router);  
};