var express = require('express');
var router = express.Router();
const Category = require('../models/Category');
const paginate = require('../utils/paginate')

/*Get all categories . */
const getCategories = async(req,res) => {
    try{
        const result = await paginate(Category,req);
        res.json(result);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
}


//get category by id
const getCategoryById = async(req,res) =>{
    try{
        const category = await Category.findById(req.params.id);
        res.json(category);
    }
    catch (err){
        res.status(500).json({message : err.message});
    }
}

//create a new category
const createCategory = async(req,res) => {
    const category = new Category(req.body);
    try{
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    }catch (err){
        res.status(400).json({message : err.message});
    }
}

//update a category 
const  updateCategory = async(req,res) => {
    try{
        const Updatedcategory = await Category.findByIdAndUpdate(req.params.id,req.body,{new:true});
        console.log("Updated Category Data :", Updatedcategory)
        res.json(Updatedcategory);
    }catch (err){
        res.status(400).json({message: err.message});
    }
}

//delete a category
const deleteCategory = async(req,res)=>{
    try{
        const category= await Category.findByIdAndDelete(req.params.id);
        res.json('Category Deleted');
    }catch(err){
        res.json(err);
    }

}
module.exports= {getCategories,getCategoryById,createCategory,updateCategory,deleteCategory} ;