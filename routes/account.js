var express = require('express');
var router = express.Router();
var AccountController = require("../controller/AccountController");


/* GET users listing. */
router.all('/signup', AccountController.addAccount);
router.all('/login', AccountController.login);
router.all('/logout', AccountController.logout);
router.all('/change_password', AccountController.changePassword);

module.exports = router;