const express = require('express');
const {Admin , Course} = require('../db/index');
const router = express.Router();
const z = require('zod');

const adminValidate = z.coerce.string().min(2 , {"message" : "must be two characters or long"});
const passValidate = z.coerce.string().min(6 , {"message" : "must be 6 characters or long"});


// - POST /admin/signup
//   Description: Creates a new admin account.
//   Input Body: { username: 'admin', password: 'pass' }
//   Output: { message: 'Admin created successfully' }

router.post('/signup' , async (req ,res) => {
    const admin = req.body.username;
    const pass = req.body.password;

    try{
        const query = Admin.findOne({username : admin});
        const data = await query.exec();
        console.log(data);
        if(data){
            res.json({
                "msg" : "admin exists already please try a different name "
            })
        }else{
            console.log("reaching here")
            try{

                const admincreated = await Admin.create({username : admin , password : pass });
                if(admincreated){

                    res.json({
                        "msg": "admin created successfully"
                    })
                }
            }catch(err){
                res.json({
                    "err" : err
                })
            }
        }
    }catch(err){
        res.json({
            "err" : err
        })
    }


})

// - POST /admin/courses
//   Description: Creates a new course.
//   Input: Headers: { 'username': 'username', 'password': 'password' }, Body: { title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com' }
//   Output: { message: 'Course created successfully', courseId: "new course id" }

router.post('/courses' , async (req, res) => {
    const username = req.headers.username;
    const password = req.headers.password;

    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    console.log(title , description ,price , imageLink);
    console.log("reaching here");

    try{

        const courseData = await Course.create({title : title , description : description , price : price , imageLink : imageLink});
        console.log(courseData);

        console.log("reaching here 3 : " , courseData);
        if(courseData){
            console.log(courseData._id);

            try{
                const adminQuery =  Admin.updateOne({username : username} , {$push : {coursesCreated : courseData._id }});    
                const updatedAdmin = await adminQuery.exec();

                if(updatedAdmin){
                    res.json({
                        "message" : "Course created successfully"
                    })
                }else{
                    res.json({
                        "message" : "Could not update please try again"
                    })
                }
            }catch(err){
                console.log(err);
                res.json({
                    "err": err
                })
            }
        }

    }catch(err){
        res.json({
            "err" : err
        })
    }

})
// - GET /admin/courses
//   Description: Returns all the courses.
//   Input: Headers: { 'username': 'username', 'password': 'password' }
//   Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }

router.get('/courses' , async (req , res) => {
    const username = req.headers.username;
    const password = req.headers.password;

    const query =  Admin.find({username : username} , 'coursesCreated');
    const coursesIdList = await query.exec();
    let courses = [];

    for( let eachCourseId of coursesIdList){
        console.log(eachCourseId);
        const courseQuery =  Course.findOne({_id : eachCourseId.coursesCreated});
        const courseData  = await courseQuery.exec();
        courses.push(courseData);
    }

    if(courses != null){

        res.json({
            "courses" : courses
        })
    }else{
        res.json({
            "message" : "no courses found "
        })
    }
})


module.exports = router;