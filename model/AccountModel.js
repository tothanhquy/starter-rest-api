var GenaralMethod = require("../GenaralMethod");
const axios = require('axios').default;
var Model = require("./Model");

exports.AccountModel = class extends Model.Model {
    constructor() {
        super();
    }

    getPasswordByUser(user) {
        let resFunc = GenaralMethod.getResModelObject();
        user = this.replaceSpecialCharacter(user);

        if (this.openConnection()) {
            try {
                if (checkValidUserName(user) == false) {
                    resFunc.error = "unvalidValue";
                } else {
                    let sql = "";
                    let agruments = [user];
                    let resDB = this.executeQuery(sql, agruments);
                    if (resDB.code == 1) {
                        if (resDB.data.Length == 0) {
                            resFunc.error = "empty";
                        } else {
                            resFunc.code = resDB.code;
                            resFunc.data = resDB.data[0].pass_word;
                        }
                    }
                }
            } catch (err) {
                resFunc.error = "error";
            }
        }

        return resFunc;
    }
    replaceSpecialCharacter(str) {
        return str.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '_');
    }
    checkValidUserNameAndPassword(user, pass) {
        return checkValidUserName(user) && checkValidPassword(pass);
    }
    checkValidUserName(user) {
        if (
            user.Length > 20 ||
            (user).IndexOf(' ') != -1 ||
            user.Length == 0
        ) {
            return false;
        }
        return true;
    }
    checkValidPassword(pass) {
        if (
            pass.Length > 300 ||
            (pass).IndexOf(' ') != -1 ||
            pass.Length == 0
        ) {
            return false;
        }
        return true;
    }
}