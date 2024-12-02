// Initialize todos array from localStorage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Save todos to localStorage
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Render todos
function renderData() {
  const todoList = document.getElementById('todoList');
  todoList.innerHTML = '';
  todos = JSON.parse(localStorage.getItem('todos')) || [];
    
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = todo.done ? 'todo-item completed' : 'todo-item';
      
    li.innerHTML = `
      <span>${todo.text}</span>
      <div>
        <button onclick="markAsDone(${index})" ${todo.done ? 'disabled' : ''}>Done</button>
        <button onclick="editTodo(${index})" ${todo.done ? 'disabled' : ''}>Edit</button>
        <button onclick="deleteTodo(${index})">Delete</button>
      </div>
    `;
    todoList.appendChild(li);
  });
}

// Add todo
function addTodo(text) {
  todos.push({ text, done: false });
  saveTodos();
  renderData();
}

// Delete todo
function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderData();
}

// Mark todo as done
function markAsDone(index) {
  todos[index].done = true;
  saveTodos();
  console.log('Todo marked as done:', todos[index]);
  console.log('Completed Task:', localStorage.getItem('todos'));
  renderData();
}

// Edit todo
function editTodo(index) {
  const li = document.querySelectorAll('.todo-item')[index];
  const text = todos[index].text;
  li.innerHTML = `
    <input type="text" value="${text}">
    <button onclick="saveTodoEdit(${index})">Save</button>
  `;
}

// Save todo edit
function saveTodoEdit(index) {
  const input = document.querySelector('.todo-item input');
  todos[index].text = input.value;
  saveTodos();
  renderData();
}

// Handle form submission
document.getElementById('todoForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('todoInput');
  if (input.value.trim()) {
    addTodo(input.value.trim());
    input.value = '';
  }
});

renderData();