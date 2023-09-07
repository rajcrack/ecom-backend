const { Schema, model } = require('mongoose')
const cartItemSchema = new Schema({

    product: { type: Schema.Types.ObjectId, ref: 'product' },
    quantity: { type: Number, default: 1 }
})

const cartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    items: { type: [cartItemSchema], default: [] },
    updatedOn: { type: Date },
    createdOn: { type: Date }

})

cartSchema.pre('save', function (next) {
    this.updatedOn = new Date();
    this.createdOn = new Date()

    next()// add string inside to show errore s


})

cartSchema.pre(['update', 'findOneAndUpdate', 'updateOne'], function (next) {
    const update = this.getUpdate
    delete update._id
    this.updatedOn = new Date()

    next()

})

const CartModel = model("cart", cartSchema)

module.exports = CartModel