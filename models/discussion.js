const mongoose = require('mongoose');


var discussionSchema = new mongoose.Schema({

    roomTitle: {
        type: String
    },
    date :{
        type: Date,
        default:new Date()
    },
   // messages: [{type:mongoose.Schema.Types.Object,ref:'Messages'}],
    //users: [{type:mongoose.Schema.Types.ObjectId,ref:'User'}]
});

const ChatDetail = module.exports = mongoose.model('Discussion', discussionSchema);
module.exports.addChatRoom = function (newChat, callback) {
    newChat.save(callback);
};
