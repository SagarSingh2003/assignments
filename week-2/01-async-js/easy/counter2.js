for(let i = 0 ; i > -1 ; i++){
    let AfterDate ;
    let CurrentDate = Date.now();
    
    do{
         AfterDate = Date.now();
    }while(AfterDate - CurrentDate < 1000)

    console.log(i);
}

// let i = 0 ; 
// function callYourself(){
//     setTimeout( () => {
//         console.log(i);
//         i += 1 ;
//         callYourself();
//     } , 1000);
// }

// callYourself();