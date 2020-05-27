/*--------------------------------------------------------
TRANSACTIONAL AND LOCKING STATEMENTS
START TRANSACTION: BEGIN A NEW TRANSACTION
COMMIT: COMMIT CHANGES (MAKE CHANGES PERMANENT)
ROLLBACK: CANCELING CHANGES
---------------------------------------------------------*/
const dbConnection = require("./dbConnection");
const queries = require("./queries");

module.exports = class TodoDao {

  async readEntities(qr) {
    //Create The connexion to the database
    let con = await  new dbConnection().getConnection();
    
    try {
      await con.query("START TRANSACTION");
      console.log(qr);
      let studentsInfo = await con.query(qr);
      await con.query("COMMIT");
      studentsInfo = JSON.parse(JSON.stringify(studentsInfo));
      return studentsInfo;
    } catch (ex) {
      console.log(ex);
      throw ex;
    } finally {
      await con.release();
      await con.destroy();
    }
   
  }

  async checkUser(userName, userID){
     
    let con = await  new dbConnection("studentsDB").getConnection();
    
    try {
      await con.query("START TRANSACTION");
      var qr = 'SELECT * FROM students WHERE studentID = "' + userID + '";';
      console.log(qr);
      let studentsInfo = await con.query(qr);
      await con.query("COMMIT");
      studentsInfo = JSON.parse(JSON.stringify(studentsInfo));
      if(Object.keys(studentsInfo).length === 0){
          console.log("User is not in the DB");
          return 0;
      }else if(studentsInfo[0].name === userName){
          return 1;
      }else{
          return studentsInfo[0].name;
      }
    } catch (ex) {
      console.log(ex);
      throw ex;
    } finally {
      await con.release();
      await con.destroy();
    }
   
  }
  
};