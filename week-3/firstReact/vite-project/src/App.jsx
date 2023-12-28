import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let todoList = [1 , 3 , 4];
  

  const [obj, updateList] = useState(todoList);
  console.log(obj);
  return (
    <div>
        <button onClick={() => updateList((list) => {
          return ("duggu singh")
          })}>
            click here
          </button>
        <div>{obj}</div>
    </div>  
    )
}

export default App
