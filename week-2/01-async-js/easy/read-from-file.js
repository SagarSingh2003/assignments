const fs = require('fs');

fs.readFile('./text-test.txt' , 'utf-8' , (err , data)=> {
    if(err){
        throw new Error(err);
    }
    console.log("this is the data :" , data);
})

for(let i = 0 ; i < 1000000; i++){
    console.log('you have been hacked');
}

//Done !