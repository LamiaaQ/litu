const mongoose = require('mongoose'),
{Schema} = mongoose;
/*const passportLocalMongoose = require('passport-local-mongoose');*/


UserSchema = new Schema({
    name:{
        type: String,
        trim: true,
        required: true
    },
    DOB:Date,
    gender: Boolean,
    email:{
        type: String,
        required: true,
    },
    department:String,
    isDev:Boolean
    
},{timestamps: true});

/*
UserSchema.plugin(passportLocalMongoose, {
    usernameField: 'email'
});*/

module.exports = mongoose.model('User', UserSchema);
