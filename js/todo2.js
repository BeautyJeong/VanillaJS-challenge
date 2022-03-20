const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "toDos";

/* 투두리스트를 입력하고 새로고침하면 이전 것들은 없어지고 새로운 리스트만 남게 되는 이유: toDos 배열이 처음에 빈 값이기 때문, 이전의 투두는 가지고 있지 않음*/
let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));//localStorage는 배열이 아닌 입력된 텍스트만 저장
  //JSON.stringify는 자바스크립트 객체나 배열 등 그 자체를 string으로 만들어줌
}

function deleteTodo(event) {
  const li = event.target.parentElement;
  li.remove();
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteTodo);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;//input의 현재 value를 새로운 변수에 복사
  toDoInput.value = "";//input에 입력하는 곳을 비움, 변수와는 상관없음
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),//id로 각각의 li item 구별(투두리스트에 같은 텍스트가 있을 수도 있으므로)
  }

  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);//JSON.parse는 string을 살아있는 array나 오브젝트로 변환해줌
  toDos = parsedToDos; //localStorage에 toDo들이 있으면, toDos에 parsedToDos를 넣어서 전에 입력한 toDo들을 복원하기
  parsedToDos.forEach(paintToDo);
  //parsedToDos.forEach((item) => console.log("this is the turn of", item));
}

/*
parsedToDos = [a, b, c]

parsedToDos.forEach(sayHello) 가 실행되는 것은 아래와 같다
sayHello("a");
sayHello("b");
sayHello("c");
*/

/* 배열.filter();
=> array의 item을 유지하고 싶다면 true를 리턴해야 함

function sexyFilter() {
  return true;
}

[1, 2, 3, 4].filter(sexyFilter);//[1, 2, 3, 4] */