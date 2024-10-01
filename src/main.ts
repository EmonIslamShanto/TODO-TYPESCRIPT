import './style.css'

interface Todo {
  title: string;
  isCompleted: boolean;
  readonly id: string;
}

const todos: Todo[] = [];

const todosContainer = document.querySelector('.todoContainer') as HTMLDivElement;

const todoInput = document.getElementsByName('title')[0] as HTMLInputElement;

const myForm = document.getElementById('myForm') as HTMLFormElement;

myForm.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();

  const todo: Todo = {
    title: todoInput.value,
    isCompleted: false,
    id: Date.now().toString()
  }

  todos.push(todo);
  todoInput.value = '';
  renderTodos(todos);
}

const generateTodoItem = (title: string, isCompleted: boolean, id: string) => {
  const todo: HTMLDivElement = document.createElement('div');
  todo.className = "todo";


  //Creating Checkbox
  const checkBox : HTMLInputElement = document.createElement('input');
  checkBox.setAttribute('type', 'checkbox');
  checkBox.className = 'isCompleted';
  checkBox.checked = isCompleted;
  checkBox.onchange = () => {
    todos.find((item) => {
      if(item.id === id) {
        item.isCompleted = checkBox.checked;
      }
    });
    paragraph.className = checkBox.checked ? 'textCut' : '';
  }

  //Creating Title
  const paragraph : HTMLParagraphElement = document.createElement('p');
  paragraph.innerText = title;

  //Creating Delete Button
  const btn: HTMLButtonElement = document.createElement('button');
  btn.className = 'deleteBtn';
  btn.innerText = 'X';
  btn.onclick = () => {
    deleteTodoItem(id);
  }

  //Appending all the elements to the todo div
  todo.append(checkBox, paragraph, btn);
  todosContainer.appendChild(todo);
}

const deleteTodoItem = (id: string) => {
  const index = todos.findIndex(item => item.id === id);
  todos.splice(index, 1);
  renderTodos(todos);
}
const renderTodos = (todos: Todo[]) => {
  todosContainer.innerHTML = '';
  todos.forEach(item => {
    generateTodoItem(item.title, item.isCompleted, item.id);
  })
}

