import { editProfile } from "./utils";

const formElementEdit = document.querySelector("#edit-form");
const formElementCreate = document.querySelector("#create-form");
const formElementAvatar = document.querySelector("#avatar-form");

function submitFormEditHandler(evt) {
  evt.preventDefault();
  editProfile(evt);
}

function checkValidity(formElement, inputElement, inputErrorClass) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity("Разрешены только латинские буквы, кириллические буквы, знаки дефиса и пробелы");
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage, inputErrorClass);
  } else {
    hideError(formElement, inputElement, inputErrorClass);
  }
}

function showError(formElement, inputElement, errorMessage, inputErrorClass) {
  const formError = inputElement.nextElementSibling;
  inputElement.classList.add(inputErrorClass);
  formError.textContent = errorMessage;
}

function hideError(formElement, inputElement, inputErrorClass) {
  const formError = inputElement.nextElementSibling;
  inputElement.classList.remove(inputErrorClass);
  formError.textContent = "";
}

function setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass) {
  const formInputElementsAll = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButton(formInputElementsAll, buttonElement, inactiveButtonClass);
  formInputElementsAll.forEach((inputElement) =>
    inputElement.addEventListener("input", function () {
      checkValidity(formElement, inputElement, inputErrorClass);
      toggleButton(formInputElementsAll, buttonElement, inactiveButtonClass);
    })
  );
}

function hasInvalidInput(formInputElementsAll) {
  return formInputElementsAll.some(function (inputElement) {
    return !inputElement.validity.valid;
  });
}
function toggleButton(formInputElementsAll, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(formInputElementsAll)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function disableButton(form) {
  const buttonElement = form.querySelector(".form__submit-button");
  buttonElement.classList.add("form__submit-button_disabled");
  buttonElement.disabled = true;
}

function enableValidationAll({
  formElementsAll,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
}) {
  const forms = Array.from(document.querySelectorAll(formElementsAll));
  forms.forEach((formElement) =>
    setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass)
  );
}
enableValidationAll({
  formElementsAll: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_disabled",
  inputErrorClass: "form__input_error",
});
export {
  formElementCreate,
  formElementEdit,
  formElementAvatar,
  submitFormEditHandler,
  hideError,
  toggleButton,
  disableButton,
};
