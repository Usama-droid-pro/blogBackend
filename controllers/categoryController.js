const mongoose = require('mongoose');
const categoryModel = require("../models/categoryModel");
const ObjectId = require("mongodb").ObjectId;


exports.addCategory = async (req,res)=>{
    try{
        const name = req.body.name;
        const icon = req.body.icon;

        if(!name || ! icon){
            return (
                res.json({
                    message : 'name and icon must be specified',
                    status : false
                })
            )
        }

        const newCategory = new categoryModel({
            _id : mongoose.Types.ObjectId(),
            name : name,
            icon : icon
        })

        const result = await newCategory.save();
        if(result){
           res.json({
            message: "Category saved successfully",
            status : true,
            result :result
           }) 
        }
        else{
            res.json({
                message: "Could not save category",
                status : false
            })
        }

    }
    catch(err){
        res.json({
            message : "Error Occurred",
            status : false,
            error : err.message
        })
    }
}

exports.getAllCategories =async function(req,res){
    try{
      
        const result = await categoryModel.find({});
        if(result){
            res.json({
             message: "Category Fetched successfully",
             status : true,
             result : result
            }) 
         }
         else{
             res.json({
                 message: "Could not fetch categories",
                 status : false
             })
         }
        
    }
    catch(err){
        res.json({
            message : "Error Occurred",
            status : false,
            error : err.message
        })
    }
}

exports.getCategoryById =async function(req,res){
    try{
      
        const category_id = req.query.category_id;
        const result = await categoryModel.findOne({_id : category_id});
        if(result){
            res.json({
             message: "Category Fetched successfully",
             status : true,
             result : result
            }) 
         }
         else{
             res.json({
                 message: "Could not fetch category",
                 status : false
             })
         }
        
    }
    catch(err){
        res.json({
            message : "Error Occurred",
            status : false,
            error : err.message
        })
    }
}

exports.deleteCategory = async (req,res)=>{
    try{
        const category_id = req.query.category_id;

        const result = await categoryModel.deleteOne({_id : category_id});

        if(result.deletedCount > 0){
            res.json({
             message: "Category deleted successfully",
             status : false,
            }) 
         }
         else{
             res.json({
                 message: "Could not delete category",
                 status : false
             })
         }

    }
    catch(err){
        res.json({
            message : "Error Occurred",
            status : false,
            error : err.message
        })
    }
}

exports.getCategoryAndBlogs  = async (req,res)=>{
    try{
        let category_id = req.query.category_id;
        category_id = ObjectId(category_id);

        if(!category_id){
            return(
                res.status(400).json({
                    message: "please provide category_id",
                    status : false
                })
            )
        }

        const result = await categoryModel.aggregate([
            {
                $match : {_id: category_id}
            },
            {
                $lookup : {
                    from : "blogs",
                    localField : "_id",
                    foreignField : "category",
                    as : "all_blogs"

                }
            },
            {
                $unwind: "$all_blogs" // Deconstructs the all_blogs array
              },
            {
                $lookup:{
                    from : "users",
                    localField : "all_blogs.user",
                    foreignField : "_id",
                    as : "all_blogs.user"
                    
                }
            }
            , {
                $group: {
                  _id: "$_id",
                  name: { $first: "$name" },
                  icon: { $first: "$icon" },
                  all_blogs: { $push: "$all_blogs" }, // Convert all_blogs to an array
                },
              },
        ])


        if(result){
            return(
                res.json({
                    message: "Fetched",
                    status : true,
                    result : result
                })
            )
        }
        else{
            res.json({
                message: "Could not fetch",
                status : false
            })
        }

    }
    catch(err){
        res.json({
            message : "Error Occurred",
            status : false,
            error : err.message
        })
    }
}

exports.getAllCategorAndBlogs  = async (req,res)=>{
    try{
        const result = await categoryModel.aggregate([
            {
              $lookup: {
                from: "blogs",
                localField: "_id",
                foreignField: "category",
                as: "all_blogs",
              },
            },
            {
              $unwind: {
                path: "$all_blogs",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $lookup: {
                from: "users",
                localField: "all_blogs.user",
                foreignField: "_id",
                as: "all_blogs.user",
              },
            },
            {
              $group: {
                _id: "$_id",
                name: { $first: "$name" },
                icon: { $first: "$icon" },
                all_blogs: { $push: "$all_blogs" }, // Convert all_blogs to an array
              },
            },
          ]);

          console.log(result)

        if(result){
            return(
                res.json({
                    message: "Fetched",
                    status : true,
                    result : result
                })
            )
        }
        else{
            res.json({
                message: "Could not fetch",
                status : false
            })
        }

    }
    catch(err){
        res.json({
            message : "Error Occurred",
            status : false,
            error : err.message
        })
    }
}