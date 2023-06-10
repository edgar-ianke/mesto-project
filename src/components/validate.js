import { editProfile } from "./utils";

const formElementEdit = document.querySelector("#edit-form");
const formElementCreate = document.querySelector("#create-form");
const formElementAvatar = document.querySelector("#avatar-form");

function submitFormEditHandler(evt) {
  evt.preventDefault();
  editProfile(evt);
}

function checkValidity(formElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity("Разрешены только латинские буквы, кириллические буквы, знаки дефиса и пробелы");
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideError(formElement, inputElement);
  }
}

function showError(formElement, inputElement, errorMessage) {
  const formError = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add("form__input_error");
  formError.textContent = errorMessage;
}

function hideError(formElement, inputElement) {
  const formError = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove("form__input_error");
  formError.textContent = "";
}

function setEventListeners(formElement) {
  const formInputElementsAll = Array.from(formElement.querySelectorAll(".form__input"));
  const buttonElement = formElement.querySelector(".form__submit-button");
  toggleButton(formInputElementsAll, buttonElement);
  formInputElementsAll.forEach((inputElement) =>
    inputElement.addEventListener("input", function () {
      checkValidity(formElement, inputElement);
      toggleButton(formInputElementsAll, buttonElement);
    })
  );
}
function enableValidation() {
  const formElementsAll = Array.from(document.querySelectorAll(".form"));
  formElementsAll.forEach((formElement) => setEventListeners(formElement));
}
enableValidation();

function hasInvalidInput(formInputElementsAll) {
  return formInputElementsAll.some(function (inputElement) {
    return !inputElement.validity.valid;
  });
}
function toggleButton(formInputElementsAll, buttonElement) {
  if (hasInvalidInput(formInputElementsAll)) {
    buttonElement.classList.add("form__submit-button_disabled");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("form__submit-button_disabled");
    buttonElement.disabled = false;
  }
}
export { formElementCreate, formElementEdit, formElementAvatar, submitFormEditHandler, hideError, toggleButton };