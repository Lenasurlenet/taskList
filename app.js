// define UI variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

let task = []

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // clear task event
  clearBtn.addEventListener('click', clearTasks)
}
//Add task function
  function addTask(e) {
    if(taskInput.value === '') {
alert('Ajoutez une tâche');
    }

  // Create list item
const li = document.createElement('li');

  // Add class
  li.className = 'collection-item';
  // Create text node and append to the li
    li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-task';
  // Add trash icon
  link.innerHTML = '<i class="fas fa-trash-alt"></i>';
  // Append link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);
  // Clear input
  taskInput.value = '';

  console.log(li);

    e.preventDefault();
  }

  //Remove Task
  function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-task')) {
      if(confirm('êtes-vous sûr?')) {
        e.target.parentElement.parentElement.remove();
      }
    }
  }

  // Clear Tasks
  function clearTasks() {
    //taskList.innerHTML = '';

    // Loop

    while(taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }
  

