// import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ReactDOM from 'react-dom/client'
import React from 'react'

// You have been given the code of a purely frontend TODO app
// You have to fill in the following functions - 
//  - addTodoToDom
//  - removeTodoFromDom
//  - updateTodoInDom
//  - updateState

// These 4 functions comprise of what it means to create a library like React.
// The goal is the following - 
// 1. Any time the updateState function is called with a new state, the updateState function calculates the diff between newTodos and oldTodos and call `addTodoToDom`, `removeTodoFromDom` or `updateState` based on the calculated diff.
// 2. They id of a todo uniquely identifies it. If the title of a todo with the same id changes in two iterations, updateTodoInDom should be called for it.
// 3. The structure of the state variable looks something like this - 
// ```js
//     const todos = [{
//         title: "Go to gym",
//         description: "Go to gym from 7-8PM",
//         id: 1
//     }]
// ```


let globalId = 1;
let todoState = [];
let oldTodoState = [];


let thisElementisToBeRemoved = '';
let rootElement = 'todos';


export default function addTodo() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const id = document.getElementById("id").value;
  console.log(title ,description , id);

  const TodoExists = todoState.findIndex(obj => obj.id === id && obj.title === title && obj.description === description);

  if(TodoExists < 0){
    todoState.push({
        title: title,
        description: description,
        id: id 
      })

    console.log('this is a todoState : ' , todoState);
    updateState(todoState);
  }else{
    console.log("duplicate todo entered");
  }
  
}


  // this calculates the state difference and gives us the 
function updateState(newTodos) {
    // calculate the diff b/w newTodos and oldTodos.
    // More specifically, find out what todos are - 
    // 1. added
    // 2. deleted
    // 3. updated
    const added = [];
    const deleted = [];
    const updated = [];
  
  //   Case 1 : (none new todo matches);
  //   oldTodoState = [{id : 1 , title : hi , description : saay hello to someone} , { id : 2 , title : hola , description : hola amigos}]
  //   newTodos = [{id : 1 , title : hi , description : saay hello to someone} , { id : 2 , title : hola , description : hola amigos} , {id : 3 , title : eeee , description: drink potato shake} ]
    
  
  // Case 2 : (only an id matches but title or desc is diff);
  // oldTodoState = [{id : 1 , title : hi , description : saay hello to someone} , { id : 2 , title : hola , description : hola amigos}]
  // newTodos = [{id : 1 , title : hi , description : saay hello to someone} , { id : 2 , title : hola , description : hola amigos} , {id : 2 , title : eeee , description: hola amigos} ]
  // todoState= [{id : 1 , title : hi , description : saay hello to someone}, {id : 2 , title : eeee , description: hola amigos}]
  
  // Case 3 : (if the todo passed is the same with the same id)
  //   oldTodoState = [{id : 1 , title : hi , description : saay hello to someone} , { id : 2 , title : hola , description : hola amigos}]
  //   newTodos = [{id : 1 , title : hi , description : saay hello to someone} , { id : 2 , title : hola , description : hola amigos}]
  //   todoState = [{id : 1 , title : hi , description : saay hello to someone} , { id : 2 , title : hola , description : hola amigos}]
  
    //user will  tell the id , title and  desc , based on that we have to check if any todo has to be added , or updated , and if the updated todo is rendered so the old todo has to be deleted.
    if(oldTodoState.length === 0){
      added.push(newTodos[0])
    }else{
      for(let newTodo of newTodos){
          let idFound = false;
          for(let oldTodo of oldTodoState){
              
              if( oldTodo.id === newTodo.id){
                  if(oldTodo.title === newTodo.title && oldTodo.description === newTodo.description){
                      console.log("todo matched old todo :" , oldTodo ,"new Todo : " , newTodo );
                      idFound = true;
                      break;
                  }else{
                      //update the newTodo in the dom
                      // delete the oldTodo in the dom
                      // update the state by adding the newTodo in the todoState and removing the oldTodo from the todoState
                      
                      added.push(newTodo);
                      deleted.push(oldTodo);
                      const indexOfOldTodo = todoState.findIndex(obj => obj.id === oldTodo.id);
                      console.log(indexOfOldTodo , "is the index to be removed");
                      if(indexOfOldTodo === 0){
                          todoState.shift();
                          console.log("this is todoState: " , todoState);
                          idFound = true;
                          break;
                      }else{
                        todoState.splice(indexOfOldTodo , 1);
                        console.log("after splicing" , todoState);
                        console.log("this is the updated todoState : " , todoState);       
                        idFound = true;
                        break;
                      }
                  }
              }
              
          }
  
          // if id not found then we push it into the added one;
          if(!idFound){
              console.log("this todo is pushed because the id was new : " , newTodo);
              added.push(newTodo);
          }
          
      }
  
    }
    
    //updating the oldTodoState
  
    oldTodoState = [];
    for( let eachTodo of todoState){
          oldTodoState.push(eachTodo);
    }
    console.log("this is the new oldTodoState : " , oldTodoState);
    console.log("this is deleted", deleted);
    if(deleted.length != 0){
      thisElementisToBeRemoved = removeTodoFromDom(deleted[0]);

    console.log(thisElementisToBeRemoved , '***************************+++++++++++++++');
      console.log("deleted from dom : " , deleted[0]);
    }
    console.log("this is added", added);
    AddTodoToDom(added['0']);
    console.log('thiss is *************************' , added['0']);
    console.log("addedTodoToDom");
    console.log("this is the updated todoState : " , todoState); 

    console.log(thisElementisToBeRemoved , '***************************');
    if (thisElementisToBeRemoved){
      console.log(thisElementisToBeRemoved , '***************************');
      const removeRoot = ReactDOM.createRoot(document.getElementById(`${thisElementisToBeRemoved}`)) 
      removeRoot.unmount();
    }

  }
  


function AddTodoToDom(added){
    console.log(added , "this is added.... message from inside the component");

    const todos = ReactDOM.createRoot(document.getElementById(`${rootElement}`));
    rootElement = rootElement + 1;

    todos.render(
      <React.StrictMode>
            <div>
              <section id={added.id}>
                <p>Id : {added.id}</p>
                <p>title : {added.title}</p>
                <p>description : {added.description}</p>
                <button onClick={() => markAsDone(added.id)}>Mark As Done</button>
              </section>
            </div>
            <div id={rootElement}></div>
      </React.StrictMode>,
    )

    // return (
    //   <>
    //   </>
    
    // )
  }

function removeTodoFromDom(deleteThis){
    const idToBeRemoved = deleteThis.id;
    if(idToBeRemoved){
      return idToBeRemoved
    }else{
      return null;
    }
}

// export {addTodoToDom , removeTodoFromDom};


//REACTTTTTTTTTTTTTTTTTTTTTT DOMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM *************************************

function markAsDone(id){
  console.log('got the id : ' , id);
  document.querySelector(`section[id = "${String(id)}"] > button`).innerHTML = "DONE!!!!";
  console.log("id : " , id , " Marked as Doneee")
}


