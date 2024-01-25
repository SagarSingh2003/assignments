import React , { useState  , useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [id , setId] = useState(1);

  
  function setState(id){
    setId(id);
  }

  return (
    <div>
      <button onClick={() => {setState(1)}}>1</button>
      <button onClick={() => {setState(2)}}>2</button>
      <button onClick={() => {setState(3)}}>3</button>
      <button onClick={() => {setState(4)}}>4</button>
      <Todo id={id}></Todo>
    </div>
  )
  
}


function Todo({id}){

  const [todos , setTodo] = useState({});

  
  
  let todo;
  
  console.log('id is : ' , id);
  
  
  
  useEffect(() => {
    console.log('swagat nahi karoge hamara?')
    fetch(`https://sum-server.100xdevs.com/todo?id=${id}`).then(async (res) => {
      const json = await res.json();
      todo = json.todo ;
      console.log(todo);
      setTodo({title : todo.title , description : todo.description});   
    })
  } , [id])

  
    return (
      
      <div>
        Id : {id}
        <h3>{todos.title}</h3>
        <h5>{todos.description}</h5>
      
      </div>
    )
  

}

export default App
