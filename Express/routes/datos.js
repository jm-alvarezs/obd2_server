const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const db = require('tnc_mysql_connector');

router.get('/', async(req, res, next) => {
    try {
        const datos = (await db.procedures.getDatosValidos());
        res.status(200).send(datos);
    } catch (error) {
        console.log(chalk.red(error));
        res.status(500).send(error);
        next(error);
    }
});

router.get('/:cmdID',  async(req, res, next) => {
    try {        
        const { cmdID } = req.params;
        const datos = (await db.procedures.getPromedioMinutoCmd(cmdID));
        res.status(200).send(datos);
    } catch (error) {
        console.log(chalk.red(error));
        res.status(500).send(error);
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
      const data = req.body;
      await db.procedures.insertDato(data.VIN, data.cmdID, data.cmdResult, data.timestamp);
      res.sendStatus(200);
    } catch (error) {
      console.log(chalk.red(error));
      res.status(500).send(error);
      next(error);
    }
  });

module.exports = router