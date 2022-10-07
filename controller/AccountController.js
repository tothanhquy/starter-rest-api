var AccountModel = require("../model/AccountModel");

exports.addAccount = function(req, res, next) {
    let db = new AccountModel.AccountModel();
    let resDB = db.getPasswordByUser("a");

    res.send("res:" + JSON.stringify(resDB));
}