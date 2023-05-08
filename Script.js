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
initialCards.forEach(addElement);

const editButton = document.querySelector(".profile__edit-button");
const closeButtonEdit = document.querySelector("#edit-close");
const popUpEdit = document.querySelector("#pop-up-edit");
const createButton = document.querySelector(".profile__add-button");
const closeButtonCreate = document.querySelector("#create-close");
const likeButton = document.querySelectorAll(".elements__like");
const closeButtonImg = document.querySelector("#img-close");

const popUpCreate = document.querySelector("#pop-up-create");
const formElementEdit = document.querySelector("#edit-form");
const formElementCreate = document.querySelector("#create-form");

const nameInputEdit = document.querySelector("#author-name");
const jobInputEdit = document.querySelector("#author-description");

const nameInputCreate = document.querySelector("#create-name");
const linkInputCreate = document.querySelector("#create-link");

const fullImg = document.querySelector("#pop-up-full-img");

function toggleEditForm() {
  popUpEdit.classList.toggle("pop-up_disabled");
  if (!popUpEdit.className.includes("pop-up_disabled")) {
    nameInputEdit.value = document.querySelector(".profile__name").textContent;
    jobInputEdit.value = document.querySelector(".profile__description").textContent;
  }
}

function toggleCreateForm() {
  popUpCreate.classList.toggle("pop-up_disabled");
  if (!popUpCreate.className.includes("pop-up_disabled")) {
    nameInputCreate.value = "";
    linkInputCreate.value = "";
  }
}

function toggleFullImg() {
  fullImg.classList.toggle("pop-up_disabled");
}

closeButtonImg.addEventListener("click", toggleFullImg);

editButton.addEventListener("click", toggleEditForm);
closeButtonEdit.addEventListener("click", toggleEditForm);

createButton.addEventListener("click", toggleCreateForm);
closeButtonCreate.addEventListener("click", toggleCreateForm);

function formSubmitHandler(evt) {
  evt.preventDefault();
  const profileName = document.querySelector(".profile__name");
  const profileDescription = document.querySelector(".profile__description");
  profileName.textContent = nameInputEdit.value;
  profileDescription.textContent = jobInputEdit.value;
  toggleEditForm();
}
formElementEdit.addEventListener("submit", formSubmitHandler);

function addElement(item) {
  const elementTemplate = document.querySelector("#element").content;
  const elementsAll = document.querySelector(".elements");
  const element = elementTemplate.querySelector(".elements__element").cloneNode(true);
  element.querySelector(".elements__card").src = item.link;
  element.querySelector(".elements__name").textContent = item.name;
  elementsAll.prepend(element);
  const elementLike = element.querySelector(".elements__like");
  const elementDelete = element.querySelector(".elements__urn");
  elementDelete.addEventListener("click", function () {
    let arrValue = initialCards.find(function (val) {
      return val.link.includes(elementDelete.parentElement.querySelector(".elements__card").getAttribute("src"));
    });
    let arrIndex = initialCards.indexOf(arrValue);
    initialCards.splice(arrIndex, 1);
    element.remove();
  });
  elementLike.addEventListener("click", function () {
    elementLike.classList.toggle("elements__like_active");
  });
  const img = element.querySelector(".elements__card");
  img.addEventListener("click", function () {
    toggleFullImg();
    fullImg.querySelector(".full-img").src = img.src;
    fullImg.querySelector(".full-img__info").textContent = element.textContent;
  });
}

function formAddImg(evt) {
  evt.preventDefault();
  obj = {
    name: nameInputCreate.value,
    link: linkInputCreate.value,
  };
  initialCards.push(obj);
  addElement(obj);
  toggleCreateForm();
}

formElementCreate.addEventListener("submit", formAddImg);
