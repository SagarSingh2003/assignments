const { Router } = require("express");
const router = Router();
const {User, Course}  = require("../db")
const userMiddleware = require("../middleware/user");


let accessToCourses;
// User Routes

// - POST /users/signup
//   Description: Creates a new user account.
//   Input: { username: 'user', password: 'pass' }
//   Output: { message: 'User created successfully' }

router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    const createUser = User.create({username : username , password : password , accessToCourses : ""});

    createUser.then(() => {
        res.json({
            "message" : "User created successfully"
        })
    })
    

});

// - GET /users/courses
//   Description: Lists all the courses.
//   Input: Headers: { 'username': 'username', 'password': 'password' }
//   Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    
    const username = req.headers.username;
    const password = req.headers.password;

    const query = Course.find({});
    const allCourses = query.exec();
    allCourses.then((data)=>{
        res.send(data);
    }) 


});

// - POST /users/courses/:courseId
//   Description: Purchases a course. courseId in the URL path should be replaced with the ID of the course to be purchased.
//   Input: Headers: { 'username': 'username', 'password': 'password' }
//   Output: { message: 'Course purchased successfully' }

router.post('/courses/:courseId', (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;
    const password =req.headers.password;

    
    const query = Course.findById( courseId);
    const result = query.exec();
    result.then((data) => {
        if(data){
            console.log(data);  

            //find the accessToCourses it has and add the newCourse purchased

            const query2 = User.findOne({username: username , password : password});
            const result2 = query2.exec();
            result2.then((data2) =>{
                
                if(data2.accessToCourses){
                    console.log("++++++++++++" , data2.accessToCourses);
                    accessToCourses =   data2.accessToCourses + "[" + data + "]"
                }else{
                    
                    accessToCourses =  "[" + data + "]"
                }

                console.log(accessToCourses)
                try{
                        console.log('this is id of the user :' , String(data2._id));
                        console.log('this is the type : ', typeof String(data2._id));
                        const IdinString= String(data2._id);
                        const updatedData = User.updateOne({_id: Object(IdinString)} , {$set : {accessToCourses : accessToCourses}});
                        updatedData.then(() =>{
                            res.json({
                                "message" : "Course puchased successfully and added to your courses section"
                            })
                        })
                        
                    
                    
                }catch(err){
                    console.log(err);
                }
            });

        }else{
            res.json({
                "message" : "Course not found"
            })
        }
    })
    
});

// - GET /users/purchasedCourses
//   Description: Lists all the courses purchased by the user.
//   Input: Headers: { 'username': 'username', 'password': 'password' }
//   Output: { purchasedCourses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }

router.get('/purchasedCourses', (req, res) => {
    // Implement fetching purchased courses logic

    const username = req.headers.username;
    const password = req.headers.password;

    const query = User.findOne({username: username , password : password});
    const result = query.exec();
    result.then((data) =>{
        try{
            
                if(data.accessToCourses){
                    res.send(data.accessToCourses);
                }else{
                    res.json({
                        "message" : "sorry! Your courses section is empty"
                    })
                }
            
        }catch(err){
            res.json({
                "msg" : "user Not Found"
            })
            console.log(err);
        }

    }) 
    
});


module.exports = router;