const { Schema, model } = require('mongoose')
const orderItemSchema = new Schema({

    product: { type: Map, required: true },
    quantity: { type: Number, default: 1 }
})

const orderSchema = new Schema({
    user: { type: Map, required: true },
    status: { type: String, default: "order under check" },
    items: { type: [orderItemSchema], default: [] },
    updatedOn: { type: Date },
    createdOn: { type: Date }

})

orderSchema.pre('save', function (next) {
    this.updatedOn = new Date();
    this.createdOn = new Date()

    next()// add string inside to show errore s


})

orderSchema.pre(['update', 'findOneAndUpdate', 'updateOne'], function (next) {
    const update = this.getUpdate
    delete update._id
    this.updatedOn = new Date()

    next()

})

const OrderModel = model("order", orderSchema)

module.exports = OrderModel