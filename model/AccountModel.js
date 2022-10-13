const { json } = require("express");
var GenaralMethod = require("../GenaralMethod");
var Model = require("./Model");

exports.AccountModel = class {
    constructor() {

    }

    getPasswordByUser(user) {
        return new Promise(async(resolve, reject) => {
            let resFunc = GenaralMethod.getResModelObject();
            resFunc.error = user;
            return resolve(resFunc);
            try {
                user = Model.replaceSpecialCharacter(user);
                // return resolve(456);
                if (this.checkValidUserName(user) === false) {
                    resFunc.error = "unvalid_value";
                } else {
                    let sql = "select pass_word from account where user_name like ?";
                    let sqlAgruments = [user];
                    let resDB = await Model.executeQueryPromise(sql, sqlAgruments);

                    // return resolve(resDB.data.length);


                    if (resDB.code === 1) {
                        if (resDB.data.length === 0) {
                            resFunc.code = -1;
                            resFunc.error = "empty";
                        } else {
                            resFunc.code = 1;
                            resFunc.data = resDB.data[0].pass_word;
                        }
                    }
                }
            } catch (err) {
                resFunc.error = "error" + err;
            }
            return resolve(resFunc);
        });
    }

    addAccount(user, password) {
        return new Promise(async(resolve, reject) => {
            let resFunc = GenaralMethod.getResModelObject();
            //resFunc.error = user + "|" + password;
            //return resolve(resFunc);
            try {
                if (this.checkValidUserNameAndPassword(user, password) === false) {
                    resFunc.error = "unvalid_value";
                } else {
                    user = Model.replaceSpecialCharacter(user);
                    // password hashed from controller

                    let getPassword = await this.getPasswordByUser(user);
                    if (getPassword.code === -1) {
                        resFunc = getPassword;
                        if (getPassword.error === "empty") {
                            let sql = "insert into account (user_name,pass_word) values (?,?)";
                            let sqlAgruments = [user, password];
                            let resDB = await Model.executeQueryPromise(sql, sqlAgruments);
                            if (resDB.code === 1) {
                                resFunc.code = 1;
                            } else {
                                resFunc.error = "error";
                            }
                        }
                    } else {
                        resFunc.error = "same_account";
                    }
                }

            } catch (err) {
                resFunc.error = "error" + err;
            }

            return resolve(resFunc);
        });
    }


    updatePassword(user, password) {
        return new Promise(async(resolve, reject) => {
            let resFunc = GenaralMethod.getResModelObject();
            try {

                if (this.checkValidUserNameAndPassword(user, password) === false) {
                    resFunc.error = "unvalid_value";
                } else {
                    user = Model.replaceSpecialCharacter(user);
                    // password hashed from controller

                    let sql = "update account set pass_word=? where user_name like ?";

                    let sqlAgruments = [password, user];
                    let resDB = await Model.executeQueryPromise(sql, sqlAgruments);
                    if (resDB.code === 1 && resDB.effectedRows === 1) {
                        resFunc.code = 1;
                    }
                }

            } catch (err) {
                resFunc.error = "error";
            }

            return resolve(resFunc);
        });
    }

    checkAccessToken(user, accessToken) {
        return new Promise(async(resolve, reject) => {
            let resFunc = GenaralMethod.getResModelObject();
            user = Model.replaceSpecialCharacter(user);

            try {
                if (this.checkValidUserName(user) === false) {
                    resFunc.error = "unvalid_value";
                } else {
                    let sql = "select access_token from account where user_name=? and accessToken is not null";
                    let sqlAgruments = [user];
                    let resDB = await Model.executeQueryPromise(sql, sqlAgruments);
                    if (resDB.code === 1 && resDB.data.length !== 0) {
                        if (accessToken === resDB.data[0].accessToken) {
                            resFunc.code = 1;
                        }
                    }
                }

            } catch (err) {
                resFunc.error = "error";
            }


            return resolve(resFunc);
        });
    }

    updateAccessToken(user, accessToken) {
        return new Promise(async(resolve, reject) => {
            let resFunc = GenaralMethod.getResModelObject();
            user = Model.replaceSpecialCharacter(user);

            try {
                if (this.checkValidUserName(user) === false) {
                    resFunc.error = "unvalid_value";
                } else {
                    let sql = "update account set access_token=? where user_name like ?";
                    let sqlAgruments = [accessToken, user];
                    let resDB = await Model.executeQueryPromise(sql, sqlAgruments);
                    if (resDB.code === 1 && resDB.effectedRows !== 0) {
                        resFunc.code = 1;
                    }
                }

            } catch (err) {
                resFunc.error = "error" + err;
            }

            return resolve(resFunc);
        });
    }

    //return chart
    getChartByLevel(level) {
        return new Promise(async(resolve, reject) => {
            let resFunc = GenaralMethod.getResModelObject();

            try {
                if (Number.isInteger(level) && level <= 6 && level <= 3) {
                    levelSql = "level" + level + "x" + level;
                    let sql = "select top 3 user_name," + levelSql + " from account where " + levelSql + " is not null order by " + levelSql + " ASC";;

                    let sqlAgruments = [];
                    let resDB = await Model.executeQueryPromise(sql, sqlAgruments);
                    if (resDB.code === 1) {
                        resFunc.code = 1;
                        resFunc.data = resDB.data.map(a => ({
                            user: a.user_name,
                            point: a[levelSql]
                        }));
                    }
                }

            } catch (err) {
                resFunc.error = "error";
            }
            return resolve(resFunc);
        });
    }

    updateLevelTime(user, level, sec) {
        return new Promise(async(resolve, reject) => {
            let resFunc = GenaralMethod.getResModelObject();
            user = Model.replaceSpecialCharacter(user);

            try {
                if (this.openConnection() && this.checkValidUserName(user)) {
                    if (Number.isInteger(level) && Number.isInteger(level) && level <= 6 && level <= 3) {
                        levelSql = "level" + level + "x" + level;
                        let sql = "update account set " + levelSql + "= ? where user_name like ?";

                        let sqlAgruments = [sec, user];
                        let resDB = await Model.executeQueryPromise(sql, sqlAgruments);
                        if (resDB.code === 1 && resDB.effectedRows !== 0) {
                            resFunc.code = 1;
                        }
                    }
                }
            } catch (err) {
                resFunc.error = "error";
            }
            return resolve(resFunc);
        });
    }

    getPlayMatrixByUser(user) {
        return new Promise(async(resolve, reject) => {
            let resFunc = GenaralMethod.getResModelObject();
            user = Model.replaceSpecialCharacter(user);

            try {
                if (this.checkValidUserName(user) === false) {
                    resFunc.error = "unvalid_value";
                } else {
                    let sql = "select play_matrix from account where user_name like ?";
                    let sqlAgruments = [user];
                    let resDB = await Model.executeQueryPromise(sql, sqlAgruments);
                    if (resDB.code === 1) {
                        if (resDB.data.length !== 0) {
                            resFunc.code = 1;
                            resFunc.data = JSON.parse(resDB.data[0].play_matrix);
                        }
                    }
                }

            } catch (err) {
                resFunc.error = "error";
            }
            return resolve(resFunc);
        });
    }

    updatePlayMatrix(user, playMatrix) {
        return new Promise(async(resolve, reject) => {
            let resFunc = GenaralMethod.getResModelObject();

            try {

                if (this.checkValidUserName(user) && this.checkValidPlayMatrix(playMatrix)) {
                    user = Model.replaceSpecialCharacter(user);
                    let playMatrixString = JSON.stringify(playMatrix);

                    let sql = "update account set play_matrix=? where user_name like ?";

                    let sqlAgruments = [playMatrixString, user];
                    let resDB = await Model.executeQueryPromise(sql, sqlAgruments);
                    if (resDB.code === 1 || resDB.effectedRows === 1) {
                        resFunc.code = 1;
                    }
                }

            } catch (err) {
                resFunc.error = "error";
            }

            return resolve(resFunc);
        });
    }
    getImageNameByUser(user) {
        return new Promise(async(resolve, reject) => {
            let resFunc = GenaralMethod.getResModelObject();
            user = Model.replaceSpecialCharacter(user);

            try {
                if (this.checkValidUserName(user) === false) {
                    resFunc.error = "unvalid_value";
                } else {
                    let sql = "select image_name from account where user_name like ?";
                    let sqlAgruments = [user];
                    let resDB = await Model.executeQueryPromise(sql, sqlAgruments);
                    if (resDB.code === 1) {
                        if (resDB.data.length !== 0) {
                            resFunc.code = 1;
                            resFunc.data = resDB.data[0].image_name;
                        }
                    }
                }

            } catch (err) {
                resFunc.error = "error";
            }
            return resolve(resFunc);
        });
    }

    updateImageName(user, imageName) {
        return new Promise(async(resolve, reject) => {
            let resFunc = GenaralMethod.getResModelObject();

            try {

                if (this.checkValidUserName(user)) {
                    user = Model.replaceSpecialCharacter(user);
                    imageName = Model.replaceSpecialCharacter(imageName);

                    let sql = "update account set image_name=? where user_name like ?";

                    let sqlAgruments = [imageName, user];
                    let resDB = await Model.executeQueryPromise(sql, sqlAgruments);
                    if (resDB.code === 1 || resDB.effectedRows === 1) {
                        resFunc.code = 1;
                    }
                }

            } catch (err) {
                resFunc.error = "error";
            }

            return resolve(resFunc);
        });
    }

    getTimePlayByUser(user) {
        return new Promise(async(resolve, reject) => {
            let resFunc = GenaralMethod.getResModelObject();
            user = Model.replaceSpecialCharacter(user);

            try {
                if (this.checkValidUserName(user) === false) {
                    resFunc.error = "unvalid_value";
                } else {
                    let sql = "select time_start, time_pause, time_minus from account where user_name like ?";
                    let sqlAgruments = [user];
                    let resDB = await Model.executeQueryPromise(sql, sqlAgruments);
                    if (resDB.code === 1) {
                        if (resDB.data.length !== 0) {
                            resFunc.code = 1;
                            resFunc.data.timeStart = resDB.data[0].time_start;
                            resFunc.data.timePause = resDB.data[0].time_pause;
                            resFunc.data.timeMinus = resDB.data[0].time_minus;
                        }
                    }
                }

            } catch (err) {
                resFunc.error = "error";
            }
            return resolve(resFunc);
        });
    }

    updateTimePlay(user, timeStart, timePause, timeMinus) {
        return new Promise(async(resolve, reject) => {
            let resFunc = GenaralMethod.getResModelObject();
            try {

                if (this.checkValidUserName(user) &&
                    Number.isInteger(timeStart) &&
                    Number.isInteger(timePause) &&
                    Number.isInteger(timeMinus)
                ) {
                    user = Model.replaceSpecialCharacter(user);

                    let sql = "update account set time_start=? , time_pause=?, time_minus=? where user_name like ?";

                    let sqlAgruments = [timeStart, timePause, timeMinus, user];
                    let resDB = await Model.executeQueryPromise(sql, sqlAgruments);
                    if (resDB.code === 1 || resDB.effectedRows === 1) {
                        resFunc.code = 1;
                    }
                }

            } catch (err) {
                resFunc.error = "error";
            }

            return resolve(resFunc);
        });
    }
    checkValidUserNameAndPassword(user, pass) {
        return this.checkValidUserName(user) && this.checkValidPassword(pass);
    }
    checkValidUserName(user) {
        if (
            user.length > 20 ||
            user.indexOf(' ') !== -1 ||
            user.length === 0
        ) {
            return false;
        }
        return true;
    }
    checkValidPassword(pass) {
        if (
            pass.length > 300 ||
            pass.indexOf(' ') !== -1 ||
            pass.length === 0
        ) {
            return false;
        }
        return true;
    }
    checkValidPlayMatrix(arr) {
        //int arr
        for (let index = 0; index < arr.length; index++) {
            if (!Number.isInteger(arr[index])) return false;
        }
        return true;
    }
}