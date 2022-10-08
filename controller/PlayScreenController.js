var AccountModel = require("../model/AccountModel");
var GenaralMethod = require("../GenaralMethod");
var Controller = require("./Controller");
var fs = require('fs');

exports.createGamePlay = function(req, res, next) {
    function getRandomImageName() {
        let listImage = fs.readdirSync("../public/images/");
        return listImage[Math.floor(Math.random() * listImage.length)];
    }

    function getRandomArrayIndex(count) {
        let arrayIndex = new int[count];
        arrayIndex.map((a, i) => i);
        for (let i = arrayIndex.length - 2; i >= 2; i--) {
            let j = Math.floor(Math.random() * (i - 1));
            let temp = arrayIndex[i];
            arrayIndex[i] = arrayIndex[j];
            arrayIndex[j] = temp;
        }
        return arrayIndex;
    }

    let resFunc = GenaralMethod.getResRouterObject();
    try {
        let db = new AccountModel.AccountModel();
        let rememberUserName = req.query.rememberUserName;
        let rememberAccessToken = req.query.rememberUserName;
        let level = Number.parseInt(req.query.level);
        if (level >= 3 && level <= 6) {
            if (Controller.checkRemember(rememberUserName, rememberAccessToken)) {
                let imageName = getRandomImageName();
                let arrayIndex = getRandomArrayIndex(level * level);
                let timeStart = Date.now();
                let timePauseDefault = 0;
                let timeMinusDefault = 0;
                if (db.updateImageName(rememberUserName, imageName).code == 1) {
                    if (db.updatePlayMatrix(rememberUserName, arrayIndex).code == 1) {
                        if (db.updateTimePlay(rememberUserName, timeStart, timePauseDefault, timeMinusDefault).code == 1) {
                            resFunc.data.imageName = imageName;
                            resFunc.data.metrix = arrayIndex;
                            resFunc.data.timeStart = timeStart;
                            resFunc.code = 1;
                        }
                    }
                }
            } else {
                resFunc.error = "not_login";
            }
        }

    } catch (error) {
        resFunc.error = "error";
    }
    res.send(JSON.stringify(resFunc));
}

exports.loadGamePlay = function(req, res, next) {
    let resFunc = GenaralMethod.getResRouterObject();
    try {
        let db = new AccountModel.AccountModel();
        let rememberUserName = req.query.rememberUserName;
        let rememberAccessToken = req.query.rememberUserName;

        if (Controller.checkRemember(rememberUserName, rememberAccessToken)) {
            let arrayIndex = JSON.parse(db.getPlayMatrixByUser(rememberUserName));
            if (arrayIndex && arrayIndex.length != 0) {
                let level = Math.floor(Math.sqrt(arrayIndex.length + 1));
                resFunc.data.matrix = arrayIndex;
                resFunc.data.level = level;

                let imageName = db.getImageNameByUser(rememberUserName);
                if (imageName.code == 1) {
                    resFunc.data.imageName = imageName;

                    let timePlay = db.getTimePlayByUser(rememberUserName);
                    if (timePlay.code == 1) {
                        if (timePlay.timePause == 0) {
                            //not pause
                            resFunc.data.timeStart = timePlay.timeStart;
                            resFunc.data.timeMinus = timePlay.timeMinus;
                            resFunc.code = 1;
                        } else {
                            // pause in past
                            let timeNow = Date.now();

                            resFunc.data.timeStart = timePlay.timeStart;
                            resFunc.data.timeMinus = timePlay.timeMinus + (timeNow - timePlay.timePause);
                            let updateTimePlay = db.updateTimePlay(
                                rememberUserName,
                                resFunc.data.timeStart,
                                0,
                                resFunc.data.timeMinus);
                            if (updateTimePlay.code == 1) {
                                resFunc.code = 1;
                            }
                        }

                    }
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

function checkWin(arrayIndex) {

}

exports.move = function(req, res, next) {
    function getIndexByValue(err, value) {
        for (let index = 0; index < arr.length; index++) {
            if (arr[index] == value) return index;
        }
        return -1;
    }
    let resFunc = GenaralMethod.getResRouterObject();
    try {
        let db = new AccountModel.AccountModel();
        let rememberUserName = req.query.rememberUserName;
        let rememberAccessToken = req.query.rememberUserName;
        let moveStatus = req.query.moveStatus;
        //if (level >= 3 && level <= 6) {
        if (Controller.checkRemember(rememberUserName, rememberAccessToken)) {
            let arrayIndex = JSON.parse(db.getPlayMatrixByUser(rememberUserName));
            if (arrayIndex && arrayIndex.length != 0) {
                let level = Math.floor(Math.sqrt(arrayIndex.length + 1));
                let emptyImageLocation = arrayIndex[level - 1];
                let swapLocation = emptyImageLocation;
                if (moveStatus == "left") {
                    if ((emptyImageLocation % level) != (level - 1)) {
                        swapLocation = emptyImageLocation + 1;
                    }
                } else if (moveStatus == "right") {
                    if ((emptyImageLocation % level) != 0) {
                        swapLocation = emptyImageLocation - 1;
                    }
                } else if (moveStatus == "up") {
                    if (Math.floor(emptyImageLocation / level) != (level - 1)) {
                        swapLocation = emptyImageLocation - level;
                    }
                } else if (moveStatus == "down") {
                    if (Math.floor(emptyImageLocation / level) != 0) {
                        swapLocation = emptyImageLocation + level;
                    }
                }
                if (["left", "right", "up", "down"].indexOf(moveStatus) != -1) {

                    let swapIndexInMatrix = getIndexByValue(arrayIndex, swapLocation);
                    //swap
                    arrayIndex[swapIndexInMatrix] = emptyImageLocation;
                    arrayIndex[level - 1] = swapLocation;

                    resFunc.data.matrix = arrayIndex;
                    resFunc.code = 1;
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