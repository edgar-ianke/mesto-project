const buttonEdit = document.querySelector(".profile__edit-button");
const buttonCloseEdit = document.querySelector("#edit-close");
const popUpEdit = document.querySelector("#pop-up-edit");
const buttonCreate = document.querySelector(".profile__add-button");
const buttonCloseCreate = document.querySelector("#create-close");
const buttonCloseImg = document.querySelector("#img-close");
const popUpCreate = document.querySelector("#pop-up-create");
const nameInputEdit = document.querySelector("#author-name");
const jobInputEdit = document.querySelector("#author-description");

const nameInputCreate = document.querySelector("#create-name");
const linkInputCreate = document.querySelector("#create-link");

const popupFullImg = document.querySelector("#pop-up-full-img");
const fullImg = popupFullImg.querySelector(".full-img");
const fullImgInfo = popupFullImg.querySelector(".full-img__info");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

function openForm(form) {
  form.classList.remove("pop-up_disabled");
}

function closeForm(form) {
  form.classList.add("pop-up_disabled");
}
export {
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
  fullImg,
  fullImgInfo,
  profileName,
  profileDescription,
  popupFullImg,
  openForm,
  closeForm,
};
