import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'


let root = ReactDOM.createRoot(document.getElementById('root'));

export function createRoot(App){

  console.log(App);
     root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}
