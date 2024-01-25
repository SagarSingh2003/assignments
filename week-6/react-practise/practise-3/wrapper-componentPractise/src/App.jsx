import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App(){

  return (
  <>
    <CardComponent innercomponent={TextComponent()}></CardComponent>
  </>)
}

function TextComponent(){
  return (
    <div>
      hi there
    </div>
  )
}

function CardComponent({innercomponent}){
  return(
    <div style={{border: "2px solid black"}}>
      {innercomponent}
    </div>
  )
}

export default App
