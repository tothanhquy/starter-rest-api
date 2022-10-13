var AccountModel = require("../model/AccountModel");
var GenaralMethod = require("../GenaralMethod");
var Controller = require("./Controller");

exports.loadDataCharts = async function(req, res, next) {
    let resFunc = GenaralMethod.getResRouterObject();
    try {
        let db = new AccountModel.AccountModel();
        let params = Controller.getParams(req);
        let rememberUserName = params.rememberUserName;
        let rememberAccessToken = params.rememberAccessToken;

        return res.send(JSON.stringify(rememberAccessToken));

        return res.send(JSON.stringify(Controller.checkRemember(res, rememberUserName, rememberAccessToken)));

        if (Controller.checkRemember(rememberUserName, rememberAccessToken)) {

            let level3 = await db.getChartByLevel(3);
            resFunc.data.level3x3 = level3.data;
            let level4 = await db.getChartByLevel(4);
            resFunc.data.level4x4 = level4.data;
            let level5 = await db.getChartByLevel(5);
            resFunc.data.level5x5 = level5.data;
            let level6 = await db.getChartByLevel(6);
            resFunc.data.level6x6 = level6.data;

            let timePlay = await db.getTimePlayByUser(rememberUserName);

            resFunc.data.playPause = false;
            if (timePlay.code == 1) {
                if (timePlay.timeStart > 0) {
                    // resFunc.data = timePlay;
                    resFunc.data.playPause = true;
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