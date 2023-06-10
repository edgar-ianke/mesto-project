import "../../pages/index.css";
import {
  nameInputEdit,
  jobInputEdit,
  nameInputCreate,
  linkInputCreate,
  openForm,
  closeForm,
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

import { formElementAvatar, formElementCreate, formElementEdit, hideError, submitFormEditHandler } from "./validate";
import { addImg } from "./card";
import { getUserInfo, updateAvatar } from "./utils";

buttonEdit.addEventListener("click", function () {
  nameInputEdit.value = profileName.textContent;
  jobInputEdit.value = profileDescription.textContent;
  hideError(formElementEdit, nameInputEdit);
  hideError(formElementEdit, jobInputEdit);
  const buttonElement = popUpEdit.querySelector(".form__submit-button");
  buttonElement.classList.add("form__submit-button_disabled");
  buttonElement.disabled = true;
  openForm(popUpEdit);
});
buttonCloseEdit.addEventListener("click", function (evt) {
  closeForm(popUpEdit);
});

buttonCreate.addEventListener("click", function (evt) {
  nameInputCreate.value = "";
  linkInputCreate.value = "";
  hideError(formElementCreate, nameInputCreate);
  hideError(formElementCreate, linkInputCreate);
  const buttonElement = popUpCreate.querySelector(".form__submit-button");
  buttonElement.classList.add("form__submit-button_disabled");
  buttonElement.disabled = true;
  openForm(popUpCreate);
});
buttonCloseCreate.addEventListener("click", function (evt) {
  closeForm(popUpCreate);
});
formElementCreate.addEventListener("submit", addImg);

buttonCloseImg.addEventListener("click", () => closeForm(popupFullImg));

popUpEdit.addEventListener("mousedown", (evt) => {
  if (evt.target.id === "pop-up-edit") {
    closeForm(popUpEdit);
  }
});
document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    closeForm(popUpEdit);
    closeForm(popUpCreate);
    closeForm(popupFullImg);
    closeForm(popUpAvatar);
  }
});
popUpCreate.addEventListener("mousedown", (evt) => {
  if (evt.target.id === "pop-up-create") {
    closeForm(popUpCreate);
  }
});
popupFullImg.addEventListener("mousedown", (evt) => {
  if (evt.target.id === "pop-up-full-img") {
    closeForm(popupFullImg);
  }
});
popUpAvatar.addEventListener("mousedown", (evt) => {
  if (evt.target.id === "pop-up-avatar") {
    closeForm(popUpAvatar);
  }
});
formElementEdit.addEventListener("submit", submitFormEditHandler);
getUserInfo();

avatarEdit.addEventListener("click", function () {
  linkInputAvatar.value = "";
  hideError(formElementAvatar, linkInputAvatar);
  const buttonElement = popUpAvatar.querySelector(".form__submit-button");
  buttonElement.classList.add("form__submit-button_disabled");
  buttonElement.disabled = true;
  openForm(popUpAvatar);
});
buttonCloseAvatar.addEventListener("click", function (evt) {
  closeForm(popUpAvatar);
});
formElementAvatar.addEventListener("submit", function (evt) {
  evt.preventDefault();
  updateAvatar(evt);
  avatarEdit.src = linkInputAvatar.value;
});
