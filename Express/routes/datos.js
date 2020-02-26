const express = require('express');
const router = express.Router();
const chalk = require('chalk');

router.get('/', async(req, res, next) => {
    try {
        
        const datos = (await db.procedures.getDatosValidos());
        
    } catch (error) {
        console.log(chalk.red(error));
        res.status(500).send(error);
        next(error);
    }
});

module.exports = router