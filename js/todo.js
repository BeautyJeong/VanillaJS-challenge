const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos"

let toDos = [];//newTodo가 paintToDo될 때마다 array에 push하기

function saveToDos(){
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));//JSON.stringify() 값을 string으로 바꿀때
}

function deleteToDo(event) {
  const li = event.target.parentElement;//parentElement는 클릭된 element의 부모
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id))
  saveToDos();
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;//html li태그에 id생성
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteToDo);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDoSubmit(e) {
  e.preventDefault();
  const newTodo = toDoInput.value;//value를 변수에 복사
  toDoInput.value = "";//input 상자 내의 텍스트 초기화
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  }
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

function sayHello(item){
  console.log("this is the turn of", item);
}

const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null){
  const parsedToDos = JSON.parse(savedToDos);//JSON.parse는 string을 array로 변환시켜줌
  toDos = parsedToDos;//새로고침해도 리셋되지 않고 바로 전에 작성한대로 그대로 복사해서 유지해주기
  console.log(parsedToDos);
  parsedToDos.forEach(paintToDo);//forEach는 array의 각 item에 대해 function을 실행하게 함
  //parsedToDos.forEach((item) => console.log("this tis the turn of", item);); 이렇게 arrow함수를 써도 됨
}

/*
append() & appendChild() 차이
 - append() : 객체 + 문자열 추가 가능
 - appendChild() : 객체만 추가 가능(문자열은 불가)
*/