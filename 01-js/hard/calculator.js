/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

class Calculator {
  constructor (){
    this.result = 0;
  }

  add (n){
    this.result += n;
  }

  subtract (n){
    this.result-= n;
  }

  multiply (n){
    if(this.result == 0){
      this.result = 1;
    }
    
    this.result  *= n;


  }


  divide (n){

    if(this.result == 0){
      this.result = 1;
    }

    if (n == 0){
      throw new Error('cannot Divide by 0')
    }
    this.result  /= n;
  }

  clear (){
    this.result = 0
  }

  getResult (){
    return this.result;
  }

  calculate (str){
    let arr = str.split(' ')
    console.log(arr);

    for(let i = 0; i < arr.length ; i++){

      if(arr[i] == '+' || arr[i] == '*' || arr[i] == '/' || arr[i] == '-' || arr[i] % 2 == 0 || arr[i] % 2 == 1 || arr[i] === '' ){
      
        if ( arr[i] === ''){
          arr = arr.slice(0 , i).concat(arr.slice(i+1 , arr.length));
          i -= 1;
        }

      
      }else{

          console.log(arr[i]);
          throw new Error('Invalid input');
        
      }

      
    }

    //now we have the arr
    console.log(arr);

    for(let i = 0 ; i < arr.length ;i++){

      //if i is a number check i - 1 , if i -1 is undefined then just call the add method
      // else whatever operation might be before at i -1 perform that.

      if ( Number(arr[i]) % 2 === 0 || Number(arr[i]) % 2 === 1){

        if(arr[i - 1] == undefined){
          calculator.add(Number(arr[i]));
          // console.log(`:` , calculator.getResult());
        }else if(arr[i -1] == '+'){
          calculator.add(Number(arr[i]));
          // console.log( `:` , calculator.getResult());
        }else if(arr[i - 1] == '-'){
          calculator.subtract(Number(arr[i]));
          // console.log(`:` , calculator.getResult());
        }else if(arr[i - 1] == '*'){
          calculator.multiply(Number(arr[i]));
          // console.log(`:` , calculator.getResult());
        }else if(arr[i - 1] == '/'){

          if (arr[i] == 0){
            throw new Error('Invalid Input')
          }

          calculator.divide(Number(arr[i]));
          // console.log(`:` , calculator.getResult());

        }

      }

    }

    return (calculator.getResult()) ;
  }


}


module.exports = Calculator;


let calculator = new Calculator();

console.log(calculator.calculate('2 + 3 * 4'));