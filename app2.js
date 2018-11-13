let todoList = []
const myForm = document.addTodo;


//Get all todos from api
axios.get('https://api.vschool.io/marcus/todo/').then((response) => {
    todoList = response.data
    displayTodos(todoList)
})

//Post new Todo
const addNew = newTodo => {
    axios.post('https://api.vschool.io/marcus/todo/', newTodo).then(response => {
        todoList.push(response.data)
        displayTodos(todoList)
    })
    myForm.title.value = ''
}

//Delete a todo
const deleteTodo = id => {
    axios.delete('https://api.vschool.io/marcus/todo/' + id).then(response => {
        todoList = todoList.filter(todo => todo._id !== id)
        displayTodos(todoList);
    })
}

//Cross off features
const checkOff = (todo) => {
    // console.log(todo)
    let {_id, completed} = todo
    let todoBox = document.getElementById(todo._id)
    if(completed){
        uncross(todoBox)
        axios.put('https://api.vschool.io/marcus/todo/' + _id, {completed: !completed}).then(response => {
            console.log(response.data.completed)
            todoList.map((todos, i) => todos._id === _id ? todos.completed = !completed : null)
            // displayTodos(todoList)
        })
    }else {
        cross(todoBox)
        axios.put('https://api.vschool.io/marcus/todo/' + _id, {completed: !completed}).then(response => {
            console.log(response.data.completed)
            todoList.map((todos, i) => todos._id === _id ? todos.completed = !completed : null)
            // displayTodos(todoList)
        })
        todoBox.childNodes[7].onclick = () => deleteTodo(_id);
    }
}

const uncross = (todoBox) => {
    todoBox.childNodes[1].style.backgroundColor = 'white';
    todoBox.childNodes[3].style.textDecoration = 'none';
    todoBox.childNodes[7].style.display = 'none'
}

const cross = (todoBox) => {
    todoBox.childNodes[1].style.backgroundColor = 'grey';
    todoBox.childNodes[3].style.textDecoration = 'line-through';
    todoBox.childNodes[7].style.display = 'inline-block';
}


//Edit your todo
const editTodo = (id) => {
    let title = document.getElementById(id).childNodes[3]
    let newTitle = document.getElementById(id).childNodes[5]
    newTitle.value = title.textContent
    title.style.display = 'none'
    newTitle.style.display = 'inline-block'
    newTitle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter'){
            title.style.display = 'inline-block';
            title.textContent = newTitle.value;
            newTitle.style.display = 'none';
            axios.put('https://api.vschool.io/marcus/todo/' + id, {title: newTitle.value}).then(response => {
                todoList.map(todo => todo._id === id ? todo.title = newTitle.value : null)
                displayTodos(todoList)
            })
        }
    })
}


// Display your todos as they are added
const displayTodos = todoList => {
    document.getElementById('todo').innerHTML = '';
    todoList.forEach((todo, i) => {
        const todoDiv = document.createElement('div')
        document.getElementById('todo').appendChild(todoDiv)
        todoDiv.setAttribute('class', 'todoBox')
        todoDiv.setAttribute('id', todo._id)

        todoDiv.innerHTML += `
            <div class='check'></div>
            <h3>${todo.title}</h3>
            <input type="text" name="title" id="task" >
            <p>x</p>
        `
        if(todo.completed){
            cross(todoDiv)
            document.getElementById(todo._id).childNodes[7].onclick = () => deleteTodo(todo._id);
         } else {
            uncross(todoDiv)
         } 
        let currentDiv = document.getElementById(todo._id)
        currentDiv.childNodes[1].onclick = () => checkOff(todo)
        currentDiv.childNodes[3].ondblclick = () => editTodo(todo._id)
    });
}

myForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const newTodo = { title: myForm.title.value, completed: false }
    addNew(newTodo)
})

