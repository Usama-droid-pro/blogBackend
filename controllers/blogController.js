const mongoose = require('mongoose');
const blogModel = require("../models/blogModel");


exports.addBlog = async (req , res , next) => {
    try{
        const blogTitle = req.body.blogTitle;
        const description = req.body.description;
        const image = req.body.image;
        const user = req.body.user;
        const read_time = req.body.read_time; 
        const blogContent = req.body.blogContent;
        const category = req.body.category;

        if(!user || !blogTitle || !description || !read_time){
            return(
                res.status(400).json({
                    message: "user , blogTitle , description , read_time must be provided",
                    status : false,
                })
            )
        }

        const data = new blogModel({
            _id : mongoose.Types.ObjectId(),
            blogTitle : blogTitle,
            description : description,
            category : category,
            image : image,
            user : user ,
            read_time : read_time,
            blogContent : blogContent
        });

        const result = await data.save();

        if(result){
            res.status(201).json({
                message: "blog created successfully",
                status : true,
                result : result
            })
        }
        else{
            res.status(401).json({
                message: "Due to some issue blog could not be saved successfully",
                status : false
            })
        }


    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message: "Error Occurred",
            status : false,
            error :err.message
        })
    }
}

exports.getBlogById = async(req,res)=>{
    try {
        const blog_id = req.query.blog_id;

        const result = await blogModel.findOne({_id : blog_id}).populate("user").populate("category");

        if(result){
            res.json({
                message : "Fetched",
                status : true,
                result : result
            })
        }
        else{
            res.json({
                message: "No Blog Found",
                status : false
            })
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message: "Error Occurred",
            status : false,
            error :err.message
        })
    }
}