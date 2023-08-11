const express = require('express');
const router= express.Router();
const controller= require("../controllers/categoryController");

router.post("/addCategory" , controller.addCategory);
router.get("/getAllCategories" , controller.getAllCategories);
router.get("/getCategoryById" , controller.getCategoryById);
router.delete("/deleteCategory" , controller.deleteCategory);
router.get("/getCategoryAndBlogs" , controller.getCategoryAndBlogs);
router.get("/getAllCategorAndBlogs" , controller.getAllCategorAndBlogs);



module.exports = router;