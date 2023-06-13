import {
  openPopUp,
  fullImg,
  fullImgInfo,
  popupFullImg,
  renderSaving,
  closePopUp,
  popUpCreate,
  nameInputCreate,
  linkInputCreate,
} from "./modal";
import { getCards, loadCard, removeCard, addLike, removeLike } from "./api";
import { userInfo } from "./utils";

const elementsAll = document.querySelector(".elements");

function createCard(item) {
  const elementTemplate = document.querySelector("#element").content;
  const cardElement = elementTemplate.querySelector(".elements__element").cloneNode(true);
  const cardElementImg = cardElement.querySelector(".elements__card");
  cardElementImg.src = item.link;
  cardElement.querySelector(".elements__name").textContent = item.name;
  cardElementImg.setAttribute("alt", item.name);
  cardElement.id = item._id;
  const elementLike = cardElement.querySelector(".elements__like");
  const elementDelete = cardElement.querySelector(".elements__urn");
  if (item.owner._id !== userInfo._id) {
    elementDelete.remove();
  }
  const elementLikeCounter = cardElement.querySelector(".elements__like-counter");
  elementLikeCounter.textContent = item.likes.length;
  if (
    item.likes.some(function (el) {
      return el._id === userInfo._id;
    })
  ) {
    elementLike.classList.add("elements__like_active");
  }
  elementDelete.onclick = function (evt) {
    deleteCard(evt.target.parentNode.id, cardElement);
  };
  elementLike.addEventListener("click", function (evt) {
    elementLike.classList.toggle("elements__like_active");
    if (elementLike.classList.contains("elements__like_active")) {
      putLike(item._id, elementLikeCounter);
    } else {
      deleteLike(item._id, elementLikeCounter);
    }
  });
  cardElementImg.addEventListener("click", function () {
    fullImg.src = cardElementImg.src;
    fullImgInfo.textContent = cardElement.lastElementChild.firstElementChild.textContent;
    fullImg.setAttribute("alt", cardElement.textContent.trim());
    openPopUp(popupFullImg);
  });
  return cardElement;
}

function addElement(item) {
  elementsAll.append(createCard(item));
}

function addImg(evt) {
  evt.preventDefault();
  postCard(evt);
}
function postCard(evt) {
  const buttonText = evt.target.lastElementChild.textContent;
  renderSaving(evt, true, buttonText);
  loadCard(nameInputCreate.value, linkInputCreate.value)
    .then((res) => {
      elementsAll.prepend(createCard(res));
    })
    .finally(() => {
      closePopUp(popUpCreate);
      renderSaving(evt, false, buttonText);
    });
}

function deleteCard(cardId, cardElement) {
  removeCard(cardId).then(() => {
    cardElement.remove();
  });
}

function putLike(cardId, counter) {
  addLike(cardId).then((res) => {
    counter.textContent = res.likes.length;
  });
}
function deleteLike(cardId, counter) {
  removeLike(cardId).then((res) => {
    counter.textContent = res.likes.length;
  });
}

export { addImg, addElement, createCard, elementsAll };
