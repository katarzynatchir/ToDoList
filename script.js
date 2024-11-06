'use strict';

//Adding task
const taskInput = document.querySelector('#taskInput');
const taskList = document.querySelector('#taskList');
const btnAddTask = document.querySelector('.btn-add');
btnAddTask.addEventListener('click', addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    const li = createElement('li', { classList: 'list-element' });
    const span = createElement('span', { textContent: taskText });
    const btnEdit = createElement('button', {
      textContent: 'Edytuj',
      classList: 'btn btn-edit',
    });
    const btnApprove = createElement('button', {
      textContent: 'Zatwiedź zmiany',
      classList: 'btn btn-approve hidden',
    });
    const btnRemove = createElement('button', {
      textContent: 'Usuń',
      classList: 'btn btn-remove',
    });
    li.appendChild(span);
    li.appendChild(btnEdit);
    li.appendChild(btnApprove);
    li.appendChild(btnRemove);
    taskList.appendChild(li);
    btnRemove.addEventListener('click', removeTask);
    btnEdit.addEventListener('click', editTask);
    btnApprove.addEventListener('click', approveChange);
    taskInput.value = '';
  } else {
    alert('Nazwa zadania nie może być pusta.');
  }
  return taskText;
}

function createElement(tagName, attrObject) {
  const el = document.createElement(tagName);
  Object.entries(attrObject).forEach(value => {
    if (value[0] === 'textContent') {
      el.textContent = value[1];
    } else if (value[0] === 'classList') {
      el.classList = value[1];
    } else {
      el.setAttribute(value[0], value[1]);
    }
  });
  return el;
}

//Removing task
function removeTask(event) {
  event.target.parentElement.remove();
}

//Editing task
function editTask(event) {
  const parent = event.target.parentElement;
  const spanEl = parent.children[0];
  const spanText = spanEl.textContent;
  const editInput = createElement('input', {
    type: 'text',
    value: spanText,
  });
  parent.replaceChild(editInput, spanEl);
  //show Approve Btn
  parent.children[2].classList.remove('hidden');
  //hide Edit Btn
  parent.children[1].classList.add('hidden');
  editInput.addEventListener('keydown', event => {
    if (event.keyCode === 13) {
      const editInput = event.target;
      const parent = event.target.parentElement;
      const editInputValue = editInput.value;
      const span = createElement('span', { textContent: editInputValue });
      parent.replaceChild(span, editInput);
      //hide Approve Btn
      parent.children[2].classList.add('hidden');
      //show Edit Btn
      parent.children[1].classList.remove('hidden');
    }
  });
}

//Approving changes in task
function approveChange() {
  const parent = this.parentElement;
  const editInput = parent.children[0];
  const editInputValue = editInput.value;
  const span = createElement('span', { textContent: editInputValue });
  parent.replaceChild(span, editInput);
  //hide Approve Btn
  parent.children[2].classList.add('hidden');
  //show Edit Btn
  parent.children[1].classList.remove('hidden');
}

//1.obsługa Entera
taskInput.addEventListener('keydown', event => {
  if (event.keyCode === 13) {
    addTask();
  }
});

//2. kliknięcie w element zaznacza go jako ukończone zadanie
taskList.addEventListener('click', function (event) {
  if (event.target.tagName === 'SPAN') {
    event.target.classList.toggle('complete');
  }
});
