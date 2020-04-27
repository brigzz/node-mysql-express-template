const mysql = require('mysql');

const dbconnect = {

    getConnection: () => {
        const conn = mysql.createConnection({

            host:       '',
            user:       '',
            password:   '',
            database:   ''
        })
        return conn;
    }
}

module.exports = dbconnect;
