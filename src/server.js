
const express = require('express')

const bodyparser = require('body-parser')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')


const app = express()
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(helmet())
app.use(morgan('dev'))
app.use(cors())

// const url = "mongodb://127.0.0.1:27017/test"
const url = "mongodb+srv://myuser:1qaz2wsx3edc@navydive.gt8hbch.mongodb.net/ecom-backend?retryWrites=true&w=majority"
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

//USER ROUTES
const UserRoutes = require('./routes/user_routes')
app.use('/api/user', UserRoutes)

//category routes
const CategoryRoutes = require('./routes/category_routes')
app.use('/api/category', CategoryRoutes)

//product  routes
const ProductRoutes = require('./routes/product_routes')
app.use('/api/product', ProductRoutes)

// cart routes
const CartRoutes = require('./routes/cart_routes')
app.use("/api/cart", CartRoutes)

//order routes
const OrderRoutes = require('./routes/order_routes')
app.use('/api/order', OrderRoutes)

const PORT = 80
app.listen(PORT, () => console.log(`server started ${PORT}`))
