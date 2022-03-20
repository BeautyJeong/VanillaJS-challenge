const clock = document.querySelector("#clock");

function getClock() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  clock.innerText = `${hours}:${minutes}:${seconds}`;
}

getClock();//브라우저 열자마자 함수 즉시 호출(한 번만 실행)
setInterval(getClock, 1000);//매 초마다 getClock라는 함수 실행(반복 실행)