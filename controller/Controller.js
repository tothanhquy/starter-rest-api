var GenaralMethod = require("../GenaralMethod");
var Account = require("./AccountController");
var bcrypt = require("bcrypt");

exports.checkRemember = async function(userName, accessToken) {
    let db = new Account.AccountModel();

    let resDb = await db.checkAccessToekn(userName, accessToken);
    if (resDb.code == 1) {
        return true;
    } else {
        return false;
    }
}

exports.hashPassword = async function(pass) {
    let res = await new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(pass, salt, function(err, hash) {
                return resolve(hash);
            });
        })
    });
    return res;
}
exports.verifyPassword = async function(pass, hash) {
    let res = await new Promise((resolve, reject) => {
        bcrypt.compare(pass, hash, function(err, result) {
            if (result) {
                return resolve(true);
            }
            return resolve(false);
        });
    });
    return res;
}