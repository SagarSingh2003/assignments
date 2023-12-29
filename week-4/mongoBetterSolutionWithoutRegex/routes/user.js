const express = require('express');
const router = express.Router();
const {User , Course} = require('../db/index');
const z = require('zod');
const mongoose = require('mongoose');

const userValidate = z.coerce.string().min(2 , {"message" : "must be two characters or long"});
const passValidate = z.coerce.string().min(6 , {"message" : "must be 6 characters or long"}); 

// - POST /users/signup
//   Description: Creates a new user account.
//   Input: { username: 'user', password: 'pass' }
//   Output: { message: 'User created successfully' }

router.post('/signup' , async (req, res) => {
    const username = req.query.username;
    const password = req.query.password;

    const query = User.findOne({username : username});
    const UserFound = await query.exec();
    console.log(UserFound);
    if(UserFound){
        res.json({
            "msg" : "user with the same name already exists please try a different username"
        })
    }else{
        const user = userValidate.safeParse(username);
        const pass = passValidate.safeParse(password);

        if(user.success == true && pass.success == true){

                const query = User.create({username : username , password : password });
                const userData = await query.exec();
                if(userData){
                    res.json({
                        "message" : 'User created successfully'
                    })
                }
                console.log("request served");
        }else{

            if(user.success == false && pass.success == false){
                res.json({
                    "msg" : "username must be atleast 2 characters long & password must be atleast 6 characters long"
                })
            }else if(pass.success == false){ 
                res.json({
                    "msg" : "password must be atleast 6 characters long"
                })
            }else{
                res.json({
                    "msg" : "username must be atleast 2 characters long"
                })
            }
        }

    }

    
});

// - GET /users/courses
//   Description: Lists all the courses.
//   Input: Headers: { 'username': 'username', 'password': 'password' }
//   Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }

router.get('/courses' , async (req , res) => {
    try{
        const query = Course.find({});
        const data =  await query.exec(); 
        let courses = []; 
        for( let eachCollection of data){
            console.log(eachCollection);
            courses.push(eachCollection);
        }
        res.json({
            "courses" : courses
        })
    }catch(err){
        console.log(err);
        res.json({
            "msg" : "could not get data please try again"
        })
    }

})

// - POST /users/courses/:courseId
//   Description: Purchases a course. courseId in the URL path should be replaced with the ID of the course to be purchased.
//   Input: Headers: { 'username': 'username', 'password': 'password' }
//   Output: { message: 'Course purchased successfully' }

router.post('/courses/:courseId' , async (req , res) => {
    const username = req.headers.username;
    const password = req.headers.password;
    const courseId = req.params.courseId;
    // const id =  mongoose.mongo.BSONPure.ObjectId.fromHexString(courseId);

    const query = User.findOne({username : username , password : password});
    const data = await query.exec();
    console.log(data);
    if(data){

        try{
            const query = User.updateOne({username : username, password : password} , { $push : {
                purchasedCourses : new mongoose.Types.ObjectId(courseId)
            }})
            console.log(query);
            const userUpdatedData = await query.exec();
            console.log(userUpdatedData);
            if(userUpdatedData){
                res.json({
                    "message" : "course purchased successfully"
                })
            }
        }catch(err){
            console.log(err);
            res.json({
                "err" : err
            })
        }
    }else{
        res.json({
            "message" : "user not found "
        })
    }
})

// - GET /users/purchasedCourses
//   Description: Lists all the courses purchased by the user.
//   Input: Headers: { 'username': 'username', 'password': 'password' }
//   Output: { purchasedCourses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }

router.get('/purchasedCourses' ,async (req , res) => {
    const username = req.headers.username;
    const password = req.headers.password;
    let courses = [];
    try{

        const query = User.findOne({username : username , password: password} , 'purchasedCourses');
        const data = await query.exec();


        for(let eachCourseId of data.purchasedCourses){

            try{
                const courseQuery = Course.findOne({_id : eachCourseId});
                const courseData = await courseQuery.exec();
                courses.push(courseData);
            }catch(err){
                res.json({
                    "err" : err
                })
            }


        }

        if(courses.length != 0){
            res.json({
                "purchasedCourses" : courses
            })
        }else{
            res.json({
                "pucrchasedCourses" : "no course purchsed yet"
            })
        }

    }catch(err){
        res.json({
            "err" : err
        })
    }



})


module.exports = router;