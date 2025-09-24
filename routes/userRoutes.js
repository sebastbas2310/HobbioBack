    const express = require("express");
    const router = express.Router();
    const userController = require("../controller/userController");
    const authService = require("../services/authService")  

    router.get("/", userController.getUser);
    router.post("/adduser",userController.addUser);
    router.post("/:id",authService, userController.updateUser);
    router.post("/ChangeStatus/:id", authService,userController.changeUserStatus);
    router.get("/:id", authService,userController.getUserById);

    module.exports = router;