const fs = require('fs');

let finalString = '';
let stringDataArr ;
fs.readFile('./text.txt' , 'utf-8' , (err , data) => {

    if(err){
        throw new Error(err);
    }

    stringDataArr = data.split(' ');
      
    console.log(stringDataArr);

    for( let i = 0 ; i < stringDataArr.length ; i++){

        if(stringDataArr[i] == ''){

            stringDataArr = stringDataArr.slice(0 , i).concat(stringDataArr.slice(i+1 , stringDataArr.length));
            i -= 1;

        }
    }

    for(let i = 0 ; i < stringDataArr.length ; i++){
        finalString += stringDataArr[i] + ' ';
    }

    fs.writeFile('text.txt', finalString , 'utf-8' , (err) => {
        if(err){
            throw new Error(err);
        }
    })
    
    
    
});

