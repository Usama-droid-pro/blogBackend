const express = require('express');
const router= express.Router();
const controller= require("../controllers/blogController");

router.post("/addBlog" , controller.addBlog);
 router.get("/getBlogById" , controller.getBlogById);
// router.get("/getCategoryById" , controller.getCategoryById);
// router.delete("/deleteCategory" , controller.deleteCategory);


module.exports = router;