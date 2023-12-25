/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]
*/


//check for the category , if it is a new category create an object of that category and if it is already present then just add the 
// total amount spent


function calculateTotalSpentByCategory(transactions) {

  let Category , Price; 
  
  let arr = [];

   //find category and price of all the transactions
  //create an array of objects that stores all the Categroies as key and Price as value 
  //check if the category is already present then just add to the categories price;


   for(let i = 0 ; i < transactions.length ; i++){

        Category = transactions[i]['category'];;
        Price = transactions[i]['price'];
        createObject(Category , Price);
        
   }


      function createObject(category , price){

        let newObject = {};

              if( arr.length === 0){
        
        
                newObject["category"] = category;
                newObject["totalSpent"] = price;
                
                arr.push(newObject);
        
                //{grocery : 25} 
        
                  
              }else{
          

                          //iterate on arr
                          // check for each element of the array if the category matches add the price and break
                          // if it does not match the price continue the loop until it reaches the end of the array , if it has reached the end of the array it means that none matched the conditiion hence push a new object
                          
                
                          for( let j = 0 ; j < arr.length ; j++ ){
                
                              
                              if(category === arr[j]['category']){
                                arr[j]['totalSpent'] += price;
                                break;
                              }
                
                              if( j === arr.length-1){
                                newObject['category'] = category;
                                newObject['totalSpent'] = price;
                                arr.push(newObject);
                                break;
                                
                              }
                              
                              
                          } 

      }

//    function createObject(category , price){

//       let newObject = {};

//       if( arr.length === 0){


//         newObject[category] = price;
//         arr.push(newObject);

//         //{grocery : 25} 

          
//       }else{
          
//           //iterate on arr
//           // check for each element of the array if the category matches add the price and break
//           // if it does not match the price continue the loop until it reaches the end of the array , if it has reached the end of the array it means that none matched the conditiion hence push a new object
          

//           for( let j = 0 ; j < arr.length ; j++ ){

              
//               if(category in arr[j]){
//                 arr[j][category] += price;
//                 break;
//               }

//               if( j === arr.length-1){
//                 newObject[category] = price;
//                 arr.push(newObject);
//                 break;
                
//               }
              
              
//           } 
      
//       }
    }
    return arr;
}



// let transactions = [{itemName : "sugar" , category : "grocery" , price : 25 , timeStamp : 10112003 } , {itemName : "eraser" , category : "stationary" , price : 1 , timeStamp : 12112003 } , {itemName : "salt" , category : "grocery" , price : 55 , timeStamp : 12112003 }, {itemName : "salt" , category : "grocery" , price : 1 , timeStamp : 12112003 }, {itemName : "eraser" , category : "furniture" , price : 1 , timeStamp : 12112003 }]
 
const transactions = [
    {
      id: 1,
      timestamp: 1656076800000,
      price: 10,
      category: 'Food',
      itemName: 'Pizza',
    },
    {
      id: 2,
      timestamp: 1656259600000,
      price: 20,
      category: 'Food',
      itemName: 'Burger',
    },
    {
      id: 3,
      timestamp: 1656019200000,
      price: 15,
      category: 'Clothing',
      itemName: 'T-Shirt',
    },
    {
      id: 4,
      timestamp: 1656364800000,
      price: 30,
      category: 'Electronics',
      itemName: 'Headphones',
    },
    {
      id: 5,
      timestamp: 1656105600000,
      price: 25,
      category: 'Clothing',
      itemName: 'Jeans',
    },
  ];

calculateTotalSpentByCategory(transactions);

module.exports = calculateTotalSpentByCategory;