const express = require("express");
const router = express.Router();
const plateController = require("../controller/plateController");

// Rutas existentes
router.get("/", plateController.getPlate);
router.post("/addPlate", plateController.addPlate);
router.put("/updatePlate/:Plate_id", plateController.updateTable);
router.delete("/deletePlate/:plate_id", plateController.deletePlate);

module.exports = router;
