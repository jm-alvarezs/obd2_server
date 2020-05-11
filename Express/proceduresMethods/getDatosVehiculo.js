let db;
/**
* getDatosVehiculo
* @summary Call to procedure getDatosVehiculo
* @param {String} cmdID
* @param {String} VIN
* @param {Number} limit
* @param {Number} offset
* @return {Array} Returns array of results if procedure has a SELECT 
* @example
*
*	getDatosVehiculo('stringExample', 'stringExample', 1, 1)
*/

const getDatosVehiculo = async (cmdID, VIN, limit, offset) => {
   if(!db) db = require("tnc_mysql_connector");
   return (await db.queryProcedure('getDatosVehiculo',cmdID, VIN, limit, offset));
}
module.exports = {
   getDatosVehiculo
}