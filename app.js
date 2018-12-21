// Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

// Declaring Load all event listeners (loadEventListeners)
function loadEventListeners() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks)
  // Add task event
  form.addEventListener('submit',addTask)
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear tasks
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks
  filter.addEventListener('keyup', filterTasks)
}

// Get tasks from LS
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task) => {
      // create li element
      const li = document.createElement('li');
      // Add class
      li.className = 'collection-item';
      // Create text node and append to li
      li.appendChild(document.createTextNode(task));
      // Create new link element
      const link = document.createElement('a');
      link.className = 'delete-item secondary-content';
      // Add icon html
      link.innerHTML = '<i class="fa fa-remove"></i>';
      // Append link to li
      li.appendChild(link);
      // Append li to ul
      taskList.appendChild(li);

  })
}

// Declaring Add Task (addTask) 
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task');
  }
    // create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
    
    // Store in LS
    storeTaskInLocalStorage(taskInput.value);
    
    taskInput.value = '';
    
  e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you Shure?')) { // the confirm function makes a popup where the ok means true and the cancel false
      // Remove from the UI
      e.target.parentElement.parentElement.remove();
      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from ls
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach((task, index) => {
    if(taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks() {
  /* Slower but simple way 
  taskList.innerHTML = ''; */

  // Faster way (UI)
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  // Clear from LS
  localStorage.clear();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  

  document.querySelectorAll('.collection-item').forEach((task) => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) { // The negative statement -> (!= -1) means that  we iterated over a string and there is no match, so if the value is not -1 we satisfy the condition, displaying the task. "Everything but -1 means we found something!!!" 
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  })
}
















