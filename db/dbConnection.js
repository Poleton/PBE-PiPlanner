const mysql = require('promise-mysql');


//MODULE THAT EXPORTS A CONNECTION TO A DATABASE
module.exports = class dbConnection{
    
    //Constructor to initalize the connection
    //to the database
    constructor(){
        this.dbConfig = {
            user: "root",
            password: "Nikekobe8.",
            database: "studentsDB",
            host: "localhost"
        }
    }

    //Function that return a pool of connections to
    //the database
    async getConnection(){
        try {
            let pool;
            let con;
            if (pool) con = pool.getConnection();
            else {
                console.log(this.dbConfig.database);
                pool = await mysql.createPool(this.dbConfig);
                con = pool.getConnection();
            }
            return con;
        } catch (ex) {
            throw ex;
        }
    }
}
