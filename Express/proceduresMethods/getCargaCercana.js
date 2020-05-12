let db;
/**
* getCargaCercana
* @summary Call to procedure getCargaCercana
* @param {Moment} MomentObject_fecha_hora
* @return {Array} Returns array of results if procedure has a SELECT 
* @example
*
*	getCargaCercana(new Moment.utc())
*/

const getCargaCercana = async (MomentObject_fecha_hora) => {
   if(!db) db = require("tnc_mysql_connector");
   return (await db.queryProcedure('getCargaCercana',MomentObject_fecha_hora));
}
module.exports = {
   getCargaCercana
}