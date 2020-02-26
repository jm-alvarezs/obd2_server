let db;
/**
* getPromedioMinuto
* @summary Call to procedure getPromedioMinuto
* @param {} 
* @return {Array} Returns array of results if procedure has a SELECT 
* @example
*
*	getPromedioMinuto()
*/

const getPromedioMinuto = async () => {
   if(!db) db = require("tnc_mysql_connector");
   return (await db.queryProcedure('getPromedioMinuto',));
}
module.exports = {
   getPromedioMinuto
}