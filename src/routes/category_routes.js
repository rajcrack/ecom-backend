const CategoryController = require('../controllers/category_controller')

const CategoryRoutes = require('express').Router()


CategoryRoutes.get('/', CategoryController.fetchAllCategories)
CategoryRoutes.get('/:id', CategoryController.fetchCategorybyId)
CategoryRoutes.post('/', CategoryController.createCategory)


module.exports = CategoryRoutes