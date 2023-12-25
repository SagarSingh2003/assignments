const mongoose = require('mongoose');

// Connect to MongoDB
try{
    const connection = mongoose.connect('mongodb+srv://SagarSingh2003:Sagar10%40singh@cluster0.xsx4tgl.mongodb.net/');
    connection.then(() => {
        console.log('database connected succesfully .....');
    })  
}catch(err){
    if (err){
        console.log(err);
    }
}

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    "username" : String ,
    "password" : String,
    "listOfCourses" : {
        type : String , 
        default : ''
    }
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    "username" : String,
    "password" : String,
    "accessToCourses" : {
        type: String,
        default : ''
    } 
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here 
        "title" : String , 
        "description" : String ,
        "price" : String , 
        "imageLink" : String
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}