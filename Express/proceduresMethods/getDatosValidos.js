let db;
/**
* getDatosValidos
* @summary Call to procedure getDatosValidos
* @param {} 
* @return {Array} Returns array of results if procedure has a SELECT 
* @example
*
*	getDatosValidos()
*/

const getDatosValidos = async () => {
   if(!db) db = require("tnc_mysql_connector");
   return (await db.queryProcedure('getDatosValidos',));
}
module.exports = {
   getDatosValidos
}