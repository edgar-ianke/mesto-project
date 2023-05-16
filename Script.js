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

const buttonEdit = document.querySelector(".profile__edit-button");
const buttonCloseEdit = document.querySelector("#edit-close");
const popUpEdit = document.querySelector("#pop-up-edit");
const buttonCreate = document.querySelector(".profile__add-button");
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

const popupFullImg = document.querySelector("#pop-up-full-img");
const fullImg = popupFullImg.querySelector(".full-img");
const fullImgInfo = popupFullImg.querySelector(".full-img__info");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const elementsAll = document.querySelector(".elements");

initialCards.forEach(addElement);

buttonEdit.addEventListener("click", () => openForm(popUpEdit));
buttonCloseEdit.addEventListener("click", function () {
  closeForm(popUpEdit);
  nameInputEdit.value = profileName.textContent;
  jobInputEdit.value = profileDescription.textContent;
});

buttonCreate.addEventListener("click", function () {
  openForm(popUpCreate);
  nameInputCreate.value = "";
  linkInputCreate.value = "";
});
buttonCloseCreate.addEventListener("click", () => closeForm(popUpCreate));
formElementCreate.addEventListener("submit", addImg);

buttonCloseImg.addEventListener("click", () => closeForm(popupFullImg));

formElementEdit.addEventListener("submit", submitFormEditHandler);

function openForm(form) {
  form.classList.remove("pop-up_disabled");
}

function closeForm(form) {
  form.classList.add("pop-up_disabled");
}

function submitFormEditHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInputEdit.value;
  profileDescription.textContent = jobInputEdit.value;
  closeForm(popUpEdit);
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
    fullImg.src = img.src;
    fullImgInfo.textContent = cardElement.textContent;
    fullImg.setAttribute("alt", cardElement.textContent.trim());
    openForm(popupFullImg);
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
  closeForm(popUpCreate);
}
