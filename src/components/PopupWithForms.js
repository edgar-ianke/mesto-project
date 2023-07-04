import Popup from "./Popup";
import { getProfileInfo } from "./UserInfo";
import { api } from "./Api-class";
import Card from "./Card-class";
import { popupWithImage } from "./utils";
import Section from "./Section";
export default class PopupWithForms extends Popup {
  constructor(selector, formSubmitHandler) {
    super(selector);
    this._popupElement = document.querySelector(selector);
    this._form = this._popupElement.querySelector(".form");
    this._formSubmitHandler = formSubmitHandler.bind(this);
    this._submitButton = this._popupElement.querySelector(".form__submit-button");
    this._submitButtonText = this._submitButton.textContent;
  }
  _getInputValues() {
    const allInputs = this._popupElement.querySelectorAll(".form__input");
    this.formValues = Array.from(allInputs).reduce((acc, currValue) => {
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
      this._submitButton.textContent = "Сохранение...";
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}
export const popupProfileForm = new PopupWithForms("#pop-up-edit", submitProfileForm);
export const popupAvatarForm = new PopupWithForms("#pop-up-avatar", submitAvatarForm);
export const popupCardForm = new PopupWithForms("#pop-up-create", submitCardForm);
function submitProfileForm(evt) {
  evt.preventDefault();
  this.renderSaving(true);
  api
    .patchProfile(this._getInputValues())
    .then((data) => {
      getProfileInfo.setUserInfo(data);
    })
    .catch((err) => {
      api.handleError(err);
    })
    .finally(() => {
      this.renderSaving(false);
      this.close();
    });
}
function submitCardForm(evt) {
  evt.preventDefault();
  this.renderSaving(true);
  api
    .loadCard(this._getInputValues())
    .then((res) => {
      const sectionCardSingle = new Section(
        {
          data: [res],
          renderer: (item) => {
            const cardSingle = new Card(item, "#element", (img) => {
              popupWithImage.open(img);
            });
            const cardElement = cardSingle.generate();
            sectionCardSingle.perependItem(cardElement);
          },
        },
        ".elements"
      );
      sectionCardSingle.renderItems();
    })
    .catch((err) => {
      api.handleError(err);
    })
    .finally(() => {
      this.renderSaving(false);
      this.close();
    });
}
function submitAvatarForm(evt) {
  evt.preventDefault();
  this.renderSaving(true);
  api
    .newAvatar(this._getInputValues())
    .then((data) => getProfileInfo.setUserInfo(data))
    .catch((err) => {
      api.handleError(err);
    })
    .finally(() => {
      this.renderSaving(false);
      this.close();
    });
}
