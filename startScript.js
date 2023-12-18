const keyInputElement = document.querySelector(".key-input");
const startButton = document.querySelector(".start-button");

function startApp() {
  const API_KEY = keyInputElement.value;
  localStorage.setItem("API_KEY", API_KEY);
  window.location.href = "imageGenerator.html";
}

if (startButton) {
  startButton.addEventListener("click", startApp);
}
