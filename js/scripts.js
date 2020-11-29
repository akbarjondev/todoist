// global variables
var savedTodos = JSON.parse(localStorage.getItem('savedTodos')) || [];

var elForm = $_('.form');
var elTodoInput = $_('.js-input', elForm);

var elTodos = $_('.js-todos');
var elTemplateTodo = $_('#todo-template').content;

// listen form submit
elForm.addEventListener('submit', (evt) => {
	evt.preventDefault();

	var newId = 0;
	savedTodos.forEach((todo) => {
		newId++
	});

	if(elTodoInput.value.length > 5) {
		var tempTodo = {
			id: (newId + 1).toString(),
			todo: elTodoInput.value,
			isCompleted: false
		};

		// push the todo to the savedTodos
		savedTodos.push(tempTodo);
	// console.log(savedTodos);
	} else {
		alert(`Ko'proq yozing!`)
	}

	localStorage.setItem('savedTodos', JSON.stringify(savedTodos));

	elTodoInput.value = '';
	elTodoInput.focus();

	renderTodos(savedTodos);
});

var renderTodos = function(todosArray) {
	elTodos.innerHTML = '';
	var newFragmentBox = document.createDocumentFragment();

	todosArray.forEach(function(todo) {
		var newTodoTemplate = elTemplateTodo.cloneNode(true);

		newTodoTemplate.querySelector('.js-todo__text').textContent = todo.todo;
		newTodoTemplate.querySelector('.js-todo__remove').dataset.id = todo.id;

		newFragmentBox.append(newTodoTemplate);		
	});

	elTodos.append(newFragmentBox);
}

renderTodos(savedTodos);

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
});