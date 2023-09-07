const CategoryModel = require("./../models/category_model")

const CategoryController = {

    createCategory: async function (req, res) {
        try {
            const categoryData = req.body
            const newCategory = new CategoryModel(categoryData)
            await newCategory.save()
            return res.json({ success: true, data: newCategory, message: "category created successfully" })

        }
        catch (ex) {
            return res.json({ success: false, message: ex })
        }

    },
    fetchAllCategories: async function (req, res) {
        try {
            const categories = await CategoryModel.find()

            return res.json({ success: true, data: categories })

        }
        catch (ex) {
            return res.json({ success: false, message: ex.message })
        }

    },
    fetchCategorybyId: async function (req, res) {
        try {
            const id = req.params.id

            const foundCategories = await CategoryModel.findById(id)
            if (!foundCategories) {
                return res.json({ success: false, message: "Categories not found" })
            }
            return res.json({ success: true, data: foundCategories })


        }
        catch (ex) {
            return res.json({ success: false, message: ex })
        }

    }
}

module.exports = CategoryController