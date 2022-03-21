const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username"

function onLoginSubmit(event) {
  event.preventDefault();//submit 이벤트가 일어날 때 기본동작을 막음
  loginForm.classList.add(HIDDEN_CLASSNAME);//form을 숨기고
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);//로컬스토리지에 value를 저장해라
  paintGreetings(username);//paintGreetings 함수를 호출해라
}

function paintGreetings(username) {
  greeting.innerText = `Hello, ${username} !`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
}


const savedUsername = localStorage.getItem(USERNAME_KEY);

//1. JS는 localStorage가 비어있는지 아닌지 확인
if (savedUsername === null) {//로컬스토리지가 비어있다면
  loginForm.classList.remove(HIDDEN_CLASSNAME);//form을 보이게 하고
  loginForm.addEventListener("submit", onLoginSubmit);//submit이벤트가 일어난다면 onLoginSubmit 함수를 실행시켜라

} else {//로컬스토리지에 vlaue가 있다면
  paintGreetings(savedUsername); //paintGreetings 함수를 실행해라
}


