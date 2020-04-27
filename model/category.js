const db = require('./databaseConfig.js');

const categoryDB = {

    getCategory: (callback) => {

        const conn = db.getConnection();

        conn.connect(err => {

            if(err) return callback(err, null);

            console.log('Connected to DB from getCategory');
            const sql = 'SELECT * FROM category';

            conn.query(sql, (err, result) => {

                if(err) return callback(err, null);

                return callback(null, result);
            })
            
            conn.end();
        })
    },

    getFurnitureByCatID: (cat_id, callback) => {

        const conn = db.getConnection();

        conn.connect(err => {
            
            if(err) return callback(err, null);

            console.log('Connected to DB from getCategoryByID');

            const sql = 'SELECT furniture.* FROM furniture JOIN category ON category.cat_id = furniture.cat_id WHERE category.cat_id = ?';

            conn.query(sql, [cat_id], (err, result) => {

                if(err) return callback(err, null);

                return callback(null, result);

            })
            conn.end();
        })
    }
}


module.exports = categoryDB;
