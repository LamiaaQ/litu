const mongoose = require('mongoose'),
{Schema} = mongoose;

BugSchema = new Schema({
    title:{
        type: String,
        trim: true,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    issuedUserId: { type: Schema.Types.ObjectId, ref: 'User'} , 
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
    programId:mongoose.Types.ObjectId,
    closedDate:Date
    
},{timestamps: true});


module.exports = mongoose.model('Bug', BugSchema);
