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

const editButton = document.querySelector(".profile__edit-button");
const buttonCloseEdit = document.querySelector("#edit-close");
const popUpEdit = document.querySelector("#pop-up-edit");
const createButton = document.querySelector(".profile__add-button");
const buttonCloseCreate = document.querySelector("#create-close");
const likeButton = document.querySelectorAll(".elements__like");
const buttonCloseImg = document.querySelector("#img-close");

const popUpCreate = document.querySelector("#pop-up-create");
const formElementEdit = document.querySelector("#edit-form");
const formElementCreate = document.querySelector("#create-form");

const nameInputEdit = document.querySelector("#author-name");
const jobInputEdit = document.querySelector("#author-description");

const nameInputCreate = document.querySelector("#create-name");
const linkInputCreate = document.querySelector("#create-link");

const fullImg = document.querySelector("#pop-up-full-img");
const fullImgSrc = fullImg.querySelector(".full-img");
const fullImgInfo = fullImg.querySelector(".full-img__info");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const elementsAll = document.querySelector(".elements");

initialCards.forEach(addElement);

editButton.addEventListener("click", () => toggleForm(popUpEdit));
buttonCloseEdit.addEventListener("click", () => toggleForm(popUpEdit));

createButton.addEventListener("click", () => toggleForm(popUpCreate));
buttonCloseCreate.addEventListener("click", () => toggleForm(popUpCreate));
formElementCreate.addEventListener("submit", addImg);

buttonCloseImg.addEventListener("click", () => toggleForm(fullImg));

formElementEdit.addEventListener("submit", () => formSubmitEditHandler);

function toggleForm(form) {
  form.classList.toggle("pop-up_disabled");
  if (!form.className.includes("pop-up_disabled")) {
    if (form.id === "pop-up-edit") {
      nameInputEdit.value = document.querySelector(".profile__name").textContent;
      jobInputEdit.value = document.querySelector(".profile__description").textContent;
    } else if (form.id === "pop-up-create") {
      nameInputCreate.value = "";
      linkInputCreate.value = "";
    }
  }
}

function formSubmitEditHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInputEdit.value;
  profileDescription.textContent = jobInputEdit.value;
  toggleForm(popUpEdit);
}
function createCard(item) {
  const elementTemplate = document.querySelector("#element").content;
  const cardElement = elementTemplate.querySelector(".elements__element").cloneNode(true);
  cardElement.querySelector(".elements__card").src = item.link;
  cardElement.querySelector(".elements__name").textContent = item.name;
  cardElement.querySelector(".elements__card").setAttribute("alt", item.name);
  const elementLike = cardElement.querySelector(".elements__like");
  const elementDelete = cardElement.querySelector(".elements__urn");
  elementDelete.onclick = function () {
    cardElement.remove();
  };
  elementLike.addEventListener("click", function () {
    elementLike.classList.toggle("elements__like_active");
  });
  const img = cardElement.querySelector(".elements__card");

  img.addEventListener("click", function () {
    fullImgSrc.src = img.src
    fullImgInfo.textContent = cardElement.textContent;
    fullImgSrc.setAttribute("alt", cardElement.textContent.trim());
    toggleForm(fullImg);
  });
  return cardElement;
}

function addElement(item) {
  elementsAll.prepend(createCard(item));
}

function addImg(evt) {
  evt.preventDefault();
  obj = {
    name: nameInputCreate.value,
    link: linkInputCreate.value,
  };
  addElement(obj);
  toggleForm(popUpCreate);
}
