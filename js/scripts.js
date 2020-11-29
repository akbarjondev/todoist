// global variables
var savedTodos = JSON.parse(localStorage.getItem('savedTodos')) || [];

var elForm = $_('.form');
var elTodoInput = $_('.js-input', elForm);
var elTodoCheck = $_('.js-todo__check', elForm);

var elTodos = $_('.js-todos');
var elTemplateTodo = $_('#todo-template').content;

// listen form submit
elForm.addEventListener('submit', (evt) => {
	evt.preventDefault();

  var newId =	savedTodos[savedTodos.length - 1];
  
	if(elTodoInput.value.length > 5) {
		var tempTodo = {
			id: (Number(newId.id) + 1).toString(),
			todo: elTodoInput.value,
			isCompleted: false
		};

		// push the todo to the savedTodos
		savedTodos.push(tempTodo);
	} else {
		alert(`Ko'proq yozing!`)
	}

	localStorage.setItem('savedTodos', JSON.stringify(savedTodos));

	elTodoInput.value = '';
	elTodoInput.focus();

	renderTodos(savedTodos);
});

// render stored todos in the array param[Array]
var renderTodos = function(todosArray) {
	elTodos.innerHTML = '';
	var newFragmentBox = document.createDocumentFragment();

	todosArray.forEach(function(todo) {
		var newTodoTemplate = elTemplateTodo.cloneNode(true);

		newTodoTemplate.querySelector('.js-todo__text').textContent = todo.todo;
		newTodoTemplate.querySelector('.js-todo__remove').dataset.id = todo.id;

		if(todo.isCompleted) {
			newTodoTemplate.querySelector('.js-todo').classList.toggle('is-done');
			newTodoTemplate.querySelector('.js-todo__check').checked = true;
		}

		newFragmentBox.append(newTodoTemplate);		
	});

	elTodos.append(newFragmentBox);
}

renderTodos(savedTodos);

// event delegatin, listen to todos wrapper
elTodos.addEventListener('click', (evt) => {
	// remove todo
	if(evt.target.matches('.js-todo__remove')) {
		var foundTodo = savedTodos.find((todo) => {
			if(todo.id === evt.target.dataset.id) {
				return todo;
			}
		});

		var isExistTodo = savedTodos.findIndex((isExistTodo) => {
			return isExistTodo == foundTodo;
		});

		savedTodos.splice(isExistTodo, 1);
		renderTodos(savedTodos);
	}

	// done todo
	if(evt.target.matches('.js-todo__check')) {
		evt.target.closest('.js-todo').classList.toggle('is-done');
		savedTodos.find((todo) => {
			if(todo.id == evt.target.previousElementSibling.dataset.id) {
				todo.isCompleted ? todo.isCompleted = false : todo.isCompleted = true;

				// save Updated todos
				localStorage.setItem('savedTodos', JSON.stringify(savedTodos));
			}
		});
	}
});
