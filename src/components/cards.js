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
import { loadCard, removeCard, addLike, removeLike } from "./api";
import {api} from './Api-class'
import { userInfo } from "./utils";

const elementsAll = document.querySelector(".elements");

function createCard(item) {
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
  api.loadCard(nameInputCreate.value, linkInputCreate.value)
    .then((res) => {
      elementsAll.prepend(createCard(res));
    })
    .catch((error) => console.error(`Ошибка при добавлении карточки ${error}`))
    .finally(() => {
      closePopUp(popUpCreate);
      renderSaving(evt, false, buttonText);
    });
}

 export default function deleteCard(cardId, cardElement) {
  api.removeCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((error) => console.error(`Ошибка при удалении карточки ${error}`));
}

function putLike(cardId, counter, elementLike) {
  api.addLike(cardId)
    .then((res) => {
      counter.textContent = res.likes.length;
      elementLike.classList.add("elements__like_active");
    })
    .catch((error) => console.error(`Ошибка при добавлении лайка ${error}`));
}
function deleteLike(cardId, counter, elementLike) {
  api.removeLike(cardId)
    .then((res) => {
      counter.textContent = res.likes.length;
      elementLike.classList.remove("elements__like_active");
    })
    .catch((error) => console.error(`Ошибка при удалении лайка ${error}`));
}

export { addImg, addElement, createCard, elementsAll, putLike, deleteLike };
