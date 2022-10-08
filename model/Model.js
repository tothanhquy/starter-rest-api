var mysql = require('mysql');
var GenaralMethod = require("../GenaralMethod");

exports.Model = class {
    HOST = "sql6.freemysqlhosting.net";
    USER = "sql6524898";
    PASSWORD = "jETPiKg3hC";
    DATABASE = "sql6524898";
    POST = "3306";

    sql_conn = 1;

    constructor() {

    }

    openConnection() {
        let conn;
        // Create a new database connection:

        try {
            conn = mysql.createConnection({
                host: this.HOST,
                user: this.USER,
                password: this.PASSWORD,
                database: this.DATABASE,
                port: this.PORT
            });

            if (conn === null) return false;
            this.sql_conn = conn;
        } catch (err) {
            return false;
        }
        return true;
    }
    closeConnection() {
        try {
            if (sql_conn != null)

                Console.WriteLine("\nDatabase unconnected");
        } catch (ex) {
            Console.WriteLine(ex);

        }
    }

    executeQuery(sql, sqlAgruments) {
        //default result error
        var resFunc = GenaralMethod.getResModelObject();

        try {
            if (thid.sql_conn === null) {
                resFunc.code = -1;
            } else {
                this.sql_conn.query(sql, sqlAgruments, function(err, result, fields) {
                    if (err) throw err;
                    resFunc.data = result;
                    resFunc.code = 1;
                    resFunc.effectedRows = result.effectedRows;
                });
            }
        } catch (err) {
            resFunc.code = -1;
        } finally {
            //closeConnection();
        }
        return resFunc;

    }

    replaceSpecialCharacter(str) {
        return str.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '_');
    }
}