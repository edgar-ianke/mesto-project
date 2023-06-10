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

function openForm(form) {
  form.classList.remove("pop-up_disabled");
}

function closeForm(form) {
  form.classList.add("pop-up_disabled");
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
  openForm,
  closeForm,
  linkInputAvatar,
  renderSaving,
};
