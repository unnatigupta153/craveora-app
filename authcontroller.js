const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usermodel = require('../models/db');
const signup = async (req,res) => {
try {
const {name,email,password} = req.body;
const user = await UserModel.findOne({email});
if(user){
return res.status(409).json({message: "user is already exist,you can login, success: false"});

}
const usermodel = new UserModel({name,email,password});
usemodel.password = await bcrypt.hash(password, 10);
 await usermodel.save();
res.status(201).json({message: "sign successfully", success: true

});
} catch (err) {
    res.status(500).json({message: "internal server error", success: false

    });
}
}
const login = async (req,res) => {
try {
const {email,password} = req.body;
const user = await UserModel.findOne({email});
const errormsg ='auth failed email or password is wrong';
if(!user){
return res.status(403).json({message: errormsg, success: false});

}
const isPassequal = await bcrypt.compare(password, user.password);
if(!isPassequal){
    return res.status(403).json({message: errormsg, success: false});
}
const token = jwt.sign({email:user.email, id:user._id}, ...);
    process.env.jwt_secret, {expiresIn: '24h'});
res.status(200).json({message: "login successfully", success: true, jwtToken,email,name:user.name});
} catch (err) {
    res.status(500).json({message: "internal server error", success: false });
}
module.exports = {
    signup,
    login
}