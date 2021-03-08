const popupButton = document.querySelector("#plus-button");
const closeButton = document.querySelector(".close");
const popup = document.querySelector("#popup");

function showPopupForm() {
  popup.style.display = "block";
}
function closePopupForm() {
  popup.style.display = "none";
}

function popupFunctionality() {
  popupButton.addEventListener("click", showPopupForm);
  closeButton.addEventListener("click", closePopupForm);
  // When the user clicks anywhere outside of the modal, close it
  window.addEventListener("click", (event) => {
    if (event.target == popup) {
      popup.style.display = "none";
    }
  });
}

popupFunctionality();