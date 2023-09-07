const CartController = require('../controllers/cart_controller')

const CartRoutes = require('express').Router()


CartRoutes.get('/:user', CartController.getCart)
CartRoutes.post('/', CartController.addToCart)
CartRoutes.delete('/', CartController.removeFromCart)


module.exports = CartRoutes