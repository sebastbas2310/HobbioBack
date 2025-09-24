    const express = require("express");
    const router = express.Router();
    const workerController = require("../controller/workerController");
    const authService = require("../services/authService")  

    router.get("/", workerController.getWorker);
    router.post("/addWorker",workerController.addWorker);
    router.post("/:id",authService, workerController.updateWorker);
    router.post("/ChangeStatus/:id", authService,workerController.changeWorkerStatus);
    router.get("/:id", authService,workerController.getWorkerById);

    module.exports = router;