// Middleware for handling auth
const jwt = require('jsonwebtoken');
const {Admin} = require('../db/index')


//jwtpass
const jwtPassword = "secret";

function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    let token = req.headers.authorization;
    token = token.replace(/^Bearer / , "");
    console.log(token);

    if(token){
        jwt.verify(token , jwtPassword , (err , decoded)  => {
            if(err){
                console.log(err);
                res.json({
                    "message" : "token not valid"
                });
            }
            

            try{
                const findAdmin = Admin.findOne({username : decoded.username , password : decoded.password});
                findAdmin.then(() =>{
                    console.log("Admin found , good to go!");

                const username = decoded.username;
                const password = decoded.password;
                console.log(username , password);
                res.locals.username = username;
                res.locals.password = password;
                console.log('adminMiddleware job done');

                next();
                })
            }catch(err){
                console.log(err);
                res.json({
                    "message" : err
                })
            }
            
        });
    }else{
        res.json({
            "message" : "token not found"
        })
    }
    
}

module.exports = adminMiddleware;