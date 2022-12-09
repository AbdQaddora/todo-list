const addBtn = document.getElementById("add");
const saveBtn = document.getElementById("save");
const cancelBtn = document.getElementById("cancel");

const titleInput = document.querySelector(".title-input");
const descInput = document.querySelector(".desc-input");

const disabledFooter = document.querySelector("footer.disabled");
const activeFooter = document.querySelector("footer.active");


const todos = document.querySelector(".todos");

// get all posts
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
        JSON.parse(xhr.response);
        const todosArray = JSON.parse(xhr.response).map(el => {
            return {
                title: el.title,
                desc: el.body
            }
        });
        showArrayOfTodos(todosArray);
    }
}

const createTodoCard = (title, desc) => {
    const todo = document.createElement('div');
    todo.classList.add("todo");
    todo.innerHTML = `
        <h2 class="todo-title">${title}</h2>
        <p class="todo-content">${desc}</p>
`
    return todo
}


const showArrayOfTodos = (arr) => {
    arr.forEach(todo => {
        todos.appendChild(createTodoCard(todo.title, todo.desc))
    });
}



xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");
xhr.send();


addBtn.addEventListener('click', () => {
    disabledFooter.style = 'display: none';
    activeFooter.style = 'display: block';
    todos.style = 'padding-bottom: 0px;'
    todos.scrollTo(0, todos.scrollHeight);
});

cancelBtn.addEventListener('click', () => {
    disabledFooter.style = 'display: flex';
    activeFooter.style = 'display: none';
    todos.style = 'padding-bottom: 100px;'
    todos.scrollTo(0, 0);
});

saveBtn.addEventListener('click', () => {
    const title = titleInput.value;
    const desc = descInput.value;
    if (title === "") {
        titleInput.style = 'outline: 1px solid #f00;'
    } else {
        titleInput.style = 'outline: 1px solid transparent;'
    }

    if (desc === "") {
        descInput.style = 'outline: 1px solid #f00;'
    } else {
        descInput.style = 'outline: 1px solid transparent;'
    }

    if (title !== "" && desc !== "") {
        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: 'POST',
            body: JSON.stringify({
                userId: 1,
                title: title,
                body: desc
            })
        }).then(res => {
            console.log(res);
            todos.appendChild(createTodoCard(title, desc))
            todos.scrollTo(0, todos.scrollHeight);
            titleInput.value = ""
            descInput.value = ""
            todos.style = 'padding-bottom: 100px;';
            disabledFooter.style = 'display: flex';
            activeFooter.style = 'display: none';
        })
    }
});