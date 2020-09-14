const mongoose = require('mongoose'),

ProgramSchema = new Schema({
    title:{
        type: String,
        trim: true,
        required: true
    },
    description:{
        type: String,
        required: true,
    }  
},{timestamps: true});


module.exports = mongoose.model('Program', ProgramSchema);
