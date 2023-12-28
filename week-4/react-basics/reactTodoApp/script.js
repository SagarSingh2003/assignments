import {App} from './src/App'

// function logHello(){
//     console.log('hello');
// }




console.log('getting here');

export function create(){
    
    const todoTitle = document.getElementById("todoTitle").value;
    const todoDesc = document.getElementById("todoDesc").value;

    const element = new App(todoDesc , todoTitle)
    console.log(element.todoTitle , element.todoDesc);
    element.render();

}