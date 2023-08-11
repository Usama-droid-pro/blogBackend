const express = require('express');
const router= express.Router();
const controller= require("../controllers/imageUpload");

router.post("/imageUpload" , controller.uploadImage);

module.exports = router;