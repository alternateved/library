const popupButton = document.querySelector("#plus-button");
const popup = document.querySelector("#popup");

function showPopupForm () {
  popup.style.display = "block";
}
function closePopupForm() {
  popup.style.display = "none";
}

popupButton.addEventListener("click", showPopupForm);

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", event => {
  if (event.target == popup) {
    popup.style.display = "none";
}
});