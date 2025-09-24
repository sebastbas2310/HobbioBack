const express = require("express");
const router = express.Router();
const tableController = require("../controller/tableContrroller"); 

router.get("/", tableController.getTable);
router.post("/addTable", tableController.addTable);
router.put("/updateTable/:table_id", tableController.updateTable);
router.delete("/deleteTable/:table_id", tableController.deleteTable);

module.exports = router;
