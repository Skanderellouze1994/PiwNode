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
    name:{
        type:String
    },
    birthday:{
        type:Date
    },
    address:{
        type:String
    },
    profile_photo:{
        type:String
    },
    facebook_url:{
        type:String
    },
    linkedin_url:{
        type:String
    },
    github_url:{
        type:String
    },
    position:{
        type:String
    },
    about_me:{
        type:String
    },
    num_tel:{
        type:String
    },

    facebook :{
        id: {
            type: String
        },

        token: {
            type: String
        }
    },
    github :{
        id: {
            type: String
        },
        url: {
            type: String
        },
        photo: {
            type: String
        }
    },
    google :{
        id: {
            type: String
        }
    },
    linkedin :{
        id: {
            type: String
        },
        url: {
            type: String
        },
        headline: {
            type: String
        },

    },
    role: {
        type: String
    }});

userSchema.methods.hashPassword = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10))
};

userSchema.methods.comparePassword = function(password,hash){
    return bcrypt.compareSync(password,hash)
};
userSchema.methods.validPassword = function( pwd ) {
    // EXAMPLE CODE!
    return ( this.password === pwd );
};

module.exports = userSchema;