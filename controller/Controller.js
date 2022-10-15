var GenaralMethod = require("../GenaralMethod");
var AccountModel = require("../model/AccountModel");
var bcrypt = require("bcryptjs");

exports.checkRemember = function(userName, accessToken) {
    return new Promise(async(resolve, reject) => {
        let db = new AccountModel.AccountModel();

        let resDb = await db.checkAccessToken(userName, accessToken);
        if (resDb.code == 1) {
            return resolve(true);
        } else {
            return resolve(false);
        }
    });
}

exports.hashPassword = function(pass) {
    return bcrypt.hashSync(pass, 10);
}
exports.verifyPassword = function(pass, hash) {
    return bcrypt.compareSync(pass, hash);
}
exports.getParams = function(req) {
    let res;
    // if (req.query == null) {
    //     res = Object.assign(req.body);
    // } else {
    //     res = Object.assign(req.query);
    // }
    res = Object.assign(req.body);
    // res = Object.assign(req.query);
    Object.keys(res).forEach(function(key, index) {
        res[key] = decodeURI(res[key]);
    });
    return res;
}