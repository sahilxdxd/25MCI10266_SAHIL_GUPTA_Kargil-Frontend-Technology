let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    let title = document.getElementById("taskInput").value.trim();
    if (!title) return;

    tasks.push({
        id: Date.now(),
        title: title,
        priority: document.getElementById("priorityInput").value,
        deadline: document.getElementById("dateInput").value,
        completed: false
    });

    document.getElementById("taskInput").value = "";
    save();
    render();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    save();
    render();
}

function toggleTask(id) {
    tasks = tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t);
    save();
    render();
}

function setFilter(type, btn) {
    filter = type;

    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active-btn"));
    btn.classList.add("active-btn");

    render();
}

function sortTasks() {
    let val = document.getElementById("sortOption").value;

    if (val === "priority") {
        let order = {High:3, Medium:2, Low:1};
        tasks.sort((a,b) => order[b.priority] - order[a.priority]);
    }

    if (val === "deadline") {
        tasks.sort((a,b) => new Date(a.deadline) - new Date(b.deadline));
    }

    render();
}

function render() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    let data = tasks;

    if (filter === "completed") data = tasks.filter(t => t.completed);
    if (filter === "pending") data = tasks.filter(t => !t.completed);

    let today = new Date().toISOString().split("T")[0];

    data.forEach(t => {
        let div = document.createElement("div");

        let overdue = t.deadline && t.deadline < today && !t.completed;

        let priorityClass = t.priority.toLowerCase();

        div.className = "task " + (overdue ? "overdue" : "");

        div.innerHTML = `
        <div>
            <b class="${t.completed ? 'done' : ''}">${t.title}</b><br>
            <span class="${priorityClass}">${t.priority}</span>
            <span class="small"> | ${t.deadline || ""}</span>
        </div>

        <div>
            <button class="btn btn-success btn-sm" onclick="toggleTask(${t.id})">Completed</button>
            <button class="btn btn-danger btn-sm" onclick="deleteTask(${t.id})">Delete</button>
        </div>
        `;

        list.appendChild(div);
    });

    document.getElementById("total").innerText = tasks.length;
    document.getElementById("completed").innerText = tasks.filter(t => t.completed).length;
    document.getElementById("pending").innerText = tasks.filter(t => !t.completed).length;
}

document.querySelector(".filter-btn").classList.add("active-btn");

render();