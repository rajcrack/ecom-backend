const { Schema, model } = require('mongoose')

const categorySchema = new Schema({
    title: { type: String, required: [true, 'Name of Category is required'] },
    description: { type: String, default: '' },
    updatedOn: { type: Date },
    createdOn: { type: Date }

})

categorySchema.pre('save', function (next) {
    this.updatedOn = new Date();
    this.createdOn = new Date()

    next()// add string inside to show errore s


})

categorySchema.pre(['update', 'findOneAndUpdate', 'updateOne'], function (next) {
    const update = this.getUpdate
    delete update._id
    this.updatedOn = new Date()

    next()

})

const CategoryModel = model("category", categorySchema)

module.exports = CategoryModel