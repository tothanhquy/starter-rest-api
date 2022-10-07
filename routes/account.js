var express = require('express');
var router = express.Router();
var AccountController = require("../controller/AccountController");


/* GET users listing. */
router.all('/add', AccountController.addAccount);

module.exports = router;