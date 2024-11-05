var express = require('express');
var router = express.Router();
const {getCategories,getCategoryById,createCategory,updateCategory,deleteCategory} =require ('../routes/categoryRoutes')


/*Get all categories . */
router.get('/', getCategories)


//get category by id
router.get('/:id',getCategoryById)

//create a new category
router.post('/' ,createCategory)

//update a category 
router.put('/:id', updateCategory)

//delete a category
router.delete('/:id', deleteCategory)
module.exports= router;