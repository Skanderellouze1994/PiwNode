const mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs')

var userSchema = new mongoose.Schema({

    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String
    }
});

userSchema.methods.hashPassword = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10))
};

userSchema.methods.comparePassword = function(password,hash){
    return bcrypt.compareSync(password,hash)
};

module.exports = mongoose.model('User', userSchema);