var express = require('express');
var router = express.Router();
var MainMenuController = require("../controller/MainMenuController");


/* GET users listing. */
router.all('/get_charts', MainMenuController.loadDataCharts);

module.exports = router;