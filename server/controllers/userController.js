const User = require('../model/userModel');
const brcypt = require('bcrypt');

module.exports.register = async (req, res, next) => {
    try {
        const {username,email,password} = req.body;
        const userNameCheck = await User.findOne({ username});
        if(userNameCheck){
            return res.status(400).json({
                message: "User name already exists",
                status: false
            });
        }
        const emailCheck = await User.findOne({ email});
        if(emailCheck){
            return res.status(400).json({
                message: "Email already exists",
                status: false
            });
        }
        const hashedPassword = await brcypt.hash(password, 10);
        const user = await User.create({
            email, username, password: hashedPassword
        });
        delete user.password;
        return res.json({status: true, user});
    } catch (error) {
        next(error);
    }
}