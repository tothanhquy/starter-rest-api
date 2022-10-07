var GenaralMethod = require("../GenaralMethod");

module.exports = function(req, res, next) {
    let resOj = GenaralMethod.getResRouterObject();
    res.send(resOj);
}