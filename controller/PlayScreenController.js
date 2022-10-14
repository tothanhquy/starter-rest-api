var AccountModel = require("../model/AccountModel");
var GenaralMethod = require("../GenaralMethod");
var Controller = require("./Controller");
// const path = require('path');
// var fs = require('fs');
var ListImageResource = require("../data/PlayImageList");

exports.createGamePlay = async function(req, res, next) {



    function getRandomImageName() {
        // let paths = path.join(__dirname, "../public/images/");
        // return paths;
        // let listImage = fs.readdirSync(paths);
        // return listImage;
        let listImage = ListImageResource.images;
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
    let imageName = getRandomImageName();
    res.send(JSON.stringify(imageName));
    return;
    try {
        let db = new AccountModel.AccountModel();
        let params = Controller.getParams(req);

        let rememberUserName = params.rememberUserName;
        let rememberAccessToken = params.rememberAccessToken;
        let level = Number.parseInt(params.level);

        // resFunc.error = rememberUserName + "|" + rememberAccessToken + "|" + level;
        // res.send(JSON.stringify(resFunc));
        // return;

        if (level >= 3 && level <= 6) {
            //let rememberAccount = await Controller.checkRemember(rememberUserName, rememberAccessToken);
            if (await Controller.checkRemember(rememberUserName, rememberAccessToken)) {
                let imageName = getRandomImageName();
                // res.send(JSON.stringify("imageName"));
                // return;
                let arrayIndex = getRandomArrayIndex(level * level);
                let timeStart = Date.now();
                let timePauseDefault = 0;
                let timeMinusDefault = 0;



                if ((await db.updateImageName(rememberUserName, imageName)).code == 1) {
                    if ((await db.updatePlayMatrix(rememberUserName, arrayIndex)).code == 1) {
                        if ((await db.updateTimePlay(rememberUserName, timeStart, timePauseDefault, timeMinusDefault)).code == 1) {
                            resFunc.data.imageName = imageName;
                            resFunc.data.metrix = arrayIndex;
                            resFunc.data.timeStart = timeStart;
                            resFunc.data.timeMinus = timeMinusDefault;
                            resFunc.data.level = level;
                            resFunc.code = 1;
                        }
                    }
                }
            } else {
                resFunc.error = "not_login";
            }
        }

    } catch (error) {
        resFunc.error = "error" + err;
    }
    res.send(JSON.stringify(resFunc));
}

exports.loadGamePlay = async function(req, res, next) {
    let resFunc = GenaralMethod.getResRouterObject();
    try {
        let db = new AccountModel.AccountModel();
        let params = Controller.getParams(req);

        let rememberUserName = params.rememberUserName;
        let rememberAccessToken = params.rememberAccessToken;

        //let rememberAccount = await Controller.checkRemember(rememberUserName, rememberAccessToken);

        if (await Controller.checkRemember(rememberUserName, rememberAccessToken)) {
            let arrayIndex;
            let getMatrix = await db.getPlayMatrixByUser(rememberUserName);
            if (getMatrix.code == 1) {
                arrayIndex = getMatrix.data;
            }
            if (arrayIndex && arrayIndex.length != 0) {
                let level = Math.floor(Math.sqrt(arrayIndex.length + 1));
                resFunc.data.matrix = arrayIndex;
                resFunc.data.level = level;

                let imageName = await db.getImageNameByUser(rememberUserName);
                if (imageName.code == 1) {
                    resFunc.data.imageName = imageName;

                    let timePlay = await db.getTimePlayByUser(rememberUserName);
                    if (timePlay.data.code == 1) {
                        if (timePlay.data.timePause == 0) {
                            //not pause
                            resFunc.data.timeStart = timePlay.data.timeStart;
                            resFunc.data.timeMinus = timePlay.data.timeMinus;
                            resFunc.code = 1;
                        } else {
                            // pause in past
                            let timeNow = Date.now();

                            resFunc.data.timeStart = timePlay.data.timeStart;
                            resFunc.data.timeMinus = timePlay.data.timeMinus + (timeNow - timePlay.data.timePause);
                            let updateTimePlay = await db.updateTimePlay(
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
    for (let index = 0; index < arrayIndex.length; index++) {
        if (arrayIndex[index] != index) return false;
    }
    return true;
}

async function winGame(user, level, time) {
    let db = new AccountModel.AccountModel();
    let timePlay = await db.getTimePlayByUser(rememberUserName);
    if (timePlay.code == 1) {
        if (timePlay.timePause == 0) {
            //not pause
            let timeNow = Date.now();
            let timeFinish = timeNow - timePlay.timeStart - timePlay.timeMinus;

            let updateLevel = await db.updateLevelTime(
                rememberUserName,
                level,
                timeFinish);
            if (updateLevel.code == 1) {

                let updateTimePlay = await db.updateTimePlay(rememberUserName, 0, 0, 0);
                if (updateTimePlay.code == 1) {
                    return true;
                }
            }
            return false;
        } else {
            // pausing
            return false;
        }
    }
}
exports.move = async function(req, res, next) {
    function getIndexByValue(arr, value) {
        for (let index = 0; index < arr.length; index++) {
            if (arr[index] == value) return index;
        }
        return -1;
    }
    let resFunc = GenaralMethod.getResRouterObject();
    try {
        let db = new AccountModel.AccountModel();
        let params = Controller.getParams(req);

        let rememberUserName = params.rememberUserName;
        let rememberAccessToken = params.rememberAccessToken;
        let moveStatus = params.moveStatus;
        //if (level >= 3 && level <= 6) {
        //let rememberAccount = await Controller.checkRemember(rememberUserName, rememberAccessToken);

        if (await Controller.checkRemember(rememberUserName, rememberAccessToken)) {
            //check pause
            let timePlay = await db.getTimePlayByUser(rememberUserName);
            if (timePlay.data.code == 1) {

                if (timePlay.data.timePause !== 0) {
                    //pause in last
                    resFunc.error = "error";
                } else {
                    let arrayIndex;
                    let getMatrix = await db.getPlayMatrixByUser(rememberUserName);
                    if (getMatrix.code == 1) {
                        arrayIndex = getMatrix.data;
                    }

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

                            if (checkWin(resFunc.data.matrix) && winGame(rememberUserName, level)) {
                                //win
                                resFunc.data.isWin = true;
                            } else {
                                resFunc.data.isWin = false;
                            }
                            resFunc.code = 1;
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

exports.pause = async function(req, res, next) {
    let resFunc = GenaralMethod.getResRouterObject();
    try {
        let db = new AccountModel.AccountModel();
        let params = Controller.getParams(req);

        let rememberUserName = params.rememberUserName;
        let rememberAccessToken = params.rememberAccessToken;

        //let rememberAccount = await Controller.checkRemember(rememberUserName, rememberAccessToken);

        if (await Controller.checkRemember(rememberUserName, rememberAccessToken)) {
            let timePlay = await db.getTimePlayByUser(rememberUserName);
            if (timePlay.data.code == 1) {

                if (timePlay.data.timePause !== 0) {
                    //pause in last
                    resFunc.error = "error";
                } else {
                    //pause now
                    let timeNow = Date.now();
                    let updateTimePlay = await db.updateTimePlay(
                        rememberUserName,
                        timePlay.data.timeStart,
                        timeNow,
                        timePlay.data.timeMinus);
                    if (updateTimePlay.code == 1) {
                        resFunc.code = 1;
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