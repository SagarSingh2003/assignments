const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const zod = require('zod');
const bodyParser = require("body-parser");
const { Admin , Course } = require("../db");
// const { find } = require("../../practise/db");

const router = Router();


let listOfCourses;

//validation schemas :

const userSchema = zod.string();
const passSchema = zod.string().min(6);

// Admin Routes


// - POST /admin/signup
//   Description: Creates a new admin account.
//   Input Body: { username: 'admin', password: 'pass' }
//   Output: { message: 'Admin created successfully' }


router.post('/signup', (req, res) => {

    // Implement admin signup logic

    const username = req.body.username;
    const password = req.body.password;

    const usernameValidated = userSchema.safeParse(username);
    const passValidated = passSchema.safeParse(password);

    if(usernameValidated.error){
        res.json({
            "error" : usernameValidated.error
        })
    }


    if(passValidated.error){
        res.json({
            "error" :   passValidated.error
        })
    }
    
    Admin.create({"username" : username , "password" : password});

    res.json({
        "message" : "admin created successfully"
    })

});



// - POST /admin/courses
//   Description: Creates a new course.
//   Input: Headers: { 'username': 'username', 'password': 'password' }, Body: { title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com' }
//   Output: { message: 'Course created successfully', courseId: "new course id"}

router.post('/courses', (req , res , next) => {console.log('got here'); next()} ,(req, res) => {
    console.log('got request');
    const username = req.headers.username;
    const password = req.headers.password;
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    let courseId;
    
    // Implement course creation logic
    console.log('course creation started ....');
    const createdCourseData = Course.create({ 
        "title" : title ,"description" : description ,"price" : price ,"imageLink" : imageLink
    })

    console.log('course created ....' , createdCourseData.then((data) => {
        courseId = data;

            
        const query = Admin.findOne({"username" : username});
        const dataOfAdminUser = query.exec();

        dataOfAdminUser.then((data2) =>{
            listOfCourses = data2.listOfCourses;

            //update the user
        listOfCourses = listOfCourses + `[${courseId}]`;
        console.log('this is the new listOfCourses : ' , listOfCourses);

        try{

            const updatedData = Admin.updateOne({_id : Object(String(data._id))} , { $set : {"listOfCourses" : listOfCourses}});
            updatedData.then(() => {
                res.send({
                    "message" : "Courses Created successfully",
                    "update" : "admin data updated...",
                    "CourseDetails" : data 
                })
            });
            // res.json({
            //     "updatedData" : updatedData
            // })
        }catch(err){
            console.log('***failed to update: ' , err);
        }

    

        })

    }));    
        



        // res.json({
        //     "message" : "Course created successfully",
        //     "courseId" : data
        // })


})

// - GET /admin/courses
//   Description: Returns all the courses.
//   Input: Headers: { 'username': 'username', 'password': 'password' }
//   Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }

router.get('/courses', (req, res) => {
    // Implement fetching all courses logic

    const username = req.headers.username;
    const password = req.headers.password;


    //check if the password and username are correct or not

    try{
        const query = Admin.findOne({username : username , password : password} , 'listOfCourses');
        const result = query.exec();
        result.then((data) => {
            console.log("user found : ",data);
            
            res.send(data.listOfCourses);
        })
    }catch(err){
        console.log('err in get request : ' , err);
    }
    

});

module.exports = router;