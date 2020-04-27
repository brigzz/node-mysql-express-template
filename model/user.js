const db = require('./databaseConfig');

const userDB = {

    getUser: (userID, callback) => {

        const conn = db.getConnection();

        conn.connect(err => {

            if(err) {
                console.log(err);
                return callback(err, null);
            } else {

                console.log('Connected to DB from getUser');

                const sql = 'SELECT * FROM user WHERE userid = ?';
                conn.query(sql, [userID], (err, result) => {

                    conn.end();

                    if(err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                })
            }
        })
    },

    getUsers: (callback) => {

        const conn = db.getConnection();

        conn.connect(err=> {
            if(err) throw err;
            
            console.log('Connected to DB from getUsers');
            const sql= 'SELECT * FROM user';
            conn.query(sql, (err, result) => {
                
                conn.end();

                if(err) {
                    console.log(err);
                    return callback(err, null);
                } else {
                    return callback(null,result);
                }
            })
        })
    },

    addUser: (username, email, role, password, callback) => {

        const conn = db.getConnection();

        conn.connect(err => {

            if(err) {
                console.log(err);
                return callback(err, null);
            }
            
            console.log('Connected from addUser');
            const sql = 'INSERT INTO user (username, email, role, password) values (?, ?, ?, ?)';
            
            conn.query(sql, [username, email, role, password], (err, result) => {

                conn.end();

                if(err) {
                    console.log(err);
                    return callback(err, null);
                }

                console.log(result.affectedRows);
                return callback(null, result.affectedRows);
            })
        })
    },

    updateUser: (email, password, userid, callback) => {

        const conn = db.getConnection();

        conn.connect(err => {
            if(err) {
                return callback(err, null);
            }

            console.log('Connected from updateUser');
            const sql = 'UPDATE user SET email = ?, password = ? WHERE userid = ?';
            conn.query(sql, [email, password, userid], (err, result) => {

                conn.end();

                if(err) return callback(err, null);

                return callback(null, result.changedRows);
            })
        })
    },

    deleteUser: (userid, callback) => {

        const conn = db.getConnection();

        conn.connect(err => {

            if(err) return callback(err, null);

            console.log('Connected from deleteUser');
            const sql = 'DELETE FROM user WHERE userid = ?';
            conn.query(sql, [userid], (err, result) => {

                conn.end();

                if(err) return callback(err, null);

                return callback(null, result.affectedRows);
            })
        })

    }

    
}


module.exports = userDB;
