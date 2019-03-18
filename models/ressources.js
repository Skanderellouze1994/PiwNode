const mongoose = require('mongoose');

var ressourceSchema = new mongoose.Schema({

    name: {
        type: String
    },
    creationDate :{
        type: Date ,
        default: Date.now
    },
    description: {
        type: String
    },
    path: {
        type: String
    }
});

module.exports = mongoose.model('Ressources', ressourceSchema);