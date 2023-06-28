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
} from "./utils";

import {
  disableButton,
  formElementAvatar,
  formElementCreate,
  formElementEdit,
  hideError,
  submitFormEditHandler,
} from "./validate";
import { addImg } from "./cards";
import { getUserInfo, updateAvatar } from "./utils";
import Popup from "./Popup";

export const popUpEditXX = new Popup("#pop-up-edit");
buttonEdit.addEventListener("click", function () {
  nameInputEdit.value = profileName.textContent;
  jobInputEdit.value = profileDescription.textContent;
  openPopUp(popUpEdit);
  hideError(nameInputEdit);
  hideError(jobInputEdit);
  disableButton(buttonSubmitEditCard);
  // popUpEditXX.open();
});
buttonCloseEdit.addEventListener("click", function () {
  closePopUp(popUpEdit);
});

buttonCreate.addEventListener("click", function () {
  nameInputCreate.value = "";
  linkInputCreate.value = "";
  hideError(nameInputCreate);
  hideError(linkInputCreate);
  disableButton(buttonSubmitCreateCard);
  openPopUp(popUpCreate);
});
buttonCloseCreate.addEventListener("click", function () {
  closePopUp(popUpCreate);
});
formElementCreate.addEventListener("submit", addImg);

buttonCloseImg.addEventListener("click", () => closePopUp(popupFullImg));

popUpEdit.addEventListener("mousedown", (evt) => {
  if (evt.target.id === "pop-up-edit") {
    closePopUp(popUpEdit);
  }
});

popUpCreate.addEventListener("mousedown", (evt) => {
  if (evt.target.id === "pop-up-create") {
    closePopUp(popUpCreate);
  }
});
popupFullImg.addEventListener("mousedown", (evt) => {
  if (evt.target.id === "pop-up-full-img") {
    closePopUp(popupFullImg);
  }
});
popUpAvatar.addEventListener("mousedown", (evt) => {
  if (evt.target.id === "pop-up-avatar") {
    closePopUp(popUpAvatar);
  }
});
formElementEdit.addEventListener("submit", submitFormEditHandler);
getUserInfo();

avatarEdit.addEventListener("click", function () {
  linkInputAvatar.value = "";
  hideError(linkInputAvatar);
  disableButton(buttonSubmitAvatarCard);
  openPopUp(popUpAvatar);
});
buttonCloseAvatar.addEventListener("click", function () {
  closePopUp(popUpAvatar);
});
formElementAvatar.addEventListener("submit", function (evt) {
  evt.preventDefault();
  updateAvatar(evt);
})
