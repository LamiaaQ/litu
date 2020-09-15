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
    programId:{ type: Schema.Types.ObjectId, ref: 'Program'},
    closedDate:Date
    
},{timestamps: true});


module.exports = mongoose.model('Bug', BugSchema);
