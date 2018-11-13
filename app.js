
//Old way of doing it


var todo = document.getElementById('todo');
var current = [];
var total = 0;
var run = false;

axios.get("https://api.vschool.io/marcus/todo").then(response=>{
    current = response.data;
    displayData(current);
})
document.addTodo.addEventListener('submit', (e)=>{
    e.preventDefault()
    var newTodo = {
        title: document.addTodo.title.value,
        description: document.addTodo.description.value,
        price: document.addTodo.price.value
    }
    
    axios.post("https://api.vschool.io/marcus/todo",newTodo).then(response=>{
        console.log('Successfully Posted Item');
        run = true
        displayData(response.data)
        current.push(response.data)
    })
    clearInputs()

})

var deleteTodo = (id, i) => {
    axios.delete("https://api.vschool.io/marcus/todo/" + id).then(response=>{
        console.log('Successfully Deleted Item')
        current.splice(current.indexOf(i), 1)
        displayData(id)
    })
}


function displayData(data){
    if(data.length > 0 && total === 0){
        total++;
        
        data.map((d,i)=>{
            
        var h1 = document.createElement('H1')
        h1.innerHTML = d.title;
            
        var h3d = document.createElement('H3')
        h3d.innerHTML = d.description;
            
        var h3p = document.createElement('H3')
        h3p.innerHTML = d.price;
            
        var del = document.createElement('BUTTON')
        del.innerHTML = 'X';
        del.onclick = () => deleteTodo(d._id, i);

        var edit = document.createElement('BUTTON')
        edit.innerHTML = 'edit';
        edit.onclick = () => editTodo('f' + d._id, d._id);
            
        var div = document.createElement('DIV')
        div.setAttribute('index', i)
        div.setAttribute('id', d._id)
        
        
        
        var formDiv = document.createElement('FORM')
        formDiv.setAttribute('name', 'f' + d._id)

        
        var formTitle = document.createElement('INPUT')
        formTitle.value = d.title;
        
        var formDesc = document.createElement('INPUT')
        formDesc.value = d.description;
        
        var formPrice = document.createElement('INPUT')
        formPrice.value = d.price;
        
        var formEdit = document.createElement('BUTTON')
        formEdit.innerHTML = 'save';
        formEdit.onclick = () => editTodo('f' + d._id, d._id);
        
        todo.appendChild(div)
        todo.appendChild(formDiv)
        formDiv.style.display = 'none';
        
        formDiv.appendChild(formTitle)
        formDiv.appendChild(formDesc)
        formDiv.appendChild(formPrice)
        formDiv.appendChild(formEdit)
        
        
        div.appendChild(h1)
        div.appendChild(h3d)
        div.appendChild(h3p)
        div.appendChild(edit)
        div.appendChild(del)
    })
    }else if(total > 0  && typeof data === 'string'){
        
        document.getElementById(data).remove();
        
    }else if(run) {
        total++
        
        var h1 = document.createElement('H1')
        h1.innerHTML = data.title;
        
        var h3d = document.createElement('H3')
        h3d.innerHTML = data.description;
        
        var h3p = document.createElement('H3')
        h3p.innerHTML = data.price;
        
        var del = document.createElement('BUTTON')
        del.innerHTML = 'X';
        del.onclick = () => deleteTodo(data._id);
        
        var edit = document.createElement('BUTTON')
        edit.innerHTML = 'edit';
        edit.onclick = () => editTodo('f' + data._id, data._id);
        console.log(data._id)

        var div = document.createElement('DIV')
        div.setAttribute('index', current.length)
        div.setAttribute('id', data._id)
        
        
        var formDiv = document.createElement('FORM')
        formDiv.setAttribute('name', 'f' + data._id)
        
        var formTitle = document.createElement('INPUT')
        formTitle.value = data.title;
        
        var formDesc = document.createElement('INPUT')
        formDesc.value = data.description;
        
        var formPrice = document.createElement('INPUT')
        formPrice.value = data.price;
        
        var formEdit = document.createElement('BUTTON')
        formEdit.innerHTML = 'save';
        formEdit.onclick = () => editTodo('f' + data._id, data._id);
        
        todo.appendChild(div)
        todo.appendChild(formDiv)
        formDiv.style.display = 'none';
        
        formDiv.appendChild(formTitle)
        formDiv.appendChild(formDesc)
        formDiv.appendChild(formPrice)
        formDiv.appendChild(formEdit)
        
        div.appendChild(h1)
        div.appendChild(h3d)
        div.appendChild(h3p)
        div.appendChild(edit)
        div.appendChild(del)
        
        
        
    }
    
}

function editTodo (formId, divId){
    var formDiv = document[formId]
//    var formDiv2 = document.f5af0b5c5eec94d291400b37b
    console.log(formDiv)
    // console.dir(formDiv2)
    var div = document.getElementById(divId)
    if (formDiv.style.display === 'none'){
        formDiv.style.display = 'block';
        div.style.display = 'none';
        
        document.formDiv
        
        axios.put('https://api.vschool.io/marcus/todo/'+divId, updatedTodo).then(response=>{
            console.log(response)
        })
        
    }else{
        formDiv.style.display = 'none';
        div.style.display = 'block';
    }
}

function clearInputs(){
        document.addTodo.title.value = ''
        document.addTodo.description.value = ''
        document.addTodo.price.value = ''
}
