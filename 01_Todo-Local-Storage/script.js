document.addEventListener("DOMContentLoaded", () => {
  let todoInput = document.getElementById("todo-input");
  let addTaskButton = document.getElementById("add-task-btn");
  let todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => {
    renderTask(task);
  });
  function renderAllTasks() {
    todoList.innerHTML = ""; // Clear existing list
    tasks.forEach(renderTask); // Re-render all tasks
  }
  addTaskButton.addEventListener("click", () => {
    let taskText = todoInput.value.trim();
    if (taskText === "") {
      return;
    }
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    tasks.push(newTask);
    saveTasks();
    todoInput.value = ""; //clear input
    renderAllTasks(newTask);
  });

  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    if (task.completed) {
      li.classList.add("completed");
    }
    li.innerHTML = `
      <span>${task.text}</span>
      <button>delete</button>
    `;
    li.addEventListener("click", (e) => {
      if (e.target.tagName !== "BUTTON") {
        task.completed = !task.completed;
        li.classList.toggle("completed");
        saveTasks();
      }
    });

    li.querySelector("button").addEventListener("click", (event) => {

      tasks = tasks.filter((t) => t.id !== task.id);
      saveTasks();
      renderAllTasks();
    });
    setInterval(() => {
      tasks = tasks.filter((task) => {
        if (task.completed !== true) {
          return task;
        }
      });
      renderAllTasks();
    }, 60000);
    todoList.appendChild(li);
  }

  // localstorage is a browser based api
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  // key can be anything but value of the key must be in the json format
});
