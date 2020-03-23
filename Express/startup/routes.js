const express = require("express");
const router = express.Router();
const datos = require("../routes/datos");
const cargas = require('../routes/cargas'); 
module.exports = function(base_url, app) {
    router.use("/datos", datos);
    router.use('/cargas', cargas);
    app.use(base_url, router);  
};