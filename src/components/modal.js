//import {popUpEditXX} from './index.js'


const nameInputEdit = document.querySelector("#author-name");
const jobInputEdit = document.querySelector("#author-description");

const nameInputCreate = document.querySelector("#create-name");
const linkInputCreate = document.querySelector("#create-link");

const popupFullImg = document.querySelector("#pop-up-full-img");
const fullImg = popupFullImg.querySelector(".full-img");
const fullImgInfo = popupFullImg.querySelector(".full-img__info");

const popUpEdit = document.querySelector("#pop-up-edit");
const popUpCreate = document.querySelector("#pop-up-create");
const popUpAvatar = document.querySelector("#pop-up-avatar");
const linkInputAvatar = document.querySelector("#avatar-link");

const buttonSubmitCreateCard = popUpCreate.querySelector(".form__submit-button");
const buttonSubmitEditCard = popUpEdit.querySelector(".form__submit-button");
const buttonSubmitAvatarCard = popUpAvatar.querySelector(".form__submit-button");

function openPopUp(popUp) {
  popUp.classList.add("pop-up_active");
  document.addEventListener("keydown", closeOnEsc);
}
function closeOnEsc(evt) {
  if (evt.key === "Escape") {
    const activePopUp = document.querySelector('.pop-up_active');
    closePopUp(activePopUp);
  }
}

function closePopUp(popUp) {
  popUp.classList.remove("pop-up_active");
  document.removeEventListener("keydown", closeOnEsc);
}

function renderSaving(evt, isSaving, buttonText) {
  if (isSaving) {
    evt.target.lastElementChild.textContent = "Сохранение...";
  } else {
    evt.target.lastElementChild.textContent = buttonText;
  }
}

export {
  nameInputEdit,
  jobInputEdit,
  nameInputCreate,
  linkInputCreate,
  fullImg,
  fullImgInfo,
  popupFullImg,
  popUpCreate,
  popUpEdit,
  popUpAvatar,
  openPopUp,
  closePopUp,
  linkInputAvatar,
  renderSaving,
  buttonSubmitCreateCard,
  buttonSubmitEditCard, 
  buttonSubmitAvatarCard
};
