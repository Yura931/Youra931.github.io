const loginForm = document.querySelector(".form-box");
const loginBtn = document.querySelector("#loginBtn");
const todoListForm = document.querySelector(".todo-box");
const todoAddBtn = document.querySelector(".add-button");
const completeBtn = document.getElementById("completeBtn");
const incompleteBtn = document.getElementById("incompleteBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const todoUl = document.querySelector(".todos");
const logoutBtn = document.getElementById("logoutBtn");

const USER_KEY = "user";
const TODO_KEY = "todo";
const NONE_CLASS = "display-none";

getUserInfo();
function getUserInfo() {
    const userInfo = localStorage.getItem(USER_KEY);
    if(userInfo !== null) {
        todoListForm.classList.remove(NONE_CLASS);
        loginForm.classList.add(NONE_CLASS);
        document.querySelector(".todo-box h1").innerText = `${userInfo}의 ToDo List`;
    } else {
        loginForm.classList.remove(NONE_CLASS);
        todoListForm.classList.add(NONE_CLASS);
    }
}

function loginBtnClick(event) {
    event.preventDefault();
    const loginId = document.getElementById("loginId");
    if(loginId.value === null || loginId.value === "") {
        alert("이름을 입력해주세요.");
        return loginId.focus();
    }
    localStorage.setItem(USER_KEY, loginId.value);
    getUserInfo();
    loginId.value = "";
}
loginBtn.addEventListener("click", loginBtnClick);


// todolist
let todoList = [];

getTodoList();
function getTodoList() {
    const todoInfo = JSON.parse(localStorage.getItem(TODO_KEY));
    if(todoInfo !== null) {
        todoInfo.forEach(element => {
            painteTodoList(element);
        });
        todoList = todoInfo;
    }
}

function savedTodos() {
    localStorage.setItem(TODO_KEY, JSON.stringify(todoList));
}

function painteTodoList(todo) {
    const todos = document.querySelector("ul.todos");
    const li = document.createElement("li");

    li.classList.add("todo");
    const label = document.createElement("label");
    label.setAttribute("for", todo.id);
    const input = document.createElement("input");
    input.id = todo.id;
    input.type = "checkbox";
    if(todo.complete === 'Y') {
        input.setAttribute("checked", "checked");
    }
    const span = document.createElement("span");
    span.innerText = todo.text;
    const button = document.createElement("button");
    button.setAttribute("data-id", todo.id);
    button.innerText = "x";
    button.setAttribute("class", "delete-btn");

    label.appendChild(input);
    label.appendChild(span);
    li.appendChild(label);
    li.appendChild(button);
    todos.appendChild(li);

    input.addEventListener("click", completeCheck);
    button.addEventListener("click", deleteBtnClick);
}

function completeChange(targetId, flag) {
    targetId = parseInt(targetId);
    todoList = todoList.reduce((pre, cur, idx) => {
        if(cur.id == targetId) {
            if(flag) {
                cur.complete = "Y";
            } else {
                cur.complete = "N";
            }
        }
        pre.push(cur);
        return pre;
    }, []);
    savedTodos(todoList);
}

function completeCheck(event) {
    console.log(event.target.checked);
    const target = event.target;
    const targetId = target.getAttribute("id");
    completeChange(targetId, event.target.checked);
}

function deleteBtnClick(event) {
    event.preventDefault();
    const parentEl = event.target.parentElement;
    const delId = event.target.getAttribute("data-id");
    parentEl.remove();
    todoList = todoList.filter(el => {
        el.id !== delId
    });
    savedTodos();
}

function addBtnClick(event) {
    event.preventDefault();
    const todoText = document.getElementById("todoText");
    if(todoText.value == null || todoText.value == "") {
        alert("오늘의 할일을 적어보세요~");
        return todoText.focus();
    }
    const newTodoObj = {
        id: Date.now(),
        text: todoText.value,
        complete: "N"
    }
    todoList.push(newTodoObj);
    painteTodoList(newTodoObj);
    todoText.value = "";
    todoText.focus();
    savedTodos();
    completeListPaint(event);
}

function completeListPaint(event) {
    const compFilter = document.querySelectorAll(".filter");
    const compBtn = event.target;
    compFilter.forEach((el) => {
        if(el !== compBtn) {
            el.classList.remove("active");
        }
    })
    compBtn.classList.toggle("active");
    let compList = [];
        compList = todoList;
        compList = compList.reduce((pre, cur) => {
            if(completeBtn.classList.contains("active")) {
                if(cur.complete === "Y") {
                    pre.push(cur);
                }
            } else if(incompleteBtn.classList.contains("active")) {
                if(cur.complete === "N") {
                    pre.push(cur);
                }
            } else {
                pre.push(cur);
            }
            
            return pre;
        }, []);
        compList = compList;
   
    
    todoUl.innerHTML = "";
    compList.forEach((el) => painteTodoList(el));
}


function deleteAllBtnClick(event) {
    if(confirm("Todo List 목록 전체를 삭제하시겠습니까?")) {
        localStorage.removeItem(TODO_KEY);
        todoUl.innerHTML = "";
        document.querySelectorAll(".filter").forEach((el) => {
            el.classList.remove("active");
        });
        todoList = [];
    }
}

todoAddBtn.addEventListener("click", addBtnClick);
completeBtn.addEventListener("click", completeListPaint);
incompleteBtn.addEventListener("click", completeListPaint);
deleteAllBtn.addEventListener("click", deleteAllBtnClick);

function logoutBtnClick(event) {
    if(confirm("로그아웃 하시겠습니까?")) {
        event.preventDefault();
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(TODO_KEY);
        todoList = [];
        todoUl.innerHTML = "";
        getUserInfo();
    }
};
logoutBtn.addEventListener("click", logoutBtnClick);


const bgImage = [
    "poppy-5397906_1920.jpg",
    "secret-3120483_1920.jpg",
    "hintersee-3601004_1920.jpg",
];

const chosenImage = bgImage[Math.floor(Math.random() * bgImage.length)];
document.body.style.backgroundImage = `url(./img/${chosenImage})`;

