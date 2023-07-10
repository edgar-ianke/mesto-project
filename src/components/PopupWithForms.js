import Popup from "./Popup";
export default class PopupWithForms extends Popup {
  constructor(selector, formSubmitHandler) {
    super(selector);
    this._form = this._element.querySelector(".form");
    this._formSubmitHandler = formSubmitHandler.bind(this);
    this._submitButton = this._element.querySelector(".form__submit-button");
    this._submitButtonText = this._submitButton.textContent;
    this.formArray = Array.from(this._element.querySelectorAll(".form__input"));

    this._getValues = (evt) => {
      evt.preventDefault();
      this._formSubmitHandler(this._getInputValues())
    }
  }
  _getInputValues() {
    this.formValues = {};
    this.formArray.forEach(input => {
      this.formValues[input.name] = input.value;
    })
    return this.formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._getValues);
  }
  removeEventListeners() {
    super.removeEventListeners();
    this._form.removeEventListener("submit", this._getValues);
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderSaving(isSaving) {
    if (isSaving) {
      this._submitButton.textContent = "Сохранение...";
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}

