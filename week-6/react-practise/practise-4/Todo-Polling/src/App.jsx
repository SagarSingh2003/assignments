import { useState  , useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


//send request to the server , get a response 
// update the state
// render the updated state
// back to step one , with a time gap of 5 seconds


function App() {

  const [state , setState] = useState([]);



    // const element = state.map((todo) => <Todo key={todo.id} title={todo.title} description={todo.description}></Todo>)
    // return element  ;
     

    

      useEffect(() => {
        
        setInterval(() => {

          async function getTodoandUpdate(){

            const todosArr = await getTodos();
            
              setState(todosArr);
            
          };
          getTodoandUpdate();
        } , 5000);
          // const todosArr = [{title : "go home" , description : "don't ever come back" , id : 3}]
                
                
      } , []);


      // useEffect(() => {
      //     async function getTodoandUpdate(){

      //       const todosArr = await getTodos();
      //       setTimeout(() => {
      //         setState(todosArr);
      //       }, 5000)
      //     };
      //     getTodoandUpdate();

      //     // const todosArr = [{title : "go home" , description : "don't ever come back" , id : 3}]
  
      // } , state);

    const element = state.map((todo) => <Todo key={todo.id} title={todo.title} description={todo.description}></Todo>)
    return element;
}


async function getTodos(){
    let todosArr ;

    const res = await fetch('https://sum-server.100xdevs.com/todos')
    const json = await res.json();
    todosArr = json.todos;
    console.log('called');
    return todosArr;
}




function Todo({title , description}){
  return(
    <>
    <h3>
      {title}
    </h3>
    <h5>
      {description}
    </h5>
    </>
  )
} 
export default App
