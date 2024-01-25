import React , { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



const Header = React.memo(function ({title}){
  console.log(title);
    return (
      <div>
        {title}
      </div>
    )
})


const HeaderAndButton = React.memo(function (){

    const [state , setState] = useState("my name is sagar");

    function clickToChange(){

          const randomNumber = Math.random();

          let newState = `My name is ${randomNumber}` 
          setState(newState);
        
    }

    return (
      <>
          <button onClick={() => clickToChange()}>Click me to change the title</button>
          <Header title={state}/>
      </>  
    )
})

function App(){

  return (
    <>
      <HeaderAndButton/>
      <Header title={"my name is raman"}/>
    </>
  )
}

export default App
