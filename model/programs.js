const mongoose = require('mongoose'),
{Schema} = mongoose;

ProgramSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    }  
},{timestamps: true});


module.exports = mongoose.model('Program', ProgramSchema);
