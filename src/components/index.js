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
  toggleButton,
} from "./validate";
import { addImg } from "./card";
import { getUserInfo, updateAvatar } from "./utils";

buttonEdit.addEventListener("click", function () {
  nameInputEdit.value = profileName.textContent;
  jobInputEdit.value = profileDescription.textContent;
  hideError(formElementEdit, nameInputEdit, "form__input_error");
  hideError(formElementEdit, jobInputEdit, "form__input_error");
  disableButton(popUpEdit.firstElementChild.firstElementChild.lastElementChild, "form__submit-button_disabled");
  openPopUp(popUpEdit);
});
buttonCloseEdit.addEventListener("click", function (evt) {
  closePopUp(popUpEdit);
});

buttonCreate.addEventListener("click", function (evt) {
  nameInputCreate.value = "";
  linkInputCreate.value = "";
  hideError(formElementCreate, nameInputCreate, "form__input_error");
  hideError(formElementCreate, linkInputCreate, "form__input_error");
  disableButton(popUpCreate.firstElementChild.firstElementChild.lastElementChild, "form__submit-button_disabled");
  openPopUp(popUpCreate);
});
buttonCloseCreate.addEventListener("click", function (evt) {
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
  hideError(formElementAvatar, linkInputAvatar);
  disableButton(popUpAvatar.firstElementChild.firstElementChild.lastElementChild, "form__submit-button_disabled");
  openPopUp(popUpAvatar);
});
buttonCloseAvatar.addEventListener("click", function (evt) {
  closePopUp(popUpAvatar);
});
formElementAvatar.addEventListener("submit", function (evt) {
  evt.preventDefault();
  updateAvatar(evt);
  avatarEdit.src = linkInputAvatar.value;
});
