import deleteCard, { putLike, deleteLike } from "./cards";
import { popupWithImage, userInfo } from "./utils";
import {api} from "./Api-class";

export default class Card {
  constructor(data, selector, handleCardClick) {
    this.name = data.name;
    this.link = data.link;
    this.owner = data.owner;
    this.likes = data.likes;
    this.cardHandler = handleCardClick;
    this.selector = selector;
    this._id = data._id;
  }
  _getElement() {
    const cardElement = document
      .querySelector(this.selector)
      .content.querySelector(".elements__element")
      .cloneNode(true);
    return cardElement;
  }
  generate() {
    this._element = this._getElement();
    this._element.querySelector(".elements__card").src = this.link;
    this._element.querySelector(".elements__name").textContent = this.name;
    this._element.querySelector(".elements__like-counter").textContent = this.likes.length;
    if (
      this.likes.some((item) => {
        return item._id === userInfo._id;
      })
    ) {
      this._element.querySelector(".elements__like").classList.add("elements__like_active");
    }
    this._setEventListeners();
    if (this.owner._id !== userInfo._id) {
      this._element.querySelector(".elements__urn").remove();
    }
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector(".elements__like").addEventListener("click", () => {
      this._handleLike();
    });
    this._element.querySelector(".elements__urn").addEventListener("click", () => {
      this._deleteCard();
    });
    this._element.querySelector(".elements__card").addEventListener("click", () => this.cardHandler(this));
  }
  _handleLike() {
    {
      if (!this._element.querySelector(".elements__like").classList.contains("elements__like_active")) {
        this._putLike()
        // putLike(
        //   this._id,
        //   this._element.querySelector(".elements__like-counter"),
        //   this._element.querySelector(".elements__like")
        // );
      } else {
        this._deleteLike()
        // deleteLike(
        //   this._id,
        //   this._element.querySelector(".elements__like-counter"),
        //   this._element.querySelector(".elements__like")
        // );
      }
    }
  }
  _deleteCard() {
    api.removeCard(this._id)
      .then(() => {
        this._element.remove();
      })
      .catch((error) => console.error(`Ошибка при удалении карточки ${error}`));
  }
  _putLike() {
    api.addLike(this._id)
      .then((res) => {
        this._element.querySelector(".elements__like-counter").textContent = res.likes.length;
        this._element.querySelector(".elements__like").classList.add("elements__like_active");
      })
      .catch((error) => console.error(`Ошибка при добавлении лайка ${error}`));
  }
  _deleteLike() {
    api.removeLike(this._id)
      .then((res) => {
        this._element.querySelector(".elements__like-counter").textContent = res.likes.length;
        this._element.querySelector(".elements__like").classList.remove("elements__like_active");
      })
      .catch((error) => console.error(`Ошибка при удалении лайка ${error}`));
  }
}
