import API_KEY from "./config.js";

const keyInputElement = document.querySelector(".key-input");
const startButton = document.querySelector(".start-button");

const input = document.querySelector(".prompt");
const submitButton = document.querySelector(".submit-button");
const imageSection = document.querySelector(".images");
const loadingMessage = document.querySelector(".loading-message");

let sarrera = API_KEY;

function startApp() {
  let userKey = keyInputElement.value;
  if (userKey.trim !== "") {
    sarrera = userKey;
  }
  window.location.href = "imageGenerator.html";
}

async function getImages() {
  const imageToRemove = imageSection.querySelector(".image-container");
  imageToRemove.remove();
  loadingMessage.innerText = "Generating image...";
  loadingMessage.style.display = "block";

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sarrera}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      prompt: input.value,
      n: 1,
      size: "1024x1024"
    })
  };
  try {
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      options
    );
    const data = await response.json();

    data?.data.forEach((imageObject) => {
      const imageContainer = document.createElement("div");
      imageContainer.classList.add("image-container");
      const imageElement = document.createElement("img");
      imageElement.setAttribute("src", imageObject.url);
      imageContainer.append(imageElement);
      imageSection.append(imageContainer);
    });
  } catch (error) {
    console.error(error);
    loadingMessage.innerText = "Error fetching images. Please try again.";
  } finally {
    loadingMessage.style.display = "none";
  }
}

if (startButton) {
  startButton.addEventListener("click", startApp);
}
submitButton.addEventListener("click", getImages);
