console.log("This is ES6 version of Project 2");
showTodo();

function showTodo() {
  let getTodos = localStorage.getItem("todos");
  let todoObj;
  if (getTodos === null) {
    todoObj = [];
  } else {
    todoObj = JSON.parse(getTodos);
  }
  console.log("display", todoObj);
  let addRow = "";
  todoObj.forEach(function (element, index) {
    addRow += `<tr class="tableRow">
                  <td>${element.name}</td>
                  <td>${element.priority}</td>
                  <td>${element.status}</td>
                  <td><button onclick="editTodo(${index})" class="edit"><i class="fa fa-edit"></i></button></td>
                  <td><button id="${index}" onclick="deleteTodo(this.id)" class="delete"><i class="fa fa-trash-o"></i></button></td>
              </tr>`;
  });
  let tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";
  if (todoObj.length == 0) {
    tableBody.innerHTML = "";
  } else {
    tableBody.innerHTML = addRow;
  }
}

function showTodoFilter() {
  let getTodos = localStorage.getItem("todosFilter");
  let todoObj;
  if (getTodos === null) {
    todoObj = [];
  } else {
    todoObj = JSON.parse(getTodos);
  }
  console.log("display", todoObj);
  let addRow = "";
  todoObj.forEach(function (element, index) {
    addRow += `<tr class="tableRow">
                  <td>${element.name}</td>
                  <td>${element.priority}</td>
                  <td>${element.status}</td>
                  <td><button onclick="editTodo(${index})" class="edit"><i class="fa fa-edit"></i></button></td>
                  <td><button id="${index}" onclick="deleteTodo(this.id)" class="delete"><i class="fa fa-trash-o"></i></button></td>
              </tr>`;
  });
  let tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";
  if (todoObj.length == 0) {
    tableBody.innerHTML = "";
  } else {
    tableBody.innerHTML = addRow;
  }
}

function deleteTodo(index) {
  let getTodos = localStorage.getItem("todos");
  let todoObj;
  if (getTodos === null) {
    todoObj = [];
  } else {
    todoObj = JSON.parse(getTodos);
  }
  todoObj.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todoObj));
  showTodo();
}

function editTodo(index) {
  let addBtn = document.getElementById("add");
  let saveBtn = document.getElementById("save");
  let saveIndex = document.getElementById("saveIndex");
  saveIndex.value = index;

  let getTodos = localStorage.getItem("todos");
  let todoObj = JSON.parse(getTodos);

  let name = document.getElementById("name");
  let priority = document.getElementById("priority");
  let status = document.getElementById("status");

  name.value = todoObj[index].name;
  priority.value = todoObj[index].priority;
  status.value = todoObj[index].status;
}

class Todo {
  constructor(name, priority, status, priorityLevel) {
    this.name = name;
    this.priority = priority;
    this.status = status;
    this.priorityLevel = priorityLevel;
  }
}

class Display {
  add(todo) {
    let getTodos = localStorage.getItem("todos");
    let todoObj;
    if (getTodos === null) {
      todoObj = [];
    } else {
      todoObj = JSON.parse(getTodos);
    }
    let index = todoObj.findIndex((name) => name.name === todo.name);
    if (index === -1) {
      todoObj.push(todo);
    } else {
      todoObj.splice(index, 1, todo);
    }

    console.log("add", todoObj);
    localStorage.setItem("todos", JSON.stringify(todoObj));

    showTodo();
  }

  clear() {
    let todoForm = document.getElementById("todoForm");
    todoForm.reset();
  }

  validate(todo) {
    if (todo.name.length < 2) {
      return false;
    } else {
      return true;
    }
  }

  show(type, displayMessage) {
    let message = document.getElementById("message");
    let boldText;
    if (type === "success") {
      boldText = "Success";
    } else {
      boldText = "Error!";
    }
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;
    setTimeout(function () {
      message.innerHTML = "";
    }, 2000);
  }
}

let todoForm = document.getElementById("todoForm");
todoForm.addEventListener("submit", todoFormSubmit);

function todoFormSubmit(e) {
  let name = document.getElementById("name").value;
  let priority = document.getElementById("priority").value;
  let status = document.getElementById("status").value;
  priorityLevel = ["low", "medium", "high"];
  let todo = new Todo(name, priority, status, priorityLevel.indexOf(priority));
  console.log("form submit", todo);

  let display = new Display();

  if (display.validate(todo)) {
    display.add(todo);
    display.clear();
    display.show("success", "Your todo has been successfully added");
  } else {
    // Show error to the user
    display.show("danger", "Sorry you cannot add this todo");
  }

  e.preventDefault();
}

let saveBtn = document.getElementById("save");
saveBtn.addEventListener("click", function () {
  let getTodos = localStorage.getItem("todos");
  let todoObj = JSON.parse(getTodos);
  let saveIndex = document.getElementById("saveIndex").value;

  let name = document.getElementById("name");
  let priority = document.getElementById("priority");
  let status = document.getElementById("status");

  todoObj[saveIndex].name = name.value;
  todoObj[saveIndex].priority = priority.value;
  todoObj[saveIndex].status = status.value;

  console.log("save button", todoObj);

  localStorage.setItem("todos", JSON.stringify(todoObj));
});

function lowToHigh() {
  let getTodos = localStorage.getItem("todos");
  let todoObj;
  if (getTodos === null) {
    todoObj = [];
  } else {
    todoObj = JSON.parse(getTodos);
  }
  todoObj = todoObj.sort((a, b) => {
    return a.priorityLevel - b.priorityLevel;
  });
  if (statusFilter.value !== "none") {
    todoObj = todoObj.filter(
      (progress) => progress.status === statusFilter.value
    );
  }
  console.log("lowTohigh", todoObj);
  localStorage.setItem("todosFilter", JSON.stringify(todoObj));
  showTodoFilter();
}

function highToLow() {
  let getTodos = localStorage.getItem("todos");
  let todoObj;
  if (getTodos === null) {
    todoObj = [];
  } else {
    todoObj = JSON.parse(getTodos);
  }
  todoObj = todoObj.sort((a, b) => {
    return b.priorityLevel - a.priorityLevel;
  });
  if (statusFilter.value !== "none") {
    todoObj = todoObj.filter(
      (progress) => progress.status === statusFilter.value
    );
  }
  console.log("highToLow", todoObj);
  localStorage.setItem("todosFilter", JSON.stringify(todoObj));
  showTodoFilter();
}

let priorityFilter = document.getElementById("priorityFilter");
priorityFilter.addEventListener("change", (e) => {
  if (priorityFilter.value === "Low to High") {
    lowToHigh();
  }
  if (priorityFilter.value === "High to Low") {
    highToLow();
  }
});

let statusFilter = document.getElementById("statusFilter");
statusFilter.addEventListener("change", (e) => {
  let getTodos = localStorage.getItem("todos");
  let todoObj;
  if (getTodos === null) {
    todoObj = [];
  } else {
    todoObj = JSON.parse(getTodos);
  }
  if (statusFilter.value !== "none") {
    todoObj = todoObj.filter(
      (progress) => progress.status === statusFilter.value
    );
  }

  console.log("statusfiter", todoObj);
  localStorage.setItem("todosFilter", JSON.stringify(todoObj));
  showTodoFilter();
});
