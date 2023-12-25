/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  //split the string into an array
  //iterate the array from 0 index
  // iterate the array from reverse
  // if in any iteration there is a special charecter skip that charecter and go to the next one;
  

  let arrOfWords = str.split('');
  
  let lengthToBeChecked = arrOfWords.length;
  let CountFromFront = 0;
  let j ;
  let i ;
  let lengthThatMatters;
  if(arrOfWords.length === 0){
    return true;
  }else if(arrOfWords.length === 1){
    return true;
  }else if (arrOfWords.length % 2 === 0){
    lengthThatMatters = arrOfWords.length / 2;
  }else{
    lengthThatMatters = (arrOfWords.length - 1 )/ 2;
  } 

  for( let i = CountFromFront; i < arrOfWords.length ; i++){

    console.log(`This is length : ${i}`)
    //0 , 1 

    

      if(containsSpecialChars(arrOfWords[i])){  //0123456789abc
        continue;
      }

      lengthToBeChecked = lengthToBeChecked -1 ;

      if ( i ===  lengthThatMatters || j === lengthThatMatters ){
        return true;
      }

      console.log('This is length to be checked for j', lengthToBeChecked);
      //26 , 25

      
      //A b
      
     for(j = lengthToBeChecked ; j >= 0 ; j-- ){
        
      // j = 26 , 25

      if ( i ===lengthThatMatters  || j === lengthThatMatters ){
        return true;
      }

      console.log('hds', j);
      console.log('hds', i);

        if ((containsSpecialChars(arrOfWords[j]))){
          //arrOfWords[26] = !
          //arrOfWords[25] = A 
          lengthToBeChecked = lengthToBeChecked -1 ;
          console.log( `jsad` , i);
          console.log(`jsad` , j);
          continue;
        }

        if (containsSpecialChars(arrOfWords[i])){
            break;

        }

        console.log(`this is ${arrOfWords[i]} before entering the comparison ${i}`)

        console.log(`this is ${arrOfWords[j]} before entering the comparison ${j}`)

        console.log(arrOfWords[i] , arrOfWords[j]);

        


        if(arrOfWords[i].toLowerCase() === arrOfWords[j].toLowerCase()){
          console.log(`This is j before breaking: ${lengthToBeChecked}`)
          console.log('true');
          break;
        }else{
          return false;
        }


      

     }
    
    
    // if(containsSpecialChars(arrOfWords[(arrOfWords.length -1)-i]) )
      // if(arrOfWords[(arrOfWords.length -1)-i].toLowerCase() === arrOfWords[i].toLowerCase()){
      //     continue;
      // }else{
      //   return false;
      // }


  }


}

// console.log(isPalindrome('hi, ih'));


function containsSpecialChars(str) {
const specialChars =
  /[`!@#$%^&*()_+\-=\[\] {};':"\\|,.<>\/?~]/;
return specialChars.test(str);
}

// console.log(containsSpecialChars('is$array'));

console.log(isPalindrome('Able, was I ere I saw ElBA!'));

// console.log(isPalindrome('hello !olleh'));


module.exports = isPalindrome;
