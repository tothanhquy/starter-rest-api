const { json } = require('express');
var mysql = require('mysql');
var GenaralMethod = require("../GenaralMethod");


function createConnection() {
    const HOST = "sql6.freemysqlhosting.net";
    const USER = "sql6526407";
    const PASSWORD = "ekZhJTfs8P";
    const DATABASE = "sql6526407";
    const POST = "3306";

    let conn;
    // Create a new database connection:

    try {
        conn = mysql.createConnection({
            host: HOST,
            user: USER,
            password: PASSWORD,
            database: DATABASE,
            port: POST
        });
    } catch (err) {
        return null;
    }
    return conn;
}


exports.executeQueryPromise = function(sql, sqlAgruments) {
    return new Promise((resolve, reject) => {
        try {
            let sql_conn = createConnection();
            if (sql_conn === null) {
                return resolve(GenaralMethod.getResModelObject(-1));
            } else {
                sql_conn.connect((err) => {
                    if (err) {
                        sql_conn.destroy();
                        return resolve(GenaralMethod.getResModelObject(-1));
                    } else {
                        sql_conn.query(sql, sqlAgruments, function(err, result, fields) {
                            if (err) {
                                sql_conn.destroy();
                                return resolve(GenaralMethod.getResModelObject(-1));
                            }
                            let resFunc = GenaralMethod.getResModelObject();
                            resFunc.data = result;
                            resFunc.code = 1;
                            if (result.hasOwnProperty('changedRows')) {
                                resFunc.effectedRows = result.changedRows;
                            }
                            sql_conn.destroy();
                            return resolve(resFunc);
                        });
                    }
                });
            }
        } catch (err) {
            return resolve(GenaralMethod.getResModelObject(-1));
        } finally {}
    });
}

exports.replaceSpecialCharacter = function(str) {
    if (str)
        return str.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '_');
    return "";
}