import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { addTodoToDom ,removeTodoFromDom } from './App.jsx'

const todos = ReactDOM.createRoot(document.getElementById('todos'));


todos.render(
  <React.StrictMode>
    <addTodoToDom/>
  </React.StrictMode>,
)

if (removeTodoFromDom){
  const removeRoot = ReactDOM.createRoot(document.getElementById(`${removeTodoFromDom}`)) 
  removeRoot.unmount();
}
