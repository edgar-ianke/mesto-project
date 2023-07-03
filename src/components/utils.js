import { api } from "./Api-class";
import {
  nameInputEdit,
  jobInputEdit,
  renderSaving,
  closePopUp,
  popUpEdit,
  popUpAvatar,
  linkInputAvatar,
} from "./modal";
import { addElement, elementsAll } from "./cards";
import PopupWithImage from "./PopupWithImage";
import Card from "./Card-class";
import Section from "./Section";
import { getProfileInfo } from "./UserInfo";

export const popupWithImage = new PopupWithImage(".pop-up_full-img");

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
  Promise.all([api.getInfo(), api.getCards()])
    .then(([infoRes, cardsRes]) => {
      userInfo = Object.assign({}, infoRes);
      profileName.textContent = infoRes.name;
      profileDescription.textContent = infoRes.about;
      // nameInputEdit.value = infoRes.name;
      // jobInputEdit.value = infoRes.about;
      avatarEdit.src = infoRes.avatar;
      const sectionCards = new Section(
        {
          data: cardsRes,
          renderer: (item) => {
            const cards = new Card(item, "#element", (item) => {
              popupWithImage.open(item);
            });
            const cardElement = cards.generate();
            sectionCards.addItem(cardElement);
          },
        },
        ".elements"
      );
      sectionCards.renderItems();
    })
    .catch((error) => console.error(`Ошибка ${error}`));
}

function updateAvatar(evt) {
  const buttonText = evt.target.querySelector(".form__submit-button").textContent;
  renderSaving(evt, true, buttonText);
  api
    .newAvatar(linkInputAvatar.value)
    .then((res) => {
      avatarEdit.src = res.avatar;
    })
    .catch((error) => console.error(`Ошибка при обновлении аватара ${error}`))
    .finally(() => {
      closePopUp(popUpAvatar);
      renderSaving(evt, false, buttonText);
    });
}
// function editProfile(evt) {
//   const buttonText = evt.target.querySelector(".form__submit-button").textContent;
//   renderSaving(evt, true, buttonText);

//   Promise.resolve()
//     .then(() => {
//       getProfileInfo.setUserInfo();
//     })
//     .finally(() => {
//       closePopUp(popUpEdit);
//       renderSaving(evt, false, buttonText);
//     });

  // const buttonText = evt.target.querySelector(".form__submit-button").textContent;
  // renderSaving(evt, true, buttonText);

  // api
  //   .patchProfile(nameInputEdit.value, jobInputEdit.value)
  //   .then((res) => {
  //     profileName.textContent = res.name;
  //     profileDescription.textContent = res.about;
  //   })
  //   .catch((error) => console.error(`Ошибка при обновлении профиля ${error}`))
  //   .finally(() => {
  //     closePopUp(popUpEdit);
  //     renderSaving(evt, false, buttonText);
  //     });
// }
// function submitFormEditHandler(evt) {
//   evt.preventDefault();
//   editProfile(evt);
// }

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
 // submitFormEditHandler,
  updateAvatar,
  getUserInfo,
  //editProfile,
  userInfo,
};