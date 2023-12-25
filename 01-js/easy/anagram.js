/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {

  //split the str1 and str2 and store it in an array.
  // iterate thorough one of them 
  // each iteration check if the second one contains the element of that iteration , if yes then continue until it reaches the end of the array , if no then return not Anagram
  //also declare a variable that checks for the end of the array.


  const StrSplit1 = str1.toLowerCase().split('');
  const StrSplit2 = str2.toLowerCase().split('');
  let counter = 0;

//paper , reppa

  if(StrSplit1.length === StrSplit2.length){

      //true

      for(let i = 0; i < StrSplit1.length ; i++){

        StrSplit2.includes(StrSplit1[i]) ? counter += 1 : counter += 0;

      } 

      return counter === StrSplit1.length ? true : false; 

  }else{
    return false;
  }


}




console.log(isAnagram('sharpie' , 'prashii'));

module.exports = isAnagram;
