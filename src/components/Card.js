import { api } from "../pages/index";
import { profileInfo } from "../pages";

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
    this._elemImage = this._element.querySelector(".elements__card");
    this._elemName = this._element.querySelector(".elements__name");
    this._elemLikeCounter = this._element.querySelector(".elements__like-counter");
    this._elemLike = this._element.querySelector(".elements__like");
    this._elemUrn = this._element.querySelector(".elements__urn");

    
    this._elemImage.src = this.link;
    this._elemImage.alt = this.name;
    this._elemName.textContent = this.name;
    this._elemLikeCounter.textContent = this.likes.length;
    if (
      this.likes.some((item) => {
        return item._id === profileInfo._id;
      })
    ) {
      this._elemLike.classList.add("elements__like_active");
    }
    this._setEventListeners();
    if (this.owner._id !== profileInfo._id) {
      this._elemUrn.remove();
    }
    return this._element;
  }

  _setEventListeners() {
    this._elemLike.addEventListener("click", () => {this._handleLike()});
    this._elemUrn.addEventListener("click", () => {this._deleteCard()});
    this._elemImage.addEventListener("click", () => this.cardHandler(this));
  }
  _handleLike() {
    {
      if (!this._elemLike.classList.contains("elements__like_active")) {
        this._putLike();
      } else {
        this._deleteLike();
      }
    }
  }
  _deleteCard() {
    api
      .removeCard(this._id)
      .then(() => {
        this._element.remove();
      })
      .catch((error) => console.error(`Ошибка при удалении карточки ${error}`));
  }
  _putLike() {
    api
      .addLike(this._id)
      .then((res) => {
        this._elemLikeCounter.textContent = res.likes.length;
        this._elemLike.classList.add("elements__like_active");
      })
      .catch((error) => console.error(`Ошибка при добавлении лайка ${error}`));
  }
  _deleteLike() {
    api
      .removeLike(this._id)
      .then((res) => {
        this._elemLikeCounter.textContent = res.likes.length;
        this._elemLike.classList.remove("elements__like_active");
      })
      .catch((error) => console.error(`Ошибка при удалении лайка ${error}`));
  }

  _deleteCard() {
    api
      .removeCard(this._id)
      .then(() => {
        this._element.remove();
      })
      .catch((error) => console.error(`Ошибка при удалении карточки ${error}`));
  }
  _putLike() {
    api
      .addLike(this._id)
      .then((res) => {
        this._elemLikeCounter.textContent = res.likes.length;
        this._elemLike.classList.add("elements__like_active");
      })
      .catch((error) => console.error(`Ошибка при добавлении лайка ${error}`));
  }
  _deleteLike() {
    api
      .removeLike(this._id)
      .then((res) => {
        this._elemLikeCounter.textContent = res.likes.length;
        this._elemLike.classList.remove("elements__like_active");
      })
      .catch((error) => console.error(`Ошибка при удалении лайка ${error}`));
  }
}
