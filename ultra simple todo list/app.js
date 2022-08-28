//objects
const todoinput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
let todos;

//event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodos);

//functions
function addTodo(event){

    //prevent refresh
    event.preventDefault();
    
    //create new div and add todo class
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //create list
    const newtodo = document.createElement('li');
    //set value of list based on input
    newtodo.innerText = todoinput.value;
    newtodo.classList.add('todo-item');
    //append to the div
    todoDiv.appendChild(newtodo);

    //save to local storage
    saveLocal(todoinput.value);

    //create complete buttuon, add icon, append to div
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fa-solid fa-square-check"></i>';
    completeButton.classList.add('complete-btn');
    todoDiv.appendChild(completeButton);

    //create delete button, add icon, append to div
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteButton.classList.add('delete-btn');
    todoDiv.appendChild(deleteButton);

    //append the div to main list
    todoList.appendChild(todoDiv);
    
    //after creating a todo, clear the input box
    todoinput.value = '';
}

//delete task
function deleteCheck(e){

    const item = e.target;
    if(item.classList[0] === 'delete-btn')
    {
        const todo = item.parentElement;
        //add animation
        todo.classList.add('fall');
        //remove from local storage
        removeLocal(todo);
        //wait for the animation to end
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
    }

    //complete button pressed
    if(item.classList[0] === 'complete-btn')
    {
        const todo = item.parentElement;
        //change the class to "completed"
        todo.classList.toggle("completed");
    }
}

//filtering
function filterTodos(e){

    const todoarray = todoList.childNodes;
    todoarray.forEach(function(todo){
        //check for actual value
        if(todo.nodeType == Node.ELEMENT_NODE)
        {
            switch(e.target.value){
                case "all":
                    todo.style.display = "flex";
                    break;
                case "completed":
                    if(todo.classList.contains("completed")){
                        todo.style.display = "flex";
                    }
                    else{
                        todo.style.display = "none";
                    }
                    break;
                case "incomplete":
                    if(!todo.classList.contains("completed")){
                        todo.style.display = "flex";
                    }
                    else{
                        todo.style.display = "none";
                    }
                    break;
            }
        }
    });
}

//save to local storage
function saveLocal(todo){

    checkLocalStoarge();
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

//get tasks from local storage after refresh or loading
function getTodos(){

    checkLocalStoarge();

    //create tasks again from local storage values
    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
    
        const newtodo = document.createElement('li');
        newtodo.innerText = todo;
        newtodo.classList.add('todo-item');
        todoDiv.appendChild(newtodo);
    
        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="fa-solid fa-square-check"></i>';
        completeButton.classList.add('complete-btn');
        todoDiv.appendChild(completeButton);
    
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteButton.classList.add('delete-btn');
        todoDiv.appendChild(deleteButton);
    
        todoList.appendChild(todoDiv);
    })
}

//remove from local storage
function removeLocal(todo){

    checkLocalStoarge();
    //get index of the task for which delete button was clicked
    const todoindex = todo.children[0].innerText;
    //remove from array
    todos.splice(todos.indexOf(todoindex), 1);
    //push array into local stoarage
    localStorage.setItem("todos", JSON.stringify(todos));
}

function checkLocalStoarge(){
    if(localStorage.getItem('todos') === null){
        //no array there? create one
        todos = [];
    }
    else{
        //array exists? add to that
        todos = JSON.parse(localStorage.getItem('todos'));
    }   
}