import { getInfo, patchProfile, newAvatar } from "./api";
import { nameInputEdit, jobInputEdit, renderSaving, closePopUp, popUpEdit, popUpAvatar } from "./modal";
import { getInitialCards } from "./card";

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
  getInfo().then((result) => {
    userInfo = Object.assign({}, result);
    profileName.textContent = result.name;
    profileDescription.textContent = result.about;
    nameInputEdit.value = result.name;
    jobInputEdit.value = result.about;
    avatarEdit.src = result.avatar;
    getInitialCards();
  });
}

function updateAvatar(evt) {
  const buttonText = evt.target.lastElementChild.textContent;
  renderSaving(evt, true, buttonText);
  newAvatar()
    .then((res) => {
      avatarEdit.src = res.avatar;
    })
    .finally(() => {
      closePopUp(popUpAvatar);
      renderSaving(evt, false, buttonText);
    });
}
function editProfile(evt) {
  const buttonText = evt.target.lastElementChild.textContent;
  renderSaving(evt, true, buttonText);
  patchProfile()
    .then((res) => {
      profileName.textContent = res.name;
      profileDescription.textContent = res.about;
    })
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
