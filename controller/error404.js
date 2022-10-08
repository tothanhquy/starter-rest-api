var GenaralMethod = require("../GenaralMethod");

module.exports = function(req, res, next) {
    let resOj = GenaralMethod.getResRouterObject();
    resOj.error = "404 page not exist";
    res.send(resOj);
}