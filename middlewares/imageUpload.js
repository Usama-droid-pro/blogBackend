const express = require('express');
const multer = require('multer');
const app = express();
const fs= require('fs')

// Define storage for hairStyles images
const uploadImage = multer.diskStorage({
  destination: function (req, file, cb) {
      const dir = './tmp/';

      if(!fs.existsSync(dir)){
          fs.mkdirSync(dir, {recursive:true});
      }
      cb(null , dir)
  },
  filename:function(req,file,cb){
    cb(null ,Date.now() + "--" + file.originalname)
}
});
// Define upload middleware for hairStyles images
const fileUpload = multer({
  storage: uploadImage,
 
}).single('image');


module.exports = fileUpload;