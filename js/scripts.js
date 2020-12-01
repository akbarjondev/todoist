// global variables
var savedTodos = JSON.parse(localStorage.getItem('savedTodos')) || [];

// form
var elForm = $_('.form');
var elTodoInput = $_('.js-input', elForm);
var elTodoCheck = $_('.js-todo__check', elForm);

// counter
var elTodosCounter = $_('.todo-tab__counter-number');

// todos
var elTodos = $_('.js-todos');
var elTemplateTodo = $_('#todo-template').content;

// modal
var elModal = $_('.self-modal');
var elModalYesButton = $_('.self-modal__yes', elModal);
var elModalNoButton = $_('.self-modal__no', elModal);
var elModalCurtain = $_('.self-modal-curtain');

// sort buttons
var elButtonAll = $_('.js-all');
var elButtonActive = $_('.js-active');
var elButtonCompleted = $_('.js-completed');

// count Todos
var countTodos = function(array) {
	var indexOfTodos = 0;
	
	array.forEach((todo) => {
		if(Boolean(todo)) {
			if(!todo.isCompleted) {
				indexOfTodos += 1;
			}
		}
	});

	elTodosCounter.textContent = indexOfTodos;
}

// listen form submit action
elForm.addEventListener('submit', (evt) => {
	evt.preventDefault();

  var newId = 0;
  savedTodos.forEach((todo) => {
  	newId++;
  });

	if(elTodoInput.value.length > 5) {
		var tempTodo = {
			id: newId.toString(),
			todo: elTodoInput.value,
			isCompleted: false
		};

		// push the todo to the savedTodos
		savedTodos.push(tempTodo);
	} else {
		alert(`Ko'proq yozing!`);
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

	for(var todo of todosArray) {
		if(!todo) {
			continue;
		}

		var newTodoTemplate = elTemplateTodo.cloneNode(true);

		newTodoTemplate.querySelector('.js-todo__text').textContent = todo.todo;
		newTodoTemplate.querySelector('.js-todo__remove').dataset.id = todo.id;

		if(todo.isCompleted) {
			newTodoTemplate.querySelector('.js-todo').classList.toggle('is-done');
			newTodoTemplate.querySelector('.js-todo__check').checked = true;
		}

		newFragmentBox.append(newTodoTemplate);
	}

	elTodos.append(newFragmentBox);
	countTodos(todosArray);
}

renderTodos(savedTodos);


// event delegatin, listen to todos wrapper
elTodos.addEventListener('click', (evt) => {
	// remove todo
	if(evt.target.matches('.js-todo__remove')) {
		var foundTodo = savedTodos.find((todo) => {
			if(Boolean(todo)) {
				if(todo.id === evt.target.dataset.id) {
					return todo;
				}
			}
		});

		// modal opener
		elModal.classList.add('self-modal--open');

		// deletes todo
		var deleteTodo = function() {
			var isExistTodo = savedTodos.findIndex((isExistTodo) => {
				return isExistTodo == foundTodo;
			});

			// delete current todo from array but array keeps it's index
			delete savedTodos[isExistTodo];
			localStorage.setItem('savedTodos', JSON.stringify(savedTodos));
			
			// close modal after deleting todo
			elModal.classList.remove('self-modal--open');
			
			renderTodos(savedTodos);
		}

		// works when Escape keyboard is pressed
		document.body.addEventListener('keyup', (evt) => {
			if(evt.keyCode === 27) {
				elModalYesButton.removeEventListener('click', deleteTodo);
				elModal.classList.remove('self-modal--open');
			}
		});

		// cancel deleting when black curtain will be pressed
		elModalCurtain.addEventListener('click', () => {
			elModalYesButton.removeEventListener('click', deleteTodo);
			elModal.classList.remove('self-modal--open');
		});

		// cancel deleting when NO button will be pressed
		elModalNoButton.addEventListener('click', (evt) => {
			elModalYesButton.removeEventListener('click', deleteTodo);
			elModal.classList.remove('self-modal--open');
		});

		// delete when YES button is pressed
		elModalYesButton.addEventListener('click', deleteTodo);
	}

	// done todo
	if(evt.target.matches('.js-todo__check')) {
		savedTodos.find((todo) => {
			if(Boolean(todo)) {
				if(todo.id == evt.target.previousElementSibling.dataset.id) {

					evt.target.closest('.js-todo').classList.toggle('is-done');
					todo.isCompleted = !todo.isCompleted;

					// save Updated todos
					localStorage.setItem('savedTodos', JSON.stringify(savedTodos));
				}
			}			
		});

		renderTodos(savedTodos);
	}
});
