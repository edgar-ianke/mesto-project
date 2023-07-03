import "./index.css";
import {
  nameInputEdit,
  jobInputEdit,
  nameInputCreate,
  linkInputCreate,
  openPopUp,
  closePopUp,
  popupFullImg,
  popUpEdit,
  popUpCreate,
  popUpAvatar,
  linkInputAvatar,
  buttonSubmitCreateCard,
  buttonSubmitEditCard,
  buttonSubmitAvatarCard,
} from "../components/modal";
import {
  buttonEdit,
  buttonCloseEdit,
  buttonCreate,
  buttonCloseCreate,
  buttonCloseImg,
  profileName,
  profileDescription,
  avatarEdit,
  buttonCloseAvatar,
  // submitFormEditHandler,
} from "../components/utils";
import { settingForm, FormValidator } from '../components/Validate-class'

import { addImg } from "../components/cards";
import { getUserInfo, updateAvatar } from "../components/utils";
import Popup from "../components/Popup";
//import PopupWithForms, { popupForm } from "../components/PopupWithForms";
import PopupWithForms from "../components/PopupWithForms";
import { getProfileInfo } from "../components/UserInfo";
import { api } from "../components/Api-class";
import Card from "../components/Card-class";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";
///////////////////
export const popupWithImage = new PopupWithImage(".pop-up_full-img");

//const popupUser = new Popup("#pop-up-edit");
const popupCard = new Popup("#pop-up-create");
const popupAvatar = new Popup("#pop-up-avatar");
const popupImg = new Popup("#pop-up-full-img");

const formElementEdit = document.querySelector("#edit-form");
const formElementCreate = document.querySelector("#create-form");
const formElementAvatar = document.querySelector("#avatar-form");

const cardForm = new FormValidator(settingForm, formElementCreate);
const userForm = new FormValidator(settingForm, formElementEdit);
const avatarForm = new FormValidator(settingForm, formElementAvatar);

cardForm.enableValidation()
userForm.enableValidation()
avatarForm.enableValidation()
///////////////////

buttonEdit.addEventListener("click", function () {
  // nameInputEdit.value = profileName.textContent;
  // jobInputEdit.value = profileDescription.textContent;
  //openPopUp(popUpEdit);
  // popupForm.open();
  // popupForm.setEventListeners();
  popupProfileForm.open();
  popupProfileForm.setEventListeners();
  userForm._hideError(nameInputEdit);
  userForm._hideError(jobInputEdit);
  userForm._disableButton(buttonSubmitEditCard);
});
buttonCloseEdit.addEventListener("click", function () {
  //closePopUp(popUpEdit)
  //popupForm.close();
  popupProfileForm.close();
});

buttonCreate.addEventListener("click", function () {
  //nameInputCreate.value = "";
  //linkInputCreate.value = "";
  document.forms.card.reset(); /*<-------- не забыть убрать*/
  cardForm._hideError(nameInputCreate);
  cardForm._hideError(linkInputCreate);
  cardForm._disableButton(buttonSubmitCreateCard);
  //openPopUp(popUpCreate);
  popupCard.open();
});
buttonCloseCreate.addEventListener("click", function () {
  //closePopUp(popUpCreate);
  popupCard.close();
});
// < -------------------------- добавление карточки
// formElementCreate.addEventListener("submit", addImg); 

formElementCreate.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const { name, link } = evt.target.elements;
  //evt.submitter.textContent = 'Сохранение...'
  api.loadCard(name.value, link.value)
    .then((res) => {
      const sectionCards = new Section(
        {
          data: res,
          renderer: (item) => {
            const card = new Card(item, "#element", (item) => {
              popupWithImage.open(item);
            });
            const cardElement = card.generate();
            sectionCards.addItem(cardElement);
          },
        }, ".elements")
      console.log(sectionCards)
    })
    .catch((error) => console.error(`Ошибка ${error}`));
  popupCard.close()
});
// < -------------------------- добавление карточки

buttonCloseImg.addEventListener("click", () => popupImg.close());

popUpEdit.addEventListener("mousedown", (evt) => {
  if (evt.target.id === "pop-up-edit") {
    //closePopUp(popUpEdit);
    //popupForm.close();
    popupProfileForm.close()
  }
});

// popUpCreate.addEventListener("mousedown", (evt) => {
//   if (evt.target.id === "pop-up-create") {
//     //popupCard.close();
//   }
// });
popupFullImg.addEventListener("mousedown", (evt) => {
  if (evt.target.id === "pop-up-full-img") {
    //closePopUp(popupFullImg);
    popupImg.close();
  }
});
popUpAvatar.addEventListener("mousedown", (evt) => {
  if (evt.target.id === "pop-up-avatar") {
    //closePopUp(popUpAvatar);
    //popupAvatar.close();
    popupAvatarForm.close()
  }
});
// formElementEdit.addEventListener("submit", submitFormEditHandler);
getUserInfo();
//getProfileInfo.getUserInfo();

avatarEdit.addEventListener("click", function () {
  linkInputAvatar.value = "";
  avatarForm._hideError(linkInputAvatar);
  avatarForm._disableButton(buttonSubmitAvatarCard);
  //openPopUp(popUpAvatar);
  //popupAvatar.open();
  popupAvatarForm.open()
});
buttonCloseAvatar.addEventListener("click", function () {
  //closePopUp(popUpAvatar);
  //popupAvatar.close();
  popupAvatarForm.close()
});
// formElementAvatar.addEventListener("submit", function (evt) {
//   evt.preventDefault();
//   updateAvatar(evt);
// })

////////////////////////////// 
const popupProfileForm = new PopupWithForms('#pop-up-edit', { formSubmitHandler: submitProfileForm });
popupProfileForm.setEventListeners();

function submitProfileForm(profile) {
  popupProfileForm.renderSaving(true);

  api.patchProfile(profile)
    .then((data) => {
      getProfileInfo.setUserInfo(data);
      popupProfileForm.close()
    })
    .catch((err) => { api.handleError(err) })
    .finally(() => { popupProfileForm.renderSaving(false) })
}

////////////////////////////// 
const popupAvatarForm = new PopupWithForms('#pop-up-avatar', { formSubmitHandler: submitAvatarForm });
popupAvatarForm.setEventListeners();

function submitAvatarForm({link}) {
  popupAvatarForm.renderSaving(true);
  api.newAvatar(link)
    .then((data) => {
      getProfileInfo.setUserInfo(data);
      popupAvatarForm.close();
    })
    .catch((err) => { api.handleError(err)})
    .finally(() => { popupAvatarForm.renderSaving(false) })
}

////////////////////////////// 
const cardSection = new Section(/*{ data, renderer }, selector */)
const popupCardForm = new PopupWithForms('#pop-up-create', { formSubmitHandler: submitCardForm });
popupCardForm.setEventListeners();

function submitCardForm(card) {
  popupCardForm.renderSaving(true);

  api.patchProfile(card)
    .then((card) => {
      // X <------ здесь нужно вызвать метод Section.addItem(element) 
      popupCardForm.close()
    })
    .catch((err) => { api.handleError(err) })
    .finally(() => { popupCardForm.renderSaving(false) })
}