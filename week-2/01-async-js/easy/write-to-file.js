const fs = require('fs');
const newObj = `{"string" : 'this is a JSON in a text file!'}`;
fs.writeFile('./text-test.txt' ,  newObj , 'utf-8', (err , data) => {

    if(err){
        throw new Error(err);
    }

    console.log('file Has been written once');
})

