let counter = 0;
let  i = 0;
while( i < 10){

    i = i + 1;
    setTimeout(() => {
        counter++;
        console.log(counter);
        
    }, 1000);
}                         