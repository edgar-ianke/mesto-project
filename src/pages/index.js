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
  submitFormEditHandler,
} from "../components/utils";

import {settingForm, FormValidator} from '../components/Validate-class'
import {} from "../components/UserInfo";

import { addImg } from "../components/cards";
import { getUserInfo, updateAvatar } from "../components/utils";
import Popup from "../components/Popup";
import { popupForm } from "../components/PopupWithForms";
import {getProfileInfo} from "../components/UserInfo";
///////////////////
const popupUser = new Popup("#pop-up-edit");
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
  nameInputEdit.value = profileName.textContent;
  jobInputEdit.value = profileDescription.textContent;
  //openPopUp(popUpEdit);
  popupUser.open();
  userForm._hideError(nameInputEdit);
  userForm._hideError(jobInputEdit);
  userForm._disableButton(buttonSubmitEditCard);
});
buttonCloseEdit.addEventListener("click", function () {
  //closePopUp(popUpEdit)
  popupUser.close();
});

buttonCreate.addEventListener("click", function () {
  nameInputCreate.value = "";
  linkInputCreate.value = "";
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
formElementCreate.addEventListener("submit", addImg);

buttonCloseImg.addEventListener("click", () => closePopUp(popupFullImg)); // <--- popUpEditXX.close()

popUpEdit.addEventListener("mousedown", (evt) => {
  if (evt.target.id === "pop-up-edit") {
    //closePopUp(popUpEdit);
    popupUser.close();
  }
});

popUpCreate.addEventListener("mousedown", (evt) => {
  if (evt.target.id === "pop-up-create") {
    //closePopUp(popUpCreate);
    popupCard.close();
  }
});
popupFullImg.addEventListener("mousedown", (evt) => {
  if (evt.target.id === "pop-up-full-img") {
    //closePopUp(popupFullImg);
    popupImg.close();
  }
});
popUpAvatar.addEventListener("mousedown", (evt) => {
  if (evt.target.id === "pop-up-avatar") {
    //closePopUp(popUpAvatar);
    popupAvatar.close();
  }
});
formElementEdit.addEventListener("submit", submitFormEditHandler);
getUserInfo();
//getProfileInfo.getUserInfo();

avatarEdit.addEventListener("click", function () {
  linkInputAvatar.value = "";
  avatarForm._hideError(linkInputAvatar);
  avatarForm._disableButton(buttonSubmitAvatarCard);
  //openPopUp(popUpAvatar);
  popupAvatar.open();
});
buttonCloseAvatar.addEventListener("click", function () {
  //closePopUp(popUpAvatar);
  popupAvatar.close();
});
formElementAvatar.addEventListener("submit", function (evt) {
  evt.preventDefault();
  updateAvatar(evt);
})

