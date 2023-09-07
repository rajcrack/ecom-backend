const UserModel = require('./../models/user_model')
const bcrypt = require('bcrypt')
UserController = {
    create: async function (req, res) {
        try {
            const userData = req.body
            const newUser = new UserModel(userData)
            await newUser.save();
            return res.json({ success: true, data: newUser, message: "User created succesdsfully" })
        }

        catch (ex) {
            return res.json({ success: false, data: 'faliled', message: ex.message || "error ocured", mm: ex.body || "ee" })
        }

    },
    signIn: async function (req, res) {


        try {

            ///get email / phone number from the body
            const { email, password } = req.body
            // found user fgrom usermodel

            const foundUser = await UserModel.findOne({
                email: email
            })
            if (!foundUser
            ) {
                return res.json({ success: false, message: "User not Found!" })
            }
            const passwordMatch = bcrypt.compareSync(password, foundUser.password)
            if (!passwordMatch) {
                return res.json({ success: false, message: "Incorrect password!" })

            }
            return res.json({ success: true, data: foundUser, meessage: "user is available" })
        } catch (error) {
            return res.json({ success: false, message: error })
        }
    }
    ,
    updateAccount: async function (req, res) {
        try {
            const userId = req.params.id;
            const updateData = req.body;
            const updatedUser = await UserModel.findOneAndUpdate({ _id: userId }, updateData, { new: true });
            if (!updatedUser) {
                throw "User Cannot bee updated";
            }
            else {
                return res.json({ success: true, data: updatedUser, message: "data updated successfully" })
            }
        } catch (ex) {
            return res.json({ success: false, message: ex })
        }
    }
}


module.exports = UserController 