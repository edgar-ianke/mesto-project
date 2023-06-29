import "../../src/pages/index.css";
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
} from "./modal";

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
} from "./utils";

import {settingForm, FormValidator} from './Validate-class'

import { addImg } from "./cards";
import { getUserInfo, updateAvatar } from "./utils";
import Popup from "./Popup";

///////////////////
const popupUser = new Popup("#pop-up-edit");
const popopCard = new Popup("#pop-up-create");
const popupAvatar = new Popup("#pop-up-avatar");
const popupImg = new Popup("#pop-up-full-img");

const formElementEdit = document.querySelector("#edit-form");
const formElementCreate = document.querySelector("#create-form");
const formElementAvatar = document.querySelector("#avatar-form");

const cardForm = new FormValidator({settingForm}, formElementCreate);
const userForm = new FormValidator({settingForm}, formElementEdit);
const avatarForm = new FormValidator({settingForm}, formElementAvatar);

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
  popopCard.open();
});
buttonCloseCreate.addEventListener("click", function () {
  //closePopUp(popUpCreate);
  popopCard.close();
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
    popopCard.close();
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

