const button = document.getElementById("button");

var isTrackLessonsShowed = true;

const removeTrackLessons = () => {
  const trackLessonsDiv = document.getElementById("track-lessons");
  trackLessonsDiv.style.display = "none";

  const rowDiv = document.querySelector(".row");
  rowDiv.style.justifyContent = "center";

  const lessonContentDiv = document.querySelector(".col-md-8");
  lessonContentDiv.style.flex = "initial";
  lessonContentDiv.style.maxWidth = "initial";
};

const showTrackLessons = () => {
  const trackLessonsDiv = document.getElementById("track-lessons");
  trackLessonsDiv.style.display = "block";

  const rowDiv = document.querySelector(".row");
  rowDiv.style.justifyContent = "initial";

  const lessonContentDiv = document.querySelector(".col-md-8");
  lessonContentDiv.style.flex = "0 0 66.66666667%";
  lessonContentDiv.style.maxWidth = "66.66666667%";
};

button.addEventListener("click", async (event) => {
  event.preventDefault();
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  isTrackLessonsShowed
    ? (button.textContent = "Ocultar trilha de episódios")
    : (button.textContent = "Mostrar trilha de episódios");

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: isTrackLessonsShowed ? showTrackLessons : removeTrackLessons,
  });

  isTrackLessonsShowed = !isTrackLessonsShowed;
});
