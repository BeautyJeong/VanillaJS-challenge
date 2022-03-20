
const API_KEY = "4f2284a41cf6fbf0c7192eea6ef46993"

/* 사용자의 위치 알아내기 */
function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`//units=metric : 화씨온도를 섭씨온도로 바꿔줌
  fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const weather = document.querySelector("#weather span:first-child");
    const city = document.querySelector("#weather span:last-child");
    city.innerText = data.name;
    weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
  });//url요청, JS가 url 부름, fetch는 promise : 당장 뭔가 일어나지 않고 시간이 좀 걸린 뒤에 일어나는 것
}
function onGeoError() {
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

/* 
api의 api_key가 크게 중요한 정보가 아니기도 하고 무료다보니 
발급된 토큰으로 이상한 짓을? 해도 큰 타격은 없겠지만 
깃허브에서 보안이 가장 큰 이슈로 부각되고 있는 만큼 
api_key를 보관하는 전역변수를 생성한 후 
gitignore를 사용해 해당 파일을 숨김처리한 후 
커밋&푸쉬를 하는 방식으로 해보는 것도 좋을 것

자바스크립트에서 전역변수를 사용하는 방법
https://stackoverflow.com/questions/41255861/how-to-pass-variable-from-one-javascript-to-another-javascript-file
*/