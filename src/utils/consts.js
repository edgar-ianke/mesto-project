const buttonEdit = document.querySelector(".profile__edit-button");
const avatarEdit = document.querySelector(".profile__avatar");
const buttonCreate = document.querySelector(".profile__add-button");

const formElementEdit = document.querySelector("#edit-form");
const formElementCreate = document.querySelector("#create-form");
const formElementAvatar = document.querySelector("#avatar-form");

const inputName = formElementEdit.querySelector("#author-name");
const inputAbout = formElementEdit.querySelector("#author-description");

const objSelectors = {
  name: ".profile__name",
  description: ".profile__description",
  avatar: ".profile__avatar",
};
const settingForm = {
  formElementsAll: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_disabled",
  inputErrorClass: "form__input_error",
};

export {
  buttonEdit,
  avatarEdit,
  buttonCreate,
  formElementEdit,
  formElementCreate,
  formElementAvatar,
  objSelectors,
  settingForm,
  inputName,
  inputAbout,
};
