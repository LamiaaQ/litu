const mongoose = require('mongoose'),
{Schema} = mongoose;

UserSchema = new Schema({
    title:{
        type: String,
        trim: true,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    issuedUserId: mongoose.Types.ObjectId,
    image:String,
    priority:{
        type: String,
        required:true
    },
    status:{
        type: String,
        required:true
    },
    devId:mongoose.Types.ObjectId,
    themeId:mongoose.Types.ObjectId,
    closedDate:Date
    
},{timestamps: true});


module.exports = mongoose.model('Bug', UserSchema);
