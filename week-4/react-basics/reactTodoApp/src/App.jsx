import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {renderElementsOnDom} from './main.jsx'
import './App.css'

let counter = 1;
const TodoTitle = document.getElementById("todoTitle").value;
const TodoDesc = document.getElementById("todoDesc").value;

function markAsDone(){
  document.getElementById("counter").innerHTML = "DONE !";
  counter += 1;
}

export class App {
    constructor(todoDesc , todoTitle){
      this.todoTitle = todoTitle;
      this.todoDesc = todoDesc;
      this.render = () => {
        renderElementsOnDom(
          <div>
            <span>Todo Title : {TodoTitle}</span>
            <span>Todo Title : {TodoDesc}</span>
            <button onClick={() => {markAsDone()}} id='counter'>Mark As DONE!</button>
          </div>
        )
      }
    }

}





