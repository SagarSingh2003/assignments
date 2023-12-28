
const mongoose = require('mongoose');

try{
    console.log('reached here');
    const connection = mongoose.connect('mongodb+srv://SagarSingh2003:Sagar10%40singh@cluster0.xsx4tgl.mongodb.net/?retryWrites=true&w=majority');
    connection.then(() =>{
        console.log('connected with database successfully .....')
    })
}catch(err){
    console.log(err , 'while connection to the database');
}

const User = mongoose.model('users' , { username : String ,password : String , email : String });

// // User.create({username: 'sagar singh' , password : '123456' , email: 'iamsagar762@gmail.com'});
// // User.create({username: 'sima singh' , password : '123456' , email: 'iamsagar762@gmail.com'});
// // User.create({username: 'subhash singh' , password : '123456' , email: 'iamsagar762@gmail.com'});
// let user = new User({username: 'k singh' , password : '123456' , email: 'iamsagar762@gmail.com'});
// User.create({username: 's singh' , password : '123456' , email: 'iamsagar762@gmail.com'});

// user.save().then(() => {
// console.log('data uploaded successfully');
// });


module.exports = User ;

