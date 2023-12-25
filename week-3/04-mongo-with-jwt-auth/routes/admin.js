const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const jwt = require('jsonwebtoken');
const zod = require('zod');
const {Course , Admin, User} = require("../db/index")
const router = Router();


//jwt pass
const jwtPassword = "secret";

// Admin Routes


let listOfCourses;

//validation schemas :

const userSchema = zod.string();
const passSchema = zod.string().min(6);

// - POST /admin/signup
//   Description: Creates a new admin account.
//   Input Body: { username: 'admin', password: 'pass' }
//   Output: { message: 'Admin created successfully' }

router.post('/signup', (req, res) => {
    // Implement admin signup logic

    const username = req.body.username;
    const password = req.body.password;

    const findUserExists = User.findOne({username: username , password : password});
    const foundUserExists = findUserExists.exec();
    foundUserExists.then((data) => {
        console.log(data);
        if(data == null){
            res.json({
                "message" : "admin with same username already exists please use a different username"
            })
        }else{
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
        }
    })
    
    
});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username ;
    const password = req.body.password ;

    try{
        const token = jwt.sign({username : username , password : password} , jwtPassword);
        res.json({
            "token" : token
        });
    }catch(err){
        console.log(err);
        res.json({
            "err" : err
        })
    }

});

router.post('/courses', adminMiddleware, (req, res) => {

    // Implement course creation logic
    console.log('got request');
    const username = res.locals.username;
    console.log("got username : ", username);
    const password = res.locals.password;
    console.log("got password: " , password);
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    let courseId;

    
    const checkCoursePresent = Course.findOne({"title" : title , "description" : description , "imageLink" : imageLink});
    const checkedCoursePresent = checkCoursePresent.exec();
    checkedCoursePresent.then((data) => {
        if(data){
            res.json({
                "message" : "course already present"
            })
        }else{
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
                        console.log("data2:" , data2);
                        listOfCourses = data2.listOfCourses;

                        //update the user
                        listOfCourses = listOfCourses + `[${courseId}]`;

                    try{

                        const updatedData = Admin.updateOne({_id: Object(String(data2._id))} , { $set : {listOfCourses : listOfCourses}});
                        updatedData.then(() => {
                            console.log('this is the new listOfCourses : ' , listOfCourses);
                            res.send({
                                "message" : "Courses Created successfully",
                                "update" : "admin data updated...",
                                "CourseDetails" : data 
                            })
                        });
                
                    }catch(err){
                        console.log('***failed to update: ' , err);
                    }
                    })

                }));    

        }
    })
   
});


// - GET /admin/courses
//   Description: Returns all the courses.
//   Input: Headers: { 'Authorization': 'Bearer <your-token>' }
//   Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    
    const username = res.locals.username;
    const password = res.locals.password;


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