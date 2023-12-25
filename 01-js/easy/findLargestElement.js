/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(numbers) {

    //iterate through the array
    //assign the counter the first element of the array
    //check if the first number is greater than the succeding number if yes then change the counter if no then the counter remains the same
    //return the counter

    let LargestNum = numbers[0];

    for(let i = 0; i < numbers.length ; i++){
        if (LargestNum < numbers[i]){
            LargestNum = numbers[i];
        }
    }
    
    return LargestNum;
}

console.log(findLargestElement([2 , 7 , 3 , 9, 1]));

module.exports = findLargestElement;