import Popup from "./Popup";
export default class PopupWithForms extends Popup {
  constructor(selector, formSubmitHandler) {
    super(selector);
    this._formElement = document.querySelector(selector);
    this._form = this._formElement.querySelector(".form");
    this.formSubmitHandler = formSubmitHandler; // (data) => {
    //     api.patchProfile({data})
    //   }
    this.submitButton = this._formElement.querySelector(".form__submit-button");
    this.submitButtonText = this.submitButton.textContent;
  }
  _getInputValues() {
    const allInputs = this._formElement.querySelectorAll(".form__input");
    this.formValues = Array.from(allInputs).reduce((acc, currValue) => {
      acc[currValue.name] = currValue.value;
      return acc;
    }, {});
    return this.formValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.renderSaving(true);
      console.log(this._getInputValues());
      
    });
  }
  close() {
    super.close();
    this._form.reset();
  }
  renderSaving(isSaving) {
    if (isSaving) {
      this.submitButton.textContent = "Сохранение...";
    } else {
      this.submitButton.textContent = this.submitButtonText;
    }
  }
}
export const popupForm = new PopupWithForms("#pop-up-edit", submitProfileForm);
popupForm._getInputValues();

function submitProfileForm(evt) {
    evt.preventDefault();
    popupForm.renderSaving(true);
    api.patchProfile(data).then((data) => {
      getProfileInfo.setUserInfo(data);
      popupForm.close();
    });
    console.log("evt");
    popupForm.renderSaving(false);
}
function submitCardForm(evt) {
  evt.preventDefault();
  api.patchProfile(data);
  this.renderSaving(false);
  this.close();
}
function submitAvatarForm(evt) {
  evt.preventDefault();
  api.newAvatar(data);
}
