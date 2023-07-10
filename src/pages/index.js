import "./index.css";
import Validate from "../components/Validate";
import PopupWithForms from "../components/PopupWithForms";
import Api from "../components/Api";
import Card from "../components/Card";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";
import UserInfo from "../components/UserInfo";
import {
  buttonCreate,
  buttonEdit,
  avatarEdit,
  formElementAvatar,
  formElementEdit,
  formElementCreate,
  objSelectors,
  settingForm,
  inputName,
  inputAbout,
} from "../utils/consts";

export const api = new Api({
  adress: `https://nomoreparties.co/v1/plus-cohort-25`,
  method: "GET",
  headers: {
    authorization: "02ffe6ee-1e50-4771-9330-975ddbfb736c",
    "Content-Type": "application/json",
  },
});

export const popupWithImage = new PopupWithImage(".pop-up_full-img");
export const popupProfileForm = new PopupWithForms("#pop-up-edit", submitProfileForm);
export const popupAvatarForm = new PopupWithForms("#pop-up-avatar", submitAvatarForm);
export const popupCardForm = new PopupWithForms("#pop-up-create", submitCardForm);
export const profileInfo = new UserInfo(objSelectors);

const cardForm = new Validate(settingForm, formElementCreate);
const userForm = new Validate(settingForm, formElementEdit);
const avatarForm = new Validate(settingForm, formElementAvatar);

cardForm.enableValidation();
userForm.enableValidation();
avatarForm.enableValidation();

function createClassCard(item) {
  const cards = new Card(
    item,
    "#element",
    profileInfo.getUserId(),
    (img) => {
      popupWithImage.open(img);
    },
    (cardId) => api.addLike(cardId),
    (cardId) => api.removeLike(cardId)
  );
  return cards.generate();
}
const cardSection = new Section(
  {
    renderer: (item) => {
      cardSection.addItem(createClassCard(item));
    },
  },
  ".elements"
);
Promise.all([api.getInfo(), api.getCards()])
  .then(([infoRes, cardsRes]) => {
    profileInfo.setUserInfo(infoRes);
    cardSection.renderItems(cardsRes);
  })
  .catch((error) => console.error(`Ошибка ${error}`));

function submitProfileForm(profile) {
  this.renderSaving(true);
  api
    .patchProfile(profile)
    .then((data) => {
      profileInfo.setUserInfo(data);
    })
    .then(() => this.close())
    .catch((err) => {
      api.checkResponse(err);
    })
    .finally(() => {
      this.renderSaving(false);
    });
}
function submitCardForm(card) {
  this.renderSaving(true);
  api
    .loadCard(card)
    .then((card) => {
      cardSection.prependItem(createClassCard(card));
    })
    .then(() => this.close())
    .catch((err) => {
      api.checkResponse(err);
    })
    .finally(() => {
      this.renderSaving(false);
    });
}
function submitAvatarForm(avatar) {
  this.renderSaving(true);
  api
    .newAvatar(avatar)
    .then((data) => {
      profileInfo.setUserInfo(data);
    })
    .then(() => this.close())
    .catch((err) => {
      api.checkResponse(err);
    })
    .finally(() => {
      this.renderSaving(false);
      this.close();
    });
}
buttonEdit.addEventListener("click", function () {
  userForm.resetError();
  popupProfileForm.open();
  const user = profileInfo.getUserInfo();
  inputName.value = user.name;
  inputAbout.value = user.about;
});
buttonCreate.addEventListener("click", function () {
  popupCardForm.open();
  cardForm.resetError();
});
avatarEdit.addEventListener("click", function () {
  popupAvatarForm.open();
  avatarForm.resetError();
});
