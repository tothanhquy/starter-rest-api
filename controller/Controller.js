var GenaralMethod = require("../GenaralMethod");
var Account = require("./AccountController");
var bcrypt = require("bcrypt");

exports.checkRemember = function(userName, accessToken) {
    let db = new Account.AccountModel();

    if (db.checkAccessToekn(userName, accessToken).code == 1) {
        return true;
    } else {
        return false;
    }
}

exports.hashPassword = function(pass) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(pass, salt, function(err, hash) {
            return hash;
        });
    })
}
exports.verifyPassword = function(pass, hash) {
    bcrypt.compare(pass, hash, function(err, result) {
        if (result) {
            return true;
        }
        return false;
    });
}