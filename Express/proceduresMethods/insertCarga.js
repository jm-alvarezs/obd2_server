let db;
/**
* insertCarga
* @summary Call to procedure insertCarga
* @param {String} VIN
* @param {String} latitud
* @param {String} longitud
* @param {Moment} MomentObject_fecha_hora
* @return {Array} Returns array of results if procedure has a SELECT 
* @example
*
*	insertCarga('stringExample', 'stringExample', 'stringExample', new Moment.utc())
*/

const insertCarga = async (VIN, latitud, longitud, MomentObject_fecha_hora) => {
   if(!db) db = require("tnc_mysql_connector");
   return (await db.queryProcedure('insertCarga',VIN, latitud, longitud, MomentObject_fecha_hora));
}
module.exports = {
   insertCarga
}