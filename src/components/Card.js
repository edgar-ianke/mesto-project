export default class Card {
  constructor(data, selector, user_id, handleCardClick, handlePutLike, handleDeletelike, handleDeleteCard) {
    this.name = data.name;
    this.link = data.link;
    this.owner = data.owner;
    this.likes = data.likes;
    this.cardHandler = handleCardClick;
    this.putLikeHandler = handlePutLike;
    this.deleteLikeHandler = handleDeletelike;
    this.deleteCardHandler = handleDeleteCard;
    this.selector = selector;
    this._id = data._id;
    this.user_id = user_id;
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
        return item._id === this.user_id;
      })
    ) {
      this._elemLike.classList.add("elements__like_active");
    }
    this._setEventListeners();
    if (this.owner._id !== this.user_id) {
      this._elemUrn.remove();
    }
    return this._element;
  }

  _setEventListeners() {
    this._elemLike.addEventListener("click", () => {
      this._handleLike();
    });
    this._elemUrn.addEventListener("click", () => {
      this._deleteCard();
    });
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
    this.deleteCardHandler(this._id)
      .then(() => {
        this._element.remove();
      })
      .catch((error) => console.error(`Ошибка при удалении карточки ${error}`));
  }
  _putLike() {
    this.putLikeHandler(this._id)
      .then((res) => {
        this._elemLikeCounter.textContent = res.likes.length;
        this._elemLike.classList.add("elements__like_active");
      })
      .catch((error) => console.error(`Ошибка при добавлении лайка ${error}`));
  }
  _deleteLike() {
    this.deleteLikeHandler(this._id)
      .then((res) => {
        this._elemLikeCounter.textContent = res.likes.length;
        this._elemLike.classList.remove("elements__like_active");
      })
      .catch((error) => console.error(`Ошибка при удалении лайка ${error}`));
  }
}
