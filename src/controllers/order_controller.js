// const UserModel = require("../models/user_model")
const OrderModel = require("./../models/order_model");
const CartModel = require("./../models/cart_model");

const OrderController = {
    createOrder: async function (req, res) {
        try {
            const { user, items, status } = req.body
            const newOrder = OrderModel({
                user: user,
                items: items,
                status: status
            })
            await newOrder.save();
            //update the cart after placing order
            await CartModel.findOneAndUpdate(
                { user: user._id },
                { items: [] },


            );


            return res.json({ success: true, data: newOrder, message: "order is placed successfully" })


        } catch (error) {
            return res.json({ success: false, message: error })
        }

    },
    fetchOrdersForUser: async function (req, res) {
        try {
            const userId = req.params.userId
            const foundOrders = await OrderModel.find({
                "user._id": userId                           ///// user id  created by uuid v1()
            }).sort({ createdOn: -1 });
            return res.json({
                success: true, data: foundOrders
            })

        } catch (error) {
            return res.json({ success: false, message: error })
        }
    },
    updateOrderStatus: async function (req, res) {
        try {
            const { id, status } = req.body
            const updatedOrder = await OrderModel.findOneAndUpdate(
                { _id: id },
                { status: status },
                { new: true }

            )
            return res.json({
                success: true, data: updatedOrder
            })

        } catch (error) {
            return res.json({ success: false, message: error.message })
        }
    }

}
module.exports = OrderController