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
  const cards = new Card(item, "#element", profileInfo.getUserId(), (img) => {
    popupWithImage.open(img);
  })
  return cards.generate();
}

Promise.all([api.getInfo(), api.getCards()])
  .then(([infoRes, cardsRes]) => {
    profileInfo.setUserInfo(infoRes);
    const sectionCards = new Section(
      {
        data: cardsRes,
        renderer: (item) => {
          sectionCards.addItem(createClassCard(item));
        },
      },
      ".elements"
    );
    sectionCards.renderItems();
  })
  .catch((error) => console.error(`Ошибка ${error}`));
function submitProfileForm(profile) {
  //evt.preventDefault();
  this.renderSaving(true);
  api
    .patchProfile(profile)
    .then((data) => {
      profileInfo.setUserInfo(data);
      this.close();
    })
    .catch((err) => {
      api.checkResponse(err);
    })
    .finally(() => {
      this.renderSaving(false);
    });
}


function submitCardForm(card) {
  //evt.preventDefault();
  this.renderSaving(true);
  api
    .loadCard(card)
    .then((res) => {
      const sectionCardSingle = new Section(
        {
          data: [res],
          renderer: (item) => {
            sectionCardSingle.perependItem(createClassCard(item))
          },
        },
        ".elements"
      );
      sectionCardSingle.renderItems();
      this.close();
    })
    .catch((err) => {
      api.checkResponse(err);
    })
    .finally(() => {
      this.renderSaving(false);
    });
}
function submitAvatarForm(avatar) {
  //evt.preventDefault();
  this.renderSaving(true);
  api
    .newAvatar(avatar)
    .then((data) => {
      profileInfo.setUserInfo(data);
      this.close();
    })
    .catch((err) => {
      api.checkResponse(err);
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
    userForm.hideError(element);
    if (element.id === "author-name") {
      element.value = user.name;
    } else if (element.id === "author-description") {
      element.value = user.about;
    }
  });
  userForm.disableButton();
});

buttonCreate.addEventListener("click", function () {
  popupCardForm.open();
  popupCardForm.formArray.forEach((element) => {
    cardForm.hideError(element);
  });
  cardForm.disableButton();
});

avatarEdit.addEventListener("click", function () {
  popupAvatarForm.open();
  popupAvatarForm.formArray.forEach((element) => {
    avatarForm.hideError(element);
  });
  avatarForm.disableButton();
});
