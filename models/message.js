const mongoose = require('mongoose');
var data = new mongoose.Schema({
    text:String,
    code:String,
    url:String,
    fileName:String

})
var messageSchema = new mongoose.Schema({

    type:{
        type:String
    },

    textMessage: {
        type: String
    },
    dateCreation :{
        type: Date
    },

    data:data,
    author: {type:mongoose.Schema.Types.ObjectId,ref:'User'},
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discussion',
        required: true
    }
});

const Chat = module.exports = mongoose.model('Message', messageSchema);
module.exports.addChatMsg = function (newMsg, callback) {
    newMsg.save(callback);
};
