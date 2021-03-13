var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
const config = require("../../config/config");

router.use(function (req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        let errordata = {
          message: err.message,
          expiredAt: err.expiredAt,
        };
        return res.status(401).json({
          message: "Token expired",
        });
      }
      req.body.uid = decoded.sub;
      next();
    });
  } else {
    return res.status(403).json({
      message: "Forbidden Access",
    });
  }
});

module.exports = router;
