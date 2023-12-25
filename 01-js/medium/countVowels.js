/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
  // Your code here

  //split the string , check every word for a vowel if yes check if it is already present ,if not push it , if yes don't push it.

  let arrOfWords = str.split('');
  let arrOfVowelsPresent = [];

  for(let i = 0 ; i < arrOfWords.length ; i++){

      if(arrOfWords[i].toLowerCase() === 'a' ||arrOfWords[i].toLowerCase() === 'e' || arrOfWords[i].toLowerCase() === 'i' || arrOfWords[i].toLowerCase() === 'o' || arrOfWords[i].toLowerCase() === 'u'){

          arrOfVowelsPresent.push(arrOfWords[i]);

      }
  }

  return arrOfVowelsPresent.length;
}


module.exports = countVowels;