let db;
/**
* getPromedioMinutoCmd
* @summary Call to procedure getPromedioMinutoCmd
* @param {String} cmdID
* @return {Array} Returns array of results if procedure has a SELECT 
* @example
*
*	getPromedioMinutoCmd('stringExample')
*/

const getPromedioMinutoCmd = async (cmdID) => {
   if(!db) db = require("tnc_mysql_connector");
   return (await db.queryProcedure('getPromedioMinutoCmd',cmdID));
}
module.exports = {
   getPromedioMinutoCmd
}