var GenaralMethod = require("../GenaralMethod");
var Account = require("./AccountController");
var bcrypt = require("bcryptjs");

exports.checkRemember = async function(userName, accessToken) {
    let db = new Account.AccountModel();

    let resDb = await db.checkAccessToekn(userName, accessToken);
    if (resDb.code == 1) {
        return true;
    } else {
        return false;
    }
}

exports.hashPassword = function(pass) {
    // let res = await new Promise((resolve, reject) => {
    //     bcrypt.genSalt(10, (err, salt) => {
    //         bcrypt.hash(pass, salt, function(err, hash) {
    //             if (err) return resolve("error");
    //             return resolve(hash);
    //         });
    //     })
    // });
    // // let salt = await bcrypt.genSalt(10);
    // // let res = await bcrypt.hash(pass, salt);
    // return res;
    return bcrypt.hashSync(pass, 10);
}
exports.verifyPassword = function(pass, hash) {
    // let res = await new Promise(async(resolve, reject) => {
    //     bcrypt.compare(pass, hash, function(err, result) {
    //         if (result) {
    //             return resolve(true);
    //         }
    //         return resolve(false);
    //     });
    // });
    // return res;
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