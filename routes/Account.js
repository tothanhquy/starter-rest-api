var express = require('express');
var router = express.Router();
var AccountController = require("../controller/AccountController");


/* GET users listing. */
router.all('/signup', AccountController.addAccount);
router.all('/login', AccountController.login);
router.all('/logout', AccountController.logout);
router.all('/change_password', AccountController.changePassword);

router.all("/test", async(req, res, next) => {
    let p1 = new Promise(async(res1, rej) => {
        let p2 = await new Promise(async(res2, rej) => {
            let p3 = await new Promise((res3, rej) => {
                return res3(56);
            });
            return res2(p3 + "78");
        });
        return res1(p2 + "910");

    });
    p1.then(a => { res.send(p1); })
});

module.exports = router;