const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const clearBtn = document.getElementById('clear-completed');
const countSpan = document.getElementById('count');
const filterButtons = document.querySelectorAll('.filters button');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function render() {
  list.innerHTML = '';
  const filtered = todos.filter(t => {
    if (currentFilter === 'active') return !t.completed;
    if (currentFilter === 'completed') return t.completed;
    return true;
  });

  filtered.forEach(task => {
    const li = document.createElement('li');
    li.className = 'todo-item' + (task.completed ? ' completed' : '');
    li.dataset.id = task.id;

    li.innerHTML = `
      <label>
        <input type="checkbox" class="toggle" ${task.completed ? 'checked' : ''} />
        <span class="text">${task.text}</span>
      </label>
      <button class="delete">❌</button>
    `;

    list.appendChild(li);
  });

  countSpan.textContent = todos.filter(t => !t.completed).length;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  todos.unshift({ id: Date.now().toString(), text, completed: false });
  saveTodos();
  render();
  input.value = '';
});

list.addEventListener('click', e => {
  const li = e.target.closest('li');
  if (!li) return;
  const id = li.dataset.id;

  if (e.target.classList.contains('toggle')) {
    todos = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
  }

  if (e.target.classList.contains('delete')) {
    todos = todos.filter(t => t.id !== id);
  }

  saveTodos();
  render();
});

clearBtn.addEventListener('click', () => {
  todos = todos.filter(t => !t.completed);
  saveTodos();
  render();
});

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    render();
  });
});

render();
