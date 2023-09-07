const UserRoutes = require('express').Router()
const UserController = require('./../controllers/user_controller')

UserRoutes.post('/signin', UserController.signIn)
UserRoutes.post('/create', UserController.create)
UserRoutes.put("/:id", UserController.updateAccount)


module.exports = UserRoutes