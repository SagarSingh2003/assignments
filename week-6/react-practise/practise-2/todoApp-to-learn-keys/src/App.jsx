import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

let counter = 4;

function App(){

  const [state , setState] = useState([{id : 1 , "title" : "t1" , "description" : "todo1"} , {id : 2 , "title" : "t2" , "description" : "todo2" } , {id : 3 , "title" : "t3" , "description" : "todo3"}])
  
  let element = [];

    for(let i = 0 ; i < state.length ; i++ ){

      element.push(<Todo key={state[i].id} id={state[i].id}title={state[i].title} description={state[i].description}/>)      

    }

  
function addTodo(){
    setState([...state , { id : counter , "title" : `this ${counter}` , "description" : "todo4"}])
    counter++
}

  return (
    <>
      <button onClick={addTodo}>Create Todo</button>
      {[...element]}
    </>
  )
}


function Todo({title , description}){
    return (
      <div>
        <span>title : {title}</span><br></br>
        <span>description: {description}</span>
      </div>
    )
  
}

export default App
