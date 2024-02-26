const { BadRequestError } = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION.

/**
 * Helper function to create a SQL query for updating a row in a table
//  * @param dataToUpdate - object containing data for update
//  * @param jsToSql - object containing js to sql column names
  * @returns {Object} {sqlSetCols, dataToUpdate}
  * 
  * Example:
  * 
  * dataToUpdate = {firstName: 'Aliya', age: 32}
  * jsToSql = {firstName: 'first_name'}
  * 
  * sqlForPartialUpdate(dataToUpdate, jsToSql) => 
  * {
  *  setCols: '"first_name"=$1, "age"=$2',
  *  values: ['Aliya', 32]
  * }
  */
 
function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
