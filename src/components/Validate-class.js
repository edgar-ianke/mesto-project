export const settingForm = {
  formElementsAll: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_disabled",
  inputErrorClass: "form__input_error",
};

export class FormValidator {
  constructor(setting, form) {
    this._allForm = setting.formElementsAll;
    this._inputSelector = setting.inputSelector;
    this._submitButton = setting.submitButtonSelector;
    this._inactiveButton = setting.inactiveButtonClass;
    this._inputError = setting.inputErrorClass;
    this._form = form;
  }
  enableValidation() {
    const that = this;
    const formInputElementsAll = Array.from(this._form.querySelectorAll(this._inputSelector));
    const buttonElement = this._form.querySelector(this._submitButton);
    this._toggleButton(formInputElementsAll, buttonElement);

    formInputElementsAll.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkValidity(inputElement);
        this._toggleButton(formInputElementsAll, buttonElement);
      });
    });
  }
  _toggleButton(formInputElementsAll, buttonElement) {
    if (this._hasInvalidInput(formInputElementsAll)) {
      this._disableButton(buttonElement, this._inactiveButton);
    } else {
      buttonElement.classList.remove(this._inactiveButton);
      buttonElement.disabled = false;
    }
  }
  _disableButton(buttonElement) {
    buttonElement.classList.add(this._inactiveButton);
    buttonElement.disabled = true;
  }
  _hasInvalidInput(formInputElementsAll) {
    return formInputElementsAll.some(function (inputElement) {
      return !inputElement.validity.valid;
    });
  }
  _checkValidity(inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity("Разрешены только латинские буквы, кириллические буквы, знаки дефиса и пробелы");
    } else {
      inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage);
    } else {
      this._hideError(inputElement);
    }
  }
  _showError(inputElement, errorMessage) {
    const formError = inputElement.nextElementSibling;
    inputElement.classList.add(this._inputError);
    formError.textContent = errorMessage;
  }

  _hideError(inputElement) {
    const formError = inputElement.nextElementSibling;
    inputElement.classList.remove(this._inputError);
    formError.textContent = "";
  }
}
