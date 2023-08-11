
const express = require('express');
const router = express.Router();
const controller = require("../controllers/userController")

router.post("/register", controller.register)
router.post("/login" , controller.login)
router.get("/getAllUsers" , controller.getAllUsers)
router.get("/getSpecificUser/:user_id" , controller.getSpecificUser)
router.delete("/deleteUser/:user_id" , controller.deleteUser)
router.put("/updateUser" , controller.updateUser)
router.put("/updatePassword" , controller.updatePassword)






module.exports= router;