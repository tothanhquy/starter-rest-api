var AccountModel = require("../model/AccountModel");
var GenaralMethod = require("../GenaralMethod");
var Controller = require("./Controller");

exports.loadDataCharts = function(req, res, next) {
    let resFunc = GenaralMethod.getResRouterObject();
    try {
        let db = new AccountModel.AccountModel();
        let rememberUserName = req.query.rememberUserName;
        let rememberAccessToken = req.query.rememberUserName;
        if (Controller.checkRemember(rememberUserName, rememberAccessToken)) {

            let level3 = db.getChartByLevel(3);
            resFunc.data.level3x3 = level3.data;
            let level4 = db.getChartByLevel(4);
            resFunc.data.level4x4 = level4.data;
            let level5 = db.getChartByLevel(5);
            resFunc.data.level5x5 = level5.data;
            let level6 = db.getChartByLevel(6);
            resFunc.data.level6x6 = level6.data;

            let timePlay = db.getTimePlayByUser(rememberUserName);

            resFunc.playPause = false;
            if (timePlay.code == 1) {
                if (timePlay.timeStart != 0) {
                    resFunc.playPause = true;
                }
            }
            resFunc.code = 1;
        } else {
            resFunc.error = "not_login";
        }

    } catch (error) {
        resFunc.error = "error";
    }
    res.send(JSON.stringify(resFunc));
}