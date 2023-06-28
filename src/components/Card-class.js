import {putLike, deleteLike} from './cards'


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
    this._setEventListeners();
    document.querySelector(".elements").append(this._element);
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector(".elements__like").addEventListener("click", () => {
      this.handleLike();
    });
  }
  handleLike() {
    {
      if (!this._element.querySelector(".elements__like").classList.contains("elements__like_active")) {
        putLike(this._id, this._element.querySelector(".elements__like-counter"), this._getElement().querySelector(".elements__like"));
      } else {
        deleteLike(this._id, this._element.querySelector(".elements__like-counter"), this._getElement().querySelector(".elements__like"));
      }
    }
  }
  handleDelete() {
    console.log("=");
  }
}
