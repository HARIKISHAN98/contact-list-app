const express = require("express");
const router = express.Router();
const middleware = require("../middleware/middleware");

router.get("/getData", middleware.getData);
router.post("/postData", middleware.postData);
router.put("/putData/:id", middleware.putData);
router.delete("/deleteData/:id", middleware.deleteData);

module.exports = router;
