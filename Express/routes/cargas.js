const express = require('express');
const router = express.Router();
const chalk = require('chalk');

router.post('/', async(req, res, next) => {
    try {        
        const data = req.body;
        const { idCarga } = (await db.procedures.insertCarga(data.VIN, data.fecha_hora, data.latitud, data.longitud))[0];
        res.status(201).send({ idCarga });
    } catch (error) {
        console.log(chalk.red(error));
        res.status(500).send(error);
        next(error);
    }
});

module.exports = router