var AccountModel = require("../model/AccountModel");
var GenaralMethod = require("../GenaralMethod");
var Controller = require("./Controller");


exports.addAccount = async function(req, res, next) {
    let resFunc = GenaralMethod.getResRouterObject();
    try {
        let db = new AccountModel.AccountModel();
        let params = Controller.getParams(req.body);
        let user_name = params.user;
        let pass_word = params.pass;

        pass_word = Controller.hashPassword(pass_word);

        let resDB = await db.addAccount(user_name, pass_word);
        resFunc.code = resDB.code;
        resFunc.error = resDB.error;

    } catch (error) {
        resFunc.error = "error";
    }
    res.send(JSON.stringify(resFunc));
}

exports.login = async function(req, res, next) {
    let resFunc = GenaralMethod.getResRouterObject();
    // let asasas;
    try {
        let db = new AccountModel.AccountModel();
        let params = Controller.getParams(req.body);

        let user_name = params.user;
        let pass_word = params.pass;
        let resDB = await db.getPasswordByUser(user_name);
        // res.send(JSON.stringify(req.body));
        // resFunc = resDB;
        // res.send('20');
        // resFunc.error = "asdasd" + JSON.stringify(resDB);
        // res.send(JSON.stringify(resFunc));
        if (resDB.code == 1) {
            if (Controller.verifyPassword(pass_word, resDB.data)) {
                //success
                let accessToken = GenaralMethod.generatorString(50);
                let resUpdAT = await db.updateAccessToken(user_name, accessToken);
                if (resUpdAT.code == 1) {
                    resFunc.code = 1;
                    resFunc.data = {
                        access_token: accessToken
                    };
                } else {
                    resFunc.code = "update assess error";
                }
            } else {
                resFunc.error = "wrong_password";
            }
        } else {
            resFunc.code = resDB.code + "get pass error" + JSON.stringify(resDB);
            resFunc.error = resDB.error;
            if (resFunc.error == "empty") {
                resFunc.error = "not_exist_account";
            }
        }
    } catch (error) {
        resFunc.error = "error";
    }
    res.send(JSON.stringify(resFunc));
}

exports.changePassword = async function(req, res, next) {
    let resFunc = GenaralMethod.getResRouterObject();
    try {
        let db = new AccountModel.AccountModel();
        let params = Controller.getParams(req.body);
        //let user_name = params.user;
        let oldPassWord = params.oldPassword;
        let newPassWord = params.newPassword;
        let rememberUserName = params.rememberUserName;
        let rememberAccessToken = params.rememberAccessToken;
        if (Controller.checkRemember(rememberUserName, rememberAccessToken)) {
            let resDB = await db.getPasswordByUser(rememberUserName);
            if (resDB.code == 1) {
                if (Controller.verifyPassword(oldPassWord, resDB.data)) {
                    //success
                    hash = Controller.hashPassword(newPassWord);
                    let resUpdPass = await db.updatePassword(rememberUserName, hash);
                    if (resUpdPass.code == 1) {
                        resFunc.code = 1;
                        resFunc.data = {
                            access_token: accessToken
                        };
                    }
                } else {
                    resFunc.error = "wrong_password";
                }
            } else {
                resFunc.code = resDB.code;
                resFunc.error = resDB.error;
                if (resFunc.error == "empty") {
                    resFunc.error = "not_exist_account";
                }
            }
        } else {
            resFunc.error = "not_login";
        }

    } catch (error) {
        resFunc.error = "error";
    }
    res.send(JSON.stringify(resFunc));
}

exports.logout = async function(req, res, next) {
    let resFunc = GenaralMethod.getResRouterObject();
    try {
        let db = new AccountModel.AccountModel();
        let params = Controller.getParams(req.body);

        let rememberUserName = params.rememberUserName;
        let rememberAccessToken = params.rememberAccessToken;
        if (Controller.checkRemember(rememberUserName, rememberAccessToken)) {
            let accessToken = GenaralMethod.generatorString(50);
            let resUpdAT = await db.updateAccessToken(user_name, accessToken);
            if (resUpdAT.code == 1) {
                resFunc.code = 1;
            }
        } else {
            resFunc.error = "not_login";
        }
    } catch (error) {
        resFunc.error = "error";
    }
    res.send(JSON.stringify(resFunc));
}