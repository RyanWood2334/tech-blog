const router = require("express").Router();

const apiRoutes = require("./api");
const handleBarRoutes = require("./handleBarRoutes");

router.use("/", handleBarRoutes);
router.use("/api", apiRoutes);

module.exports = router;
