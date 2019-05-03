const mongoose = require('mongoose');
var facialRecSchema = new mongoose.Schema({
className:{type:String},
    faceDescriptors:[]
})
const Chat = module.exports = mongoose.model('FacialRec', facialRecSchema);

