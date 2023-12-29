const mongoose = require('mongoose');
require('dotenv').config();


//Connecting to the database

try{

        const connection = mongoose.connect(process.env.MONGODB_URI);
        connection.then(() => {
            console.log("connected to database successfully");
        })
        
}catch(err){
    console.log(err);
}


//Defining the schema

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required : true
    }, 
    password : {
        type: String,
        required : true
    },
    purchasedCourses : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Course'
    }]
})

const adminSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    coursesCreated : [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
})

const courseSchema = new mongoose.Schema({
    title :{
        type: String,
        required : true
    },
    description :{
        type: String,
        required : true
    },
    price :{
        type: String,
        required : true
    },
    imageLink :{
        type: String,
        required : true
    }
        
})


const User = mongoose.model('User' , userSchema);
const Admin = mongoose.model('Admin' , adminSchema);
const Course = mongoose.model('Course' ,courseSchema);


module.exports = {
    User , 
    Admin,
    Course
}