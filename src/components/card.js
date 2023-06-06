import {
  popUpCreate,
  nameInputCreate,
  linkInputCreate,
  openForm,
  closeForm,
  fullImg,
  fullImgInfo,
  popupFullImg,
} from "./modal";

const elementsAll = document.querySelector(".elements");

const userInfo = {}

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
  const obj = {
    name: nameInputCreate.value,
    link: linkInputCreate.value,
  };
  addElement(obj);
  closeForm(popUpCreate);
}
export { addImg, addElement };

fetch("https://nomoreparties.co/v1/plus-cohort-25/users/me", {
  headers: {
    authorization: "02ffe6ee-1e50-4771-9330-975ddbfb736c",
  },
})
  .then((res) => res.json())
  .then((result) => {

    console.log(result);
  });
