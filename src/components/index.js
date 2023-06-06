import "../../pages/index.css";
import {
  buttonEdit,
  buttonCloseEdit,
  popUpEdit,
  buttonCreate,
  buttonCloseCreate,
  buttonCloseImg,
  popUpCreate,
  nameInputEdit,
  jobInputEdit,
  nameInputCreate,
  linkInputCreate,
  profileName,
  profileDescription,
  openForm,
  closeForm,
  popupFullImg,
} from "./modal";

import { formElementCreate, formElementEdit, hideError, submitFormEditHandler } from "./validate";
import { addImg, addElement } from "./card";

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

buttonEdit.addEventListener("click", () => openForm(popUpEdit));
buttonCloseEdit.addEventListener("click", function () {
  closeForm(popUpEdit);
  nameInputEdit.value = profileName.textContent;
  jobInputEdit.value = profileDescription.textContent;
  hideError(document.querySelector("#edit-form"), nameInputEdit);
  hideError(document.querySelector("#edit-form"), jobInputEdit);
});

buttonCreate.addEventListener("click", function () {
  openForm(popUpCreate);
  nameInputCreate.value = "";
  linkInputCreate.value = "";
  hideError(document.querySelector("#create-form"), nameInputCreate);
  hideError(document.querySelector("#create-form"), linkInputCreate);
  
});
buttonCloseCreate.addEventListener("click", () => closeForm(popUpCreate));
formElementCreate.addEventListener("submit", addImg);

buttonCloseImg.addEventListener("click", () => closeForm(popupFullImg));

popUpEdit.addEventListener("mousedown", (evt) => {
  if (evt.target.id === "pop-up-edit") {
    closeForm(popUpEdit);
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
document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    closeForm(popUpEdit);
    closeForm(popUpCreate);
    closeForm(popupFullImg);
  }
});
formElementEdit.addEventListener("submit", submitFormEditHandler);

initialCards.forEach(addElement);
