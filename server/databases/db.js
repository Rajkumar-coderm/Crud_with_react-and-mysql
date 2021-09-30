const mysql=require('mysql');

const db=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"Rajkumar@123",
    database:"CRUDAPP"
});

module.exports=db;