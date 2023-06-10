import { openForm, fullImg, fullImgInfo, popupFullImg, renderSaving, closeForm, popUpCreate } from "./modal";
import { getCards, loadCard, removeCard, addLike, removeLike } from "./api";
import { userInfo } from "./utils";

const elementsAll = document.querySelector(".elements");

function createCard(item) {
  const elementTemplate = document.querySelector("#element").content;
  const cardElement = elementTemplate.querySelector(".elements__element").cloneNode(true);
  cardElement.querySelector(".elements__card").src = item.link;
  cardElement.querySelector(".elements__name").textContent = item.name;
  cardElement.querySelector(".elements__card").setAttribute("alt", item.name);
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
    cardElement.remove();
    deleteCard(evt.target.parentNode.id);
  };
  elementLike.addEventListener("click", function (evt) {
    elementLike.classList.toggle("elements__like_active");
    if (elementLike.classList.contains("elements__like_active")) {
      putLike(evt.target.parentNode.parentNode.parentNode.id);
      elementLikeCounter.textContent++;
    } else {
      elementLikeCounter.textContent--;
      deleteLike(evt.target.parentNode.parentNode.parentNode.id);
    }
  });
  const img = cardElement.querySelector(".elements__card");

  img.addEventListener("click", function () {
    fullImg.src = img.src;
    fullImgInfo.textContent = cardElement.lastElementChild.firstElementChild.textContent;
    fullImg.setAttribute("alt", cardElement.textContent.trim());
    openForm(popupFullImg);
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
function getInitialCards() {
  getCards().then((result) => {
    result.forEach(addElement);
  });
}

function postCard(evt) {
  const buttonText = evt.target.lastElementChild.textContent;
  renderSaving(evt, true, buttonText);
  loadCard()
    .then(() => {
      elementsAll.innerHTML = "";
      getInitialCards();
    })
    .finally(() => {
      closeForm(popUpCreate);
      renderSaving(evt, false, buttonText);
    });
}

function deleteCard(cardId) {
  removeCard(cardId);
}

function putLike(cardId) {
  addLike(cardId);
}
function deleteLike(cardId) {
  removeLike(cardId);
}


export { addImg, addElement, createCard, elementsAll, getInitialCards };
