const mongoose = require('mongoose')

//Destructing {} in .js
const {Schema} = mongoose;

//Object creation in Schema & then, write all data in it
const UserSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }
});

//With this model() we can do CRUD operation in Mongoose 
//Here, we are creating collection using it. 
module.exports = mongoose.model('user',UserSchema)
