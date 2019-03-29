const mongoose = require('mongoose');



var anteriorCurriculumsSchema = new mongoose.Schema({

    name: {
        type: String
    },
    headline:{type:String},
    location:{type:String},
    summary:{type:String},
});
module.exports = mongoose.model('AnteriorCurriculums',anteriorCurriculumsSchema);
