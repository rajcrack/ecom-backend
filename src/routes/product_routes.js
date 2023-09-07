const ProductController = require('./../controllers/product_controller')
const ProductRoutes = require('express').Router()


ProductRoutes.get('/', ProductController.fetchAllProducts)
ProductRoutes.get('/:id', ProductController.fetchProductBycategory)
ProductRoutes.post('/', ProductController.createProduct)


module.exports = ProductRoutes