import Popup from "./Popup";
export default class PopupWithForms extends Popup {
  constructor(selector, formSubmitHandler) {
    super(selector);
    this._popupElement = document.querySelector(selector);
    this._form = this._popupElement.querySelector(".form");
    this._formSubmitHandler = formSubmitHandler.bind(this);
    this.submitButton = this._popupElement.querySelector(".form__submit-button");
    this._submitButtonText = this.submitButton.textContent;
    const allInputs = this._popupElement.querySelectorAll(".form__input");
    this.formArray = Array.from(allInputs)
  }
  _getInputValues() {
    this.formValues = this.formArray.reduce((acc, currValue) => {
      acc[currValue.name] = currValue.value;
      return acc;
    }, {});
    return this.formValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._formSubmitHandler);
  }
  removeEventListeners() {
    super.removeEventListeners();
    this._form.removeEventListener("submit", this._formSubmitHandler);
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderSaving(isSaving) {
    if (isSaving) {
      this.submitButton.textContent = "Сохранение...";
    } else {
      this.submitButton.textContent = this._submitButtonText;
    }
  }
}
