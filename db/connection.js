require('dotenv').config();
const mysql = require("mysql");
const util = require("util");

// create the connection information for the sql database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "employees_DB"
});

connection.connect( () => {
    console.log("Connected as :" + connection.threadId);
});

connection.query = util.promisify(connection.query)

module.exports = connection;