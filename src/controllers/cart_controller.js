const CartModel = require("./../models/cart_model")

const CartController = {
    addToCart: async function (req, res) {
        try {
            const { user, product, quantity } = req.body

            const foundCart = await CartModel.findOne({ user: user })
            //if cart does not exist
            if (!foundCart) {
                const newCart = new CartModel({ user: user })
                newCart.items.push({
                    product: product,
                    quantity: quantity
                }
                )
                await newCart.save()
                return res.json({ success: true, data: newCart.items, message: "items added to cart" })
            }
            //delete items if alresady exist
            await CartModel.findOneAndUpdate({ user: user, "items.product": product }, { $pull: { items: { product: product } } }, { new: true });
            //if cart already exist
            const updatedCart = await CartModel.findOneAndUpdate(
                { user: user },
                { $push: { items: { product: product, quantity: quantity } } },
                { new: true }

            ).populate("items.product");

            return res.json({ success: true, data: updatedCart.items, message: "items added to cart" })



        } catch (error) {
            return res.json({ success: false, message: error.message })
        }

    },
    removeFromCart: async function (req, res) {
        try {
            const { user, product } = req.body

            const updatedCart = await CartModel.findOneAndUpdate({ user: user },
                { $pull: { items: { product: product } } },
                { new: true }
            ).populate("items.product")
            return res.json({
                success: true,
                data: updatedCart.items,

                message: "items removed from cart"
            })
        } catch (error) {
            return res.json({ success: false, message: error })
        }
    },
    getCart: async function (req, res) {
        try {
            const user = req.params.user
            const foundcart = await CartModel.findOne(
                { user: user }
            ).populate("items.product")
            if (!foundcart) {
                return res.json({ success: true, data: [], message: "cart is empty" })
            }
            return res.status(200).json({ success: true, data: foundcart.items })

        } catch (error) {
            return res.json({ success: false, message: error.message })
        }
    }
}
module.exports = CartController