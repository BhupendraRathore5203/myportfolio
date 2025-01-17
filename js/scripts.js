document.addEventListener("DOMContentLoaded", () => {
  fetch("../components/header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header-placeholder-here").innerHTML = data;
    })
    .catch((error) => console.error("Error loading header:", error));
});
