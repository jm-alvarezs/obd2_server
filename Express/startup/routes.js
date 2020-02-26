const express = require("express");
const router = express.Router();
const datos = require("../routes/datos");

module.exports = function(base_url, app) {
    router.use("/datos", datos);
    app.use(base_url, router);  
};