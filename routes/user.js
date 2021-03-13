const { Router } = require("express");
const router = Router();
const controller = require("../app/controller/users");
const verifytoken = require("../app/commonclass/verifytoken");

router.post("/", controller.add);
router.get("/:userid", verifytoken, controller.show);
router.post("/login", controller.login);

module.exports = router;
