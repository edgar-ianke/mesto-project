import Popup from "./Popup";
export default class PopupWithForms extends Popup {
  constructor(selector, formSubmitHandler) {
    super(selector);
    this._formElement = document.querySelector(selector);
    this.formSubmitHandler = formSubmitHandler;
    this.submitButton = this._formElement.querySelector(".form__submit-button");
    this.submitButtonText = this.submitButton.textContent;
  }
  _getInputValues() {
    const allForms = this._formElement.querySelectorAll(".form__input")
    this.formValues = Array.from(allForms).reduce((acc, currValue) => {
      console.log(acc);
      acc[currValue.name] = currValue.placeholder;
      return acc;
    }, {});
    return this.formValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this.submitButton.addEventListener("submit", this.submitButton);
  }
  close() {
    super.close();
    this._formElement.reset();
  }
  renderSaving(isSaving) {
    if (isSaving) {
      this.submitButton.textContent = "Сохранение...";
    } else {
      this.submitButton.textContent = this.submitButtonText;
    }
  }
}
export const popupForm = new PopupWithForms("#pop-up-create", 25);

console.log(popupForm._getInputValues());
function submitProfileForm(evt) {
  evt.preventDefault();
  api.patchProfile(data);
  api.
  this.renderSaving(false);
}
