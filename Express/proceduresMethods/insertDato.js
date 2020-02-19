let db;
/**
* insertDato
* @summary Call to procedure insertDato
* @param {String} VIN
* @param {String} cmdID
* @param {String} cmdResult
* @param {Moment} MomentObject_timestamp
* @return {Array} Returns array of results if procedure has a SELECT 
* @example
*
*	insertDato('stringExample', 'stringExample', 'stringExample', new Moment.utc())
*/

const insertDato = async (VIN, cmdID, cmdResult, MomentObject_timestamp) => {
   if(!db) db = require("tnc_mysql_connector");
   return (await db.queryProcedure('insertDato',VIN, cmdID, cmdResult, MomentObject_timestamp));
}
module.exports = {
   insertDato
}