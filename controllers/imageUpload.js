const fileUpload = require("../middlewares/imageUpload");


exports.uploadImage = async (req,res)=>{
      try{
          fileUpload(req, res, function (err) {
     
              if (err) {
                  res.status(400).json({
                      message: "Failed to upload file",
                      status:false,
                      error:err.message,
                    });
              } 
              else {
                res.status(200).json({
                  message: "file uploaded in particular folder",
                  image_url : req.file.path,
                  status:true
                });
              }
            });
      }
      catch(err){
          res.json(err)
      }
  

  }