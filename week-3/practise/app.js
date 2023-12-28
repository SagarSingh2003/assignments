const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const User = require('./db');

const app = new express();

const users = ['sagar' , 'sima' , 'khushi' , 'subhash'];

app.use(bodyParser.json());

app.post('/signin' , (req, res) => {
    const data = {"username" : req.body.username};
    console.log(req.body);
    const password = req.body.password;
    const finalSafeData = delete data['password']; 
    console.log(finalSafeData);
    console.log(data);
    const token = jwt.sign(data , 'auth');
    
    res.json({
        'token': token
    })
});


app.post('/signup' , (req , res) =>{

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    //find User , if exists return true
    //
    function findUser(un){
        const query =  User.findOne({username : un}, 'username');
        query.select('username email ');
        const userData = query.exec()
        return userData.then((data)=>{
            console.log(data);
            if (data != null){
                return true;
            }
            return false;
        });

    };

    async function UserFoundFunc(username){
        const user = findUser(username);
        user.then((data) =>{
            if(data){
                console.log(data);
                res.json({
                    "msg": "user already exists , please login!"
                })
            }else{
                try{
                User.create({username: username , password : password , email: email});
                res.json({
                    "msg": "user signup successfull"
                })
    
                }catch(err){
                    console.log('error while data was entered');
                }
        }
        })
    }

    UserFoundFunc(username);

})

app.get('/users' , (req ,res) =>{
    
    const token =  req.headers.token;
    console.log('this is token' , token);

    jwtPassword = 'auth';

    try {
         const decoded = jwt.verify(token , jwtPassword);  
         res.send(users); 
    }
    catch (err){
        console.log(err);
    }

    console.log(token);
    // const token = localStorage.getItem()

    // if(verifyToken == token){
    //     res.send('congrats! you have sucessfully signed in' , users );
    // }else{
    //     res.status(403).json({
    //         "msg" : "sign in failed please check if the username and password are correctly entered"
    //     })
    // }
})

app.listen(3000 , ()=> {
    console.log('app listening at port 3000');
})