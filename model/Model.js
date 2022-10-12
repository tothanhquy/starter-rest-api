const { json } = require('express');
var mysql = require('mysql');
var GenaralMethod = require("../GenaralMethod");


function createConnection() {
    const HOST = "sql6.freemysqlhosting.net";
    const USER = "sql6524898";
    const PASSWORD = "jETPiKg3hC";
    const DATABASE = "sql6524898";
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
    // return (JSON.stringify(sqlAgruments));
    return new Promise((resolve, reject) => {
        //var resFunc = GenaralMethod.getResModelObject();
        try {
            let sql_conn = createConnection();
            if (sql_conn === null) {
                return resolve(GenaralMethod.getResModelObject(-1));
            } else {
                sql_conn.connect((err) => {
                    if (err) {
                        return resolve(GenaralMethod.getResModelObject(-1));
                    } else {
                        sql_conn.query(sql, sqlAgruments, function(err, result, fields) {
                            if (err) {
                                return resolve(GenaralMethod.getResModelObject(-1));
                            }
                            // return resolve(result);
                            // return resolve(JSON.stringify(sqlAgruments) + "sad");
                            let resFunc = GenaralMethod.getResModelObject();
                            resFunc.data = result;
                            resFunc.code = 1;
                            if (result.hasOwnProperty('changedRows')) {
                                resFunc.effectedRows = result.changedRows;
                            }
                            return resolve(resFunc);
                        });
                    }
                });
            }
        } catch (err) {
            return resolve(GenaralMethod.getResModelObject(-1));
        } finally {
            //closeConnection();
        }
    });
}

exports.replaceSpecialCharacter = function(str) {
    if (str)
        return str.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '_');
    return "";
}