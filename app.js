// Define UI Variabless
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from Local Storage
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fas fa-trash-alt"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
}

// Add Task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a task');
  }

  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item';
  // Add icon html
  link.innerHTML = '<i class="fas fa-trash-alt"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Store in LS
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = '';

  e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();

      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
  // taskList.innerHTML = '';

  // Faster
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // https://jsperf.com/innerhtml-vs-removechild

  // Clear from LS
  clearTasksFromLocalStorage();
}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

// let tasks = [];
 
// function loadTasks() {
//   if (!localStorage.getItem('tasks')) {
//     localStorage.setItem('tasks', '[]');
//     tasks = JSON.parse(localStorage.getItem('tasks'));
//   } else {
//     tasks = JSON.parse(localStorage.getItem('tasks'));
//   }
// }
 
// function saveTasks(arr) {
//   localStorage.setItem('tasks', JSON.stringify(arr));
// }
 
// loadEventListeners();
 
// function loadEventListeners(e) {
//   form.addEventListener('submit', addTask);
//   taskList.addEventListener('click', removeTask);
//   clearBtn.addEventListener('click', destroyTasks);
//   filter.addEventListener('keyup', filterTasks);
// }
 
// function clearTasks() {
//   while (taskList.firstChild) {
//     taskList.removeChild(taskList.firstChild);
//   }
// }
 
// function buildTaskList() {
//   loadTasks();
//   let taskArray = tasks;
 
//   clearTasks();
 
//   for (let i = 0; i < taskArray.length; i++) {
//     task;
//     let li = document.createElement('li');
//     let link = document.createElement('a');
//     // Create li element
//     li.className = 'collection-item';
//     // Create textnode
//     li.id = taskArray[i].id;
//     li.appendChild(document.createTextNode(taskArray[i].task));
//     // Create new link
//     link.className = 'delete-item secondary-content';
//     // Add icon html
//     link.innerHTML = '<i class ="fa fa-remove"></i>';
//     // Append link to li
//     li.appendChild(link);
//     // Append li to ul
//     taskList.appendChild(li);
//     // Clear text in input field
//   }
// }
 
// function addTask(e) {
//   if (taskInput.value === '') {
//     alert('Add a task please');
//     return;
//   }
 
//   taskArray = tasks;
//   tasks.push({ task: taskInput.value, id: Date.now() });
 
//   saveTasks(tasks);
//   buildTaskList();
 
//   taskInput.value = '';
//   e.preventDefault();
// }
 
// function removeTask(e) {
//   if (e.target.className === 'fa fa-remove') {
//     if (confirm('Are you sure?')) {
//       taskIndex = tasks.findIndex(task => {
//         return task.id === Number(e.target.parentElement.parentElement.id);
//       });
//       tasks.splice(taskIndex, 1);
//       saveTasks(tasks);
//       buildTaskList();
//     }
//   }
// }
 
// function destroyTasks() {
//   saveTasks([]);
//   clearTasks();
// }
 
// function filterTasks(e) {
//   for (let i = 0; i < taskList.children.length; i++) {
//     if (e.target.value === '') {
//       taskList.children[i].style.display = 'list-item';
//     } else if (
//       !taskList.children[i].textContent
//         .toLowerCase()
//         .startsWith(e.target.value.toLowerCase())
//     ) {
//       taskList.children[i].style.display = 'none';
//     } else {
//       taskList.children[i].style.display = 'list-item';
//     }
//   }
// }
 
// buildTaskList(tasks);