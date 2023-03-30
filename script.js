const date = new Date();

const ano = date.getFullYear();
const mes = date.toLocaleString("default", { month: "short" });
const dia = addZero(date.getDate());
const horas = addZero(date.getHours());
const minutos = addZero(date.getMinutes());
const showTime = document.querySelector("[data-date]");

showTime.innerHTML = `<p class="today-text">${dia} ${mes} ${ano}, ${horas}:${minutos}</p>`;
setInterval(() => {
  showTime.innerHTML = `<p class="today-text">${dia} ${mes} ${ano}, ${horas}:${minutos}</p>`;
}, 30000);

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function greetings() {
  let greeting = document.querySelector("[data-greetings]");
  if (horas >= 0 && horas < 13) {
    greeting.innerHTML = `<span data-greet>Good morning</span>`;
  } else if (horas >= 13 && horas <= 18) {
    greeting.innerHTML = `<span data-greet>Good evening</span>`;
  } else {
    greeting.innerHTML = `<span data-greet>Good night</span>`;
  }
}

greetings();

let text = document.querySelector("[data-text]");
const taskAdded = document.querySelector("[data-show]");
let tasks = [];
document.querySelector("[data-send]").addEventListener("click", addTask);

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  showTask();
}

function addTask() {
  let uid = new Date().getTime().toString();
  if (text.value === "") {
  } else {
    let task = text.value;
    text.value = "";
    text.focus();
    tasks.push({ id: uid, info: task, status: false });
    showTask();
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTask() {
  taskAdded.innerHTML = "";
  for (const task of tasks) {
    taskAdded.innerHTML += `
      <div class="task" data-id="${task.id}">
        <button data-check onclick="checkTask('${task.id}', ${task.status})">${
      task.status
        ? '<svg xmlns="http://www.w3.org/2000/svg"width="18" "height="18" viewBox="0 0 24 24"><path fill="white" d="m10 16.4l-4-4L7.4 11l2.6 2.6L16.6 7L18 8.4l-8 8Z"/></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="transparent" d="m10 16.4l-4-4L7.4 11l2.6 2.6L16.6 7L18 8.4l-8 8Z"/></svg>'
    }</button>
        <span data-span>${task.info}</span>
        <button data-edit onclick="openEdit('${
          task.id
        }')"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#787f8a" d="M12 21v-2.125l5.3-5.3l2.125 2.125l-5.3 5.3H12Zm-9-5v-2h7v2H3Zm17.125-1L18 12.875l.725-.725q.275-.275.7-.275t.7.275l.725.725q.275.275.275.7t-.275.7l-.725.725ZM3 12v-2h11v2H3Zm0-4V6h11v2H3Z"/></svg></button>
        <button data-remove onclick="removeTask('${
          task.id
        }')"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"  viewBox="0 0 24 24"><path fill="#787f8a" d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7Zm2-4h2V8H9v9Zm4 0h2V8h-2v9Z"/></svg></button>
        
      </div>
    `;
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function checkTask(id, status) {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.status = !status;
  }
  showTask();
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function openEdit(id) {
  const edit = tasks.find((task) => task.id === id);

  document.querySelector("[data-send]").addEventListener("click", div);

  var div = document.createElement("div");

  div.innerHTML = `<div id="modal"><div modal-text>
  <p>Edit Task</p>
  <button data-modal onclick="document.querySelector('#modal').remove()">X</button>
  </div>
  <input data-edited style="  width: 100%;" type="text" value="${edit.info}">
  <button data-change onclick="editTask('${edit.id}')">Edit</button>
  </div></div>`;
  document.body.appendChild(div);
}

function editTask(id) {
  const edit = tasks.find((task) => task.id === id);
  let newTask = document.querySelector("[data-edited]").value;
  edit.info = newTask;
  showTask();
  document.querySelector("#modal").remove();
}

function removeTask(id) {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  tasks.splice(taskIndex, 1);
  showTask();
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
