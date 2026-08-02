const mongoose = reuire('mongoose');
const schema = mongoose.schema;
const userSchema = new schema({
    name:{
        type: string,
        requied: true,
    },
    email:{
        type: string,
        requied: true,
        unique: true,
    },
    password:{
        type: string,
        requied: true,
    }
});
const UserModel= mongoose.model('users', UserSchema);
module.exports = UserModel;