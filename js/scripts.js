// global variables
var savedTodos = JSON.parse(localStorage.getItem('savedTodos')) || [];

var elForm = $_('.form');
var elTodoInput = $_('.js-input', elForm);

var elTodos = $_('.js-todos');
var elTemplateTodo = $_('#todo-template').content;

// listen form submit
elForm.addEventListener('submit', (evt) => {
	evt.preventDefault();

	if(elTodoInput.value.length > 5) {
		var tempTodo = {
			todo: elTodoInput.value,
			isCompleted: false
		};

		// push the todo to the savedTodos
		savedTodos.push(tempTodo);
	} else {
		alert(`Ko'proq yozing!`)
	}

	localStorage.setItem('savedTodos', JSON.stringify(savedTodos));
	console.log(savedTodos);

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

		newFragmentBox.append(newTodoTemplate);		
	});

	elTodos.append(newFragmentBox);
}

renderTodos(savedTodos);

elTodos.addEventListener('click', (evt) => {
	// console.log(evt.target.match)
});