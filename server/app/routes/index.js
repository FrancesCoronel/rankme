"use strict";
var router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use("/products", require("./products"));
router.use("/search", require("./search"));
router.use("/quora", require("./quora"));
// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.sendStatus(404).end();
});
