import { getInfo, patchProfile, newAvatar, getCards } from "./api";
import {
  nameInputEdit,
  jobInputEdit,
  renderSaving,
  closePopUp,
  popUpEdit,
  popUpAvatar,
  linkInputAvatar,
} from "./modal";
import { addElement } from "./card";

const buttonEdit = document.querySelector(".profile__edit-button");
const buttonCloseEdit = document.querySelector("#edit-close");
const avatarEdit = document.querySelector(".profile__avatar");

const buttonCreate = document.querySelector(".profile__add-button");
const buttonCloseCreate = document.querySelector("#create-close");
const buttonCloseImg = document.querySelector("#img-close");
const buttonCloseAvatar = document.querySelector("#avatar-close");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

let userInfo = {};

function getUserInfo() {
  Promise.all([getInfo(), getCards()])
    .then(([infoRes, cardsRes]) => {
      userInfo = Object.assign({}, infoRes);
      profileName.textContent = infoRes.name;
      profileDescription.textContent = infoRes.about;
      nameInputEdit.value = infoRes.name;
      jobInputEdit.value = infoRes.about;
      avatarEdit.src = infoRes.avatar;
      cardsRes.forEach(addElement);
    })
    .catch((error) => console.error(`Ошибка getUserInfo ${error}`));
}

function updateAvatar(evt) {
  const buttonText = evt.target.querySelector(".form__submit-button").textContent;
  renderSaving(evt, true, buttonText);
  newAvatar(linkInputAvatar.value)
    .then((res) => {
      avatarEdit.src = res.avatar;
    })
    .catch((error) => console.error(`Ошибка при обновлении аватара ${error}`))
    .finally(() => {
      closePopUp(popUpAvatar);
      renderSaving(evt, false, buttonText);
    });
}
function editProfile(evt) {
  const buttonText = evt.target.querySelector(".form__submit-button").textContent;
  renderSaving(evt, true, buttonText);
  patchProfile(nameInputEdit.value, jobInputEdit.value)
    .then((res) => {
      profileName.textContent = res.name;
      profileDescription.textContent = res.about;
    })
    .catch((error) => console.error(`Ошибка при обновлении профиля ${error}`))
    .finally(() => {
      closePopUp(popUpEdit);
      renderSaving(evt, false, buttonText);
    });
}

export {
  buttonEdit,
  buttonCloseEdit,
  avatarEdit,
  buttonCreate,
  buttonCloseCreate,
  buttonCloseImg,
  buttonCloseAvatar,
  profileName,
  profileDescription,
  updateAvatar,
  getUserInfo,
  editProfile,
  userInfo,
};
