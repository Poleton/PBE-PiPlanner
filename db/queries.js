module.exports = {
    insert: `INSERT INTO students(name, students) VALUES(?, ?)`,
    read: `SELECT * FROM tbl_todo`,
    update: `UPDATE tbl_todo SET tbl_todo.title = ?, tbl_todo.completed = ? WHERE tbl_todo.id = ?`,
    delete: `DELETE FROM tbl_todo WHERE tbl_todo.id = ?`
}

//THIS MODULE EXPORTS THE QUERIES
module.exports = class queriesDB{
    //Constructor to know into which table 
    //insert/read/update/delete the data
    constructor(tableName){
        this.tableName = tableName;
    }

    getRead(){
        return `SELECT * FROM ` + this.tableName;
    }
    getInsert(){
        return `INSERT INTO ` + this.tableName + `(name, studentID) VALUES (?,?)`;
    }
}