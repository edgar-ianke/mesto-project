

const formElementEdit = document.querySelector("#edit-form");
const formElementCreate = document.querySelector("#create-form");
const formElementAvatar = document.querySelector("#avatar-form");



function checkValidity(inputElement, inputErrorClass) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity("Разрешены только латинские буквы, кириллические буквы, знаки дефиса и пробелы");
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showError(inputElement, inputElement.validationMessage, inputErrorClass);
  } else {
    hideError(inputElement, inputErrorClass);
  }
}

function showError(inputElement, errorMessage, inputErrorClass = "form__input_error") {
  const formError = inputElement.nextElementSibling;
  inputElement.classList.add(inputErrorClass);
  formError.textContent = errorMessage;
}

function hideError(inputElement, inputErrorClass = "form__input_error") {
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
      checkValidity(inputElement, inputErrorClass);
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
    disableButton(buttonElement, inactiveButtonClass)
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function disableButton(buttonElement, inactiveButtonClass = "form__submit-button_disabled") {
  buttonElement.classList.add(inactiveButtonClass);
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

  hideError,
  toggleButton,
  disableButton,
};
