import { useState , useMemo } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {


  const [count , setCount] = useState(0);
  const [inputVal , setInputVal] = useState(0);
  


  let sum = useMemo(function giveSumBack(){
    let num = inputVal;
    // console.log(Number(num))
    let Sum = 0;
    for(let i = 0 ; i <= Number(num) ; i++){
      Sum = Sum + i;
    }
    
    return Sum;

  } , [inputVal]);



  function setCounter(){

    setCount(count + 1);
     
  }

  
  


  
    return (
      <div>
        <input type="text" id="sumUptoThisNum" onChange={(e) =>{setInputVal(e.target.value)}}  required/>
        <span id="displayArea">Sum from 1 to {inputVal} is {sum}</span>
        <button onClick={setCounter}>Counter({count})</button>
      </div>
    )  




}


export default App
