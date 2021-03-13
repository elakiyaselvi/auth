const users = require("./user");
module.exports = function (app) {
  app.use("/users", users);
  
  app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500);
    res.render("error");
  });
};
