let counter = 0;

window.setInterval(async function(){
    const res = await fetch('https://sum-server.100xdevs.com/todos')
    const todoList = await res.json();
    console.log(res);
    UpdateDomAccToState(todoList);
} , 5000);


function UpdateDomAccToState(todoList){
    for(let i = 0 ; i < todoList.todos.length; i++){
        console.log(todoList.todos[i]);
        let todoName = todoList.todos[i].title;
        let todoDesc = todoList.todos[i].descripton;
        console.log("this is todoName: " , todoName);
        console.log(todoDesc);
        createTodoAndDisplay(todoName , todoDesc);
    }  

}
function createTodoAndDisplay(todoName , todoDesc){
        
    counter += 1;

    // let todoName = document.getElementById("todoName").value;
    // let todoDesc = document.getElementById("todoDesc").value;   

    const para= document.createElement("p");
    const para2 = document.createElement("p");
    const element = document.getElementById("showTodos");
    

    const nodePara = document.createTextNode(todoName);    
    para.appendChild(nodePara);
    element.appendChild(para);
    
    
    const nodePara2 = document.createTextNode(todoDesc);
    para2.setAttribute("class" , "todoDesc");
    para2.appendChild(nodePara2);
    element.appendChild(para2);

    const inputBtn = document.createElement("BUTTON");
    inputBtn.setAttribute("id" , `inputDone${counter}`);
    inputBtn.setAttribute("onclick" , `statusDone(${counter})`);
    const nodeButton = document.createTextNode("Mark As Done");
    
    inputBtn.appendChild(nodeButton);
    element.appendChild(inputBtn);

}

function statusDone(counter){
    console.log("gettinghere")
    document.getElementById(`inputDone${counter}`).innerHTML = "Done";
}