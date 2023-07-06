import "./index.css";
import { settingForm, FormValidator } from "../components/Validate-class";
import PopupWithForms from "../components/PopupWithForms";
import { api } from "../components/Api-class";
import Card from "../components/Card-class";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";
import UserInfo, { objSelectors } from "../components/UserInfo";
import {
  buttonCreate,
  buttonEdit,
  avatarEdit,
  formElementAvatar,
  formElementEdit,
  formElementCreate,
} from "../utils/consts";

export const popupWithImage = new PopupWithImage(".pop-up_full-img");
export const popupProfileForm = new PopupWithForms("#pop-up-edit", submitProfileForm);
export const popupAvatarForm = new PopupWithForms("#pop-up-avatar", submitAvatarForm);
export const popupCardForm = new PopupWithForms("#pop-up-create", submitCardForm);
export const profileInfo = new UserInfo(objSelectors);

const cardForm = new FormValidator(settingForm, formElementCreate);
const userForm = new FormValidator(settingForm, formElementEdit);
const avatarForm = new FormValidator(settingForm, formElementAvatar);

cardForm.enableValidation();
userForm.enableValidation();
avatarForm.enableValidation();

Promise.all([api.getInfo(), api.getCards()])
  .then(([infoRes, cardsRes]) => {
    profileInfo.setUserInfo(infoRes);
    const sectionCards = new Section(
      {
        data: cardsRes,
        renderer: (item) => {
          const cards = new Card(item, "#element", (item) => {
            popupWithImage.open(item);
          });
          const cardElement = cards.generate();
          sectionCards.addItem(cardElement);
        },
      },
      ".elements"
    );
    sectionCards.renderItems();
  })
  .catch((error) => console.error(`Ошибка ${error}`));

function submitProfileForm(evt) {
  evt.preventDefault();
  this.renderSaving(true);
  api
    .patchProfile(this._getInputValues())
    .then((data) => {
      profileInfo.setUserInfo(data);
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
    .then((data) => profileInfo.setUserInfo(data))
    .catch((err) => {
      api.handleError(err);
    })
    .finally(() => {
      this.renderSaving(false);
      this.close();
    });
}

buttonEdit.addEventListener("click", function () {
  popupProfileForm.open();
  const user = profileInfo.getUserInfo();
  popupProfileForm.formArray.forEach((element) => {
    userForm._hideError(element);
    if (element.id === "author-name") {
      element.value = user.name;
    } else if ((element.id === "author-description")) {
      element.value = user.about;
    }
  });
  userForm._disableButton(popupProfileForm.submitButton);
});

buttonCreate.addEventListener("click", function () {
  popupCardForm.open();
  popupCardForm.formArray.forEach((element) => {
    userForm._hideError(element);
  });
  userForm._disableButton(popupCardForm.submitButton);
});

avatarEdit.addEventListener("click", function () {
  popupAvatarForm.open();
  popupAvatarForm.formArray.forEach((element) => {
    userForm._hideError(element);
  });
  userForm._disableButton(popupAvatarForm.submitButton);
});
