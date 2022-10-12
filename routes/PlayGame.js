var express = require('express');
var router = express.Router();
var PlayScreenController = require("../controller/PlayScreenController");


/* GET users listing. */
router.all('/create', PlayScreenController.createGamePlay);
router.all('/load', PlayScreenController.loadGamePlay);
router.all('/move', PlayScreenController.move);
router.all('/pause', PlayScreenController.pause);

module.exports = router;