var GenaralMethod = require("../GenaralMethod");
var Model = require("./Model");

exports.AccountModel = class extends Model.Model {
    constructor() {
        super();
    }

    getPasswordByUser(user) {
        let resFunc = GenaralMethod.getResModelObject();
        user = this.replaceSpecialCharacter(user);

        try {
            if (this.openConnection()) {
                if (checkValidUserName(user) == false) {
                    resFunc.error = "unvalid_value";
                } else {
                    let sql = "select pass_word from account where user_name like ?";
                    let agruments = [user];
                    let resDB = this.executeQuery(sql, agruments);
                    if (resDB.code == 1) {
                        if (resDB.data.Length == 0) {
                            resFunc.error = "empty";
                        } else {
                            resFunc.code = 1;
                            resFunc.data = resDB.data[0].pass_word;
                        }
                    }
                }
            }
        } catch (err) {
            resFunc.error = "error";
        }
        return resFunc;
    }

    addAccount(user, password) {
        let resFunc = GenaralMethod.getResModelObject();
        try {
            if (this.openConnection()) {
                //check string

                if (checkValidUserNameAndPassword(user, password) == false) {
                    resFunc.error = "unvalid_value";
                } else {
                    user = this.replaceSpecialCharacter(user);
                    // password hashed from controller

                    getPassword = getPasswordByUser(user);
                    if (getPassword.code == -1) {
                        resFunc = getPassword;
                        if (resFunc.error == "empty") {
                            sql = "insert into Account (user_name,pass_word) values (?,?)";
                            let agruments = [user, password];
                            let resDB = this.executeQuery(sql, agruments);
                            if (resDB.code == 1) {
                                resFunc.code = 1;
                            }
                        }
                    } else {
                        resFunc.error = "same_account";
                    }
                }
            }
        } catch (err) {
            resFunc.error = "error";
        }

        return resFunc;
    }

    updatePassword(user, password) {
        let resFunc = GenaralMethod.getResModelObject();
        try {
            if (this.openConnection()) {
                //check string

                if (checkValidUserNameAndPassword(user, password) == false) {
                    resFunc.error = "unvalid_value";
                } else {
                    user = this.replaceSpecialCharacter(user);
                    // password hashed from controller

                    sql = "update Account set pass_word=? where user_name like ?";

                    let agruments = [password, user];
                    let resDB = this.executeQuery(sql, agruments);
                    if (resDB.code == 1 || resDB.effectedRows == 1) {
                        resFunc.code = 1;
                    }
                }
            }
        } catch (err) {
            resFunc.error = "error";
        }

        return resFunc;
    }

    checkAccessToken(user, accessToken) {
        let resFunc = GenaralMethod.getResModelObject();
        user = this.replaceSpecialCharacter(user);

        try {
            if (this.openConnection()) {
                if (checkValidUserName(user) == false) {
                    resFunc.error = "unvalid_value";
                } else {
                    sql = "select access_token from Account where user_name=? and accessToken is not null";
                    let agruments = [user];
                    let resDB = this.executeQuery(sql, agruments);
                    if (resDB.code == 1 && resDB.data.Length != 0) {
                        if (accessToken == resDB.data[0].accessToken) {
                            resFunc.code = 1;
                        }
                    }
                }
            }
        } catch (err) {
            resFunc.error = "error";
        }


        return resFunc;
    }

    updateAccessToken(user, accessToken) {
        let resFunc = GenaralMethod.getResModelObject();
        user = this.replaceSpecialCharacter(user);

        try {
            if (this.openConnection()) {
                if (checkValidUserName(user) == false) {
                    resFunc.error = "unvalid_value";
                } else {
                    sql = "update Account set access_token=? where user_name like ?";
                    let agruments = [accessToken, user];
                    let resDB = this.executeQuery(sql, agruments);
                    if (resDB.code == 1 && resDB.effectedRows != 0) {
                        resFunc.code = 1;
                    }
                }
            }
        } catch (err) {
            resFunc.error = "error";
        }

        return resFunc;
    }

    //return chart
    getChartByLevel(level) {
        let resFunc = GenaralMethod.getResModelObject();

        try {
            if (this.openConnection()) {
                if (Number.isInteger(level) && level <= 6 && level <= 3) {
                    levelSql = "level" + level + "x" + level;
                    sql = "select top 3 user_name," + levelSql + " from Account where " + levelSql + " is not null order by " + levelSql + " ASC";;

                    let agruments = [];
                    let resDB = this.executeQuery(sql, agruments);
                    if (resDB.code == 1) {
                        resFunc.code = 1;
                        resFunc.data = resDB.data.map(a => ({
                            user: a.user_name,
                            point: a[levelSql]
                        }));
                    }
                }
            }
        } catch (err) {
            resFunc.error = "error";
        }
        return resFunc;
    }

    updateLevelTime(user, level, sec) {
        let resFunc = GenaralMethod.getResModelObject();
        user = this.replaceSpecialCharacter(user);

        try {
            if (this.openConnection() && checkValidUserName(user)) {
                if (Number.isInteger(level) && Number.isInteger(level) && level <= 6 && level <= 3) {
                    levelSql = "level" + level + "x" + level;
                    sql = "update Account set " + levelSql + "= ? where user_name like ?";

                    let agruments = [sec, user];
                    let resDB = this.executeQuery(sql, agruments);
                    if (resDB.code == 1 && resDB.effectedRows != 0) {
                        resFunc.code = 1;
                    }
                }
            }
        } catch (err) {
            resFunc.error = "error";
        }
        return resFunc;
    }

    getPlayMatrixByUser(user) {
        let resFunc = GenaralMethod.getResModelObject();
        user = this.replaceSpecialCharacter(user);

        try {
            if (this.openConnection()) {
                if (checkValidUserName(user) == false) {
                    resFunc.error = "unvalid_value";
                } else {
                    let sql = "select play_matrix from account where user_name like ?";
                    let agruments = [user];
                    let resDB = this.executeQuery(sql, agruments);
                    if (resDB.code == 1) {
                        if (resDB.data.Length != 0) {
                            resFunc.code = 1;
                            resFunc.data = resDB.data[0].play_matrix;
                        }
                    }
                }
            }
        } catch (err) {
            resFunc.error = "error";
        }
        return resFunc;
    }

    updatePlayMatrix(user, playMatrix) {
        let resFunc = GenaralMethod.getResModelObject();


        try {
            if (this.openConnection()) {
                //check string

                if (checkValidUserName(user) && this.checkValidPlayMatrix(playMatrix)) {
                    user = this.replaceSpecialCharacter(user);
                    let playMatrixString = JSON.stringify(playMatrix);

                    sql = "update Account set play_matrix=? where user_name like ?";

                    let agruments = [playMatrixString, user];
                    let resDB = this.executeQuery(sql, agruments);
                    if (resDB.code == 1 || resDB.effectedRows == 1) {
                        resFunc.code = 1;
                    }
                }
            }
        } catch (err) {
            resFunc.error = "error";
        }

        return resFunc;
    }
    getImageNameByUser(user) {
        let resFunc = GenaralMethod.getResModelObject();
        user = this.replaceSpecialCharacter(user);

        try {
            if (this.openConnection()) {
                if (checkValidUserName(user) == false) {
                    resFunc.error = "unvalid_value";
                } else {
                    let sql = "select image_name from account where user_name like ?";
                    let agruments = [user];
                    let resDB = this.executeQuery(sql, agruments);
                    if (resDB.code == 1) {
                        if (resDB.data.Length != 0) {
                            resFunc.code = 1;
                            resFunc.data = resDB.data[0].image_name;
                        }
                    }
                }
            }
        } catch (err) {
            resFunc.error = "error";
        }
        return resFunc;
    }

    updateImageName(user, imageName) {
        let resFunc = GenaralMethod.getResModelObject();

        try {
            if (this.openConnection()) {
                //check string

                if (checkValidUserName(user)) {
                    user = this.replaceSpecialCharacter(user);
                    imageName = this.replaceSpecialCharacter(imageName);

                    sql = "update Account set image_name=? where user_name like ?";

                    let agruments = [imageName, user];
                    let resDB = this.executeQuery(sql, agruments);
                    if (resDB.code == 1 || resDB.effectedRows == 1) {
                        resFunc.code = 1;
                    }
                }
            }
        } catch (err) {
            resFunc.error = "error";
        }

        return resFunc;
    }

    getTimePlayByUser(user) {
        let resFunc = GenaralMethod.getResModelObject();
        user = this.replaceSpecialCharacter(user);

        try {
            if (this.openConnection()) {
                if (checkValidUserName(user) == false) {
                    resFunc.error = "unvalid_value";
                } else {
                    let sql = "select time_start, time_pause, time_minus from account where user_name like ?";
                    let agruments = [user];
                    let resDB = this.executeQuery(sql, agruments);
                    if (resDB.code == 1) {
                        if (resDB.data.Length != 0) {
                            resFunc.code = 1;
                            resFunc.data.timeStart = resDB.data[0].time_start;
                            resFunc.data.timePause = resDB.data[0].time_pause;
                            resFunc.data.timeMinus = resDB.data[0].time_minus;
                        }
                    }
                }
            }
        } catch (err) {
            resFunc.error = "error";
        }
        return resFunc;
    }

    updateTimePlay(user, timeStart, timePause, timeMinus) {
        let resFunc = GenaralMethod.getResModelObject();
        try {
            if (this.openConnection()) {
                //check string

                if (checkValidUserName(user) &&
                    Number.isInteger(timeStart) &&
                    Number.isInteger(timePause) &&
                    Number.isInteger(timeMinus)
                ) {
                    user = this.replaceSpecialCharacter(user);

                    sql = "update Account set time_start=? , time_pause=?, time_minus=? where user_name like ?";

                    let agruments = [timeStart, timePause, timeMinus, user];
                    let resDB = this.executeQuery(sql, agruments);
                    if (resDB.code == 1 || resDB.effectedRows == 1) {
                        resFunc.code = 1;
                    }
                }
            }
        } catch (err) {
            resFunc.error = "error";
        }

        return resFunc;
    }
    checkValidUserNameAndPassword(user, pass) {
        return checkValidUserName(user) && checkValidPassword(pass);
    }
    checkValidUserName(user) {
        if (
            user.Length > 20 ||
            (user).IndexOf(' ') != -1 ||
            user.Length == 0
        ) {
            return false;
        }
        return true;
    }
    checkValidPassword(pass) {
        if (
            pass.Length > 300 ||
            (pass).IndexOf(' ') != -1 ||
            pass.Length == 0
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