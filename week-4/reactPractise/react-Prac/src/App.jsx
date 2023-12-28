import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {createRoot} from './main'




export function createElementsAndRender() {
  function App() {
    const [count, setCount] = useState(0)
  
    return (
      <div className='read-the-docs'>
      <span>hello world</span>
      <h1>hello world</h1>
      </div>
    )
  }

  createRoot(App);
  
}
