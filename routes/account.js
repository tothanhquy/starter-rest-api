var express = require('express');
var router = express.Router();
var addAccount = require("../controller/account/addAccount");


/* GET users listing. */
router.post('/add', addAccount);

module.exports = router;