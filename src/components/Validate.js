export default class Validate {
  constructor(setting, form) {
    this._allForm = setting.formElementsAll;
    this._inputSelector = setting.inputSelector;
    this._submitButton = setting.submitButtonSelector;
    this._inactiveButton = setting.inactiveButtonClass;
    this._inputError = setting.inputErrorClass;
    this._form = form;

    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonElem = this._form.querySelector(this._submitButton);
  }
  enableValidation() {
    this._toggleButton();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkValidity(inputElement);
        this._toggleButton();
      });
    });
  }
  _toggleButton() {
    if (this._hasInvalidInput(this._inputList)) {
      this._disableButton(this._buttonElem, this._inactiveButton);
    } else {
      this._buttonElem.classList.remove(this._inactiveButton);
      this._buttonElem.disabled = false;
    }
  }
  _disableButton() {
    this._buttonElem.classList.add(this._inactiveButton);
    this._buttonElem.disabled = true;
  }
  _hasInvalidInput() {
    return (this._inputList).some(function (inputElement) {
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
