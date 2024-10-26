let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// Empty Array To Store The Tasks
let arrayOfTasks = [];

// Check If We HAve A Store

if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromLocalStorge();

// Part One Is Start
// Add Task
submit.onclick = function () {
  if (input.value !== "") {
    // Add Tasks To Array Of Tasks
    addTaskToArray(input.value);
    // Empty input Field
    input.value = "";
  }
};

//Click On Task Element

tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    // Remove Element From Page
    e.target.parentElement.remove();
    // Remove Task From Local Storge
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
  }
  // Task Element
  if (e.target.classList.contains("task")) {
    // Togle Completed For The Task
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    // Toggel if is Done
    e.target.classList.toggle("done");
  }
});

function addTaskToArray(taskText) {
  // Task Data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  // push Tasks To Array of Tasks
  arrayOfTasks.push(task);
  // Part Two Is Start
  // Add Task To Page
  addElementToPageFrom(arrayOfTasks);
  // Add Task To Local Storge
  addDataToLocalStorgeFrom(arrayOfTasks);
}
// Creat Function For arrayOfTasks

function addElementToPageFrom(arrayOfTasks) {
  // Empty Tasks Div
  tasksDiv.innerHTML = "";
  // Looping On arrayOfTasks
  arrayOfTasks.forEach((task) => {
    // Create Main Div
    let div = document.createElement("div");
    div.className = "task";
    // Check If the task Is Done
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    // Create Delete Button
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    // Append Button To Main Div
    div.appendChild(span);
    // Add Task Div To Page
    tasksDiv.appendChild(div);
  });
}

function addDataToLocalStorgeFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorge() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementToPageFrom(tasks);
  }
}

function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorgeFrom(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addDataToLocalStorgeFrom(arrayOfTasks);
}
