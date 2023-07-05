import "./index.css";
import { settingForm, FormValidator } from "../components/Validate-class";
import PopupWithForms from "../components/PopupWithForms";
import { api } from "../components/Api-class";
import Card from "../components/Card-class";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";
import UserInfo, { objSelectors } from "../components/UserInfo";
import {
  buttonCreate,
  buttonEdit,
  avatarEdit,
  formElementAvatar,
  formElementEdit,
  formElementCreate,
} from "../../utils/consts";

export const popupWithImage = new PopupWithImage(".pop-up_full-img");
export const popupProfileForm = new PopupWithForms("#pop-up-edit", submitProfileForm);
export const popupAvatarForm = new PopupWithForms("#pop-up-avatar", submitAvatarForm);
export const popupCardForm = new PopupWithForms("#pop-up-create", submitCardForm);
export const profileInfo = new UserInfo(objSelectors);

const cardForm = new FormValidator(settingForm, formElementCreate);
const userForm = new FormValidator(settingForm, formElementEdit);
const avatarForm = new FormValidator(settingForm, formElementAvatar);

cardForm.enableValidation();
userForm.enableValidation();
avatarForm.enableValidation();

Promise.all([api.getInfo(), api.getCards()])
  .then(([infoRes, cardsRes]) => {
    profileInfo.setUserInfo(infoRes);
    console.log(profileInfo)
     nameInputEdit.value = infoRes.name;
     jobInputEdit.value = infoRes.about;
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

function submitProfileForm(evt) {
  evt.preventDefault();
  this.renderSaving(true);
  api
    .patchProfile(this._getInputValues())
    .then((data) => {
      profileInfo.setUserInfo(data);
    })
    .catch((err) => {
      api.handleError(err);
    })
    .finally(() => {
      this.renderSaving(false);
      this.close();
    });
}
function submitCardForm(evt) {
  evt.preventDefault();
  this.renderSaving(true);
  api
    .loadCard(this._getInputValues())
    .then((res) => {
      const sectionCardSingle = new Section(
        {
          data: [res],
          renderer: (item) => {
            const cardSingle = new Card(item, "#element", (img) => {
              popupWithImage.open(img);
            });
            const cardElement = cardSingle.generate();
            sectionCardSingle.perependItem(cardElement);
          },
        },
        ".elements"
      );
      sectionCardSingle.renderItems();
    })
    .catch((err) => {
      api.handleError(err);
    })
    .finally(() => {
      this.renderSaving(false);
      this.close();
    });
}
function submitAvatarForm(evt) {
  evt.preventDefault();
  this.renderSaving(true);
  api
    .newAvatar(this._getInputValues())
    .then((data) => profileInfo.setUserInfo(data))
    .catch((err) => {
      api.handleError(err);
    })
    .finally(() => {
      this.renderSaving(false);
      this.close();
    });
}

//--------------------------------------------------------------------------------------------------//

buttonEdit.addEventListener("click", function () {
  popupProfileForm.open();
  popupProfileForm.formArray.forEach(element => {
    userForm._hideError(element);
  })
  userForm._disableButton(popupProfileForm.submitButton);
});

buttonCreate.addEventListener("click", function () {
  popupCardForm.open();
  popupCardForm.formArray.forEach(element => {
    userForm._hideError(element);
  })
  userForm._disableButton(popupCardForm.submitButton);
});

avatarEdit.addEventListener("click", function () {
  popupAvatarForm.open();
  popupAvatarForm.formArray.forEach(element => {
    userForm._hideError(element);
  })
  userForm._disableButton(popupAvatarForm.submitButton);
});


// buttonCloseCreate.addEventListener("click", function () {
//   //closePopUp(popUpCreate);
//   popupCard.close();
// });
// < -------------------------- добавление карточки
// formElementCreate.addEventListener("submit", addImg);

// formElementCreate.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   const { name, link } = evt.target.elements;
//   //evt.submitter.textContent = 'Сохранение...'
//   api.loadCard(name.value, link.value)
//     .then((res) => {
//       const sectionCards = new Section(
//         {
//           data: res,
//           renderer: (item) => {
//             const card = new Card(item, "#element", (item) => {
//               popupWithImage.open(item);
//             });
//             const cardElement = card.generate();
//             sectionCards.addItem(cardElement);
//           },
//         }, ".elements")
//       console.log(sectionCards)
//     })
//     .catch((error) => console.error(`Ошибка ${error}`));
//   popupCard.close()
// });
// < -------------------------- добавление карточки

// buttonCloseImg.addEventListener("click", () => popupImg.close());

// popUpEdit.addEventListener("mousedown", (evt) => {
//   if (evt.target.id === "pop-up-edit") {
//     //closePopUp(popUpEdit);
//     //popupProfileForm.close();
//     popupProfileForm.close()
//   }
// });

// popUpCreate.addEventListener("mousedown", (evt) => {
//   if (evt.target.id === "pop-up-create") {
//     //popupCard.close();
//   }
// });
// popupFullImg.addEventListener("mousedown", (evt) => {
//   if (evt.target.id === "pop-up-full-img") {
//     //closePopUp(popupFullImg);
//     popupImg.close();
//   }
// });
// popUpAvatar.addEventListener("mousedown", (evt) => {
//   if (evt.target.id === "pop-up-avatar") {
//     //closePopUp(popUpAvatar);
//     //popupAvatar.close();
//     popupAvatarForm.close()
//   }
// });
// formElementEdit.addEventListener("submit", submitFormEditHandler);
//profileInfo.getUserInfo();

// buttonCloseAvatar.addEventListener("click", function () {
//   closePopUp(popUpAvatar);
//   popupAvatar.close();
//   popupAvatarForm.close()
// });
// formElementAvatar.addEventListener("submit", function (evt) {
//   evt.preventDefault();
//   updateAvatar(evt);
// });

// //////////////////////////////
// // const popupProfileForm = new PopupWithForms('#pop-up-edit', { formSubmitHandler: submitProfileForm });
// // popupProfileForm.setEventListeners();

// // function submitProfileForm(profile) {
// //   popupProfileForm.renderSaving(true);

// //   api.patchProfile(profile)
// //     .then((data) => {
// //       profileInfo.setUserInfo(data);
// //       popupProfileForm.close()
// //     })
// //     .catch((err) => { api.handleError(err) })
// //     .finally(() => { popupProfileForm.renderSaving(false) })
// // }

// //////////////////////////////
// const popupAvatarForm = new PopupWithForms('#pop-up-avatar', { formSubmitHandler: submitAvatarForm });
// popupAvatarForm.setEventListeners();

// function submitAvatarForm({link}) {
//   popupAvatarForm.renderSaving(true);
//   api.newAvatar(link)
//     .then((data) => {
//       profileInfo.setUserInfo(data);
//       popupAvatarForm.close();
//     })
//     .catch((err) => { api.handleError(err)})
//     .finally(() => { popupAvatarForm.renderSaving(false) })
// }

//////////////////////////////
// const cardSection = new Section(/*{ data, renderer }, selector */)
// const popupCardForm = new PopupWithForms('#pop-up-create', { formSubmitHandler: submitCardForm });
// popupCardForm.setEventListeners();

// function submitCardForm(card) {
//   popupCardForm.renderSaving(true);

//   api.patchProfile(card)
//     .then((card) => {
//       // X <------ здесь нужно вызвать метод Section.addItem(element)
//       popupCardForm.close()
//     })
//     .catch((err) => { api.handleError(err) })
//     .finally(() => { popupCardForm.renderSaving(false) })
// }
