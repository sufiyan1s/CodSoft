document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    // Load tasks from local storage on page load
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach(function (task, index) {
            const li = document.createElement("li");
            li.innerHTML = `${task} <button class="delete" data-index="${index}">Delete</button>`;
            taskList.appendChild(li);
        });
    }

    function addTask() {
        const newTask = taskInput.value.trim();
        if (newTask !== "") {
            tasks.push(newTask);
            saveTasks();
            renderTasks();
            taskInput.value = "";
        }
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    addTaskButton.addEventListener("click", addTask);
    taskList.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete")) {
            const index = event.target.getAttribute("data-index");
            deleteTask(index);
        }
    });

    renderTasks();
});
