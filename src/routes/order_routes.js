const OrderController = require('../controllers/order_controller')

const OrderRoutes = require('express').Router()


OrderRoutes.post('/', OrderController.createOrder)
OrderRoutes.get('/:userId', OrderController.fetchOrdersForUser)
OrderRoutes.put('/updateorder', OrderController.updateOrderStatus)



module.exports = OrderRoutes