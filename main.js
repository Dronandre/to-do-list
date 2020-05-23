var form = document.getElementById("addForm");
var itemsList = document.getElementById("items");
var filter = document.getElementById("filter");

if (toDoList!=[]) {
    getLocalStorage(); 
    toDoList.forEach(item =>  addElement(item));    
} else {
    var toDoList = [];
}

// Добавление новой задачи прослушка события
form.addEventListener("submit", addItem);

// Удаление элемента - прослушка клика
itemsList.addEventListener("click", removeItem);

// Фильтрация списка дел - прослушка ввода
filter.addEventListener("keyup", filterItems);

// Добавление новой задачи функция
function addItem(e) {
	// Отменяем отправку формы
	e.preventDefault();
	// Находим инпут с текстом для новой задачи
	var newItemInput = document.getElementById("newItemText");
	// Получаем текст из инпута
    var newItemText = newItemInput.value;
    
	if (newItemText === "") {
		alert("Введите пожалуйста текст задачи!");
	} else {
        addElement(newItemText);        
        // Добавляем в массив
		toDoList.push(newItemText);
		// Добавляем в localstorage
        localStorage.setItem("toDoList", JSON.stringify(toDoList));
        // Очистим поле добавления новой задачи
        newItemInput.value = "";
	}
}

// Удаление элемента - ф-я
function removeItem(e) {
	if (
		e.target.hasAttribute("data-action") &&
		e.target.getAttribute("data-action") == "delete"
	) {
		if (confirm("Удалить задачу?")) {
			e.target.parentNode.remove();
			var textNode = e.target.parentNode.firstChild.textContent;
			var index = toDoList.indexOf(textNode);
			toDoList.splice(index, 1);
			localStorage.setItem("toDoList", JSON.stringify(toDoList));
		}
	}
}

// Фильтрация списка дел ф-я
function filterItems(e) {
	// Получаем фразу для поиска и переводим ее в нижний регистр
	var searchedText = e.target.value.toLowerCase();

	// 1. Получаем списко всех задач
	var items = itemsList.querySelectorAll("li");

	// 2. Перебираем циклом все найденные теги li с задачами
	items.forEach(function (item) {
		// Получаем текст задачи из списка и переводим его в нижний регистр
		var itemText = item.firstChild.textContent.toLowerCase();

		// Проверяем вхождение искомой подстроки в текст задачи
		if (itemText.indexOf(searchedText) != -1) {
			// Если вхождение есть - показываем элемент с задачей
			item.style.display = "block";
		} else {
			// Если вхождения нет - скрываем элемент с задачей
			item.style.display = "none";
		}
	});
}

function getLocalStorage() {    
    toDoList  = JSON.parse(localStorage.getItem("toDoList"));  
}

function addElement(task) {    
	// Создаем элемент для новой задачи
	var newElement = document.createElement("li");
	newElement.className = "list-group-item";
	// Добавим текст в новый элемент
	var newTextNode = document.createTextNode(task);
	newElement.appendChild(newTextNode);
	// Создаем кнопку
	var deleteBtn = document.createElement("button");
	// Добавляем текст
	deleteBtn.appendChild(document.createTextNode("Удалить"));
	// Добавляем CSS class
	deleteBtn.className = "btn btn-light btn-sm float-right";
	// Добавляем data атрибут
	deleteBtn.dataset.action = "delete";
	// Помещаем кнопку внутрь тега li
	newElement.appendChild(deleteBtn);
    console.log("addItem -> newElement", newElement);
    // Добавляем новую задачу в список со всеми задачами
    itemsList.prepend(newElement);        
}
