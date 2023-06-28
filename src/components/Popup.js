export default class Popup {
  constructor(selector) {
    this._element = document.querySelector(selector);
  }
  open() {
    console.log("Открыл!");
    this._element.classList.add("pop-up_active");
    document.addEventListener("keydown", (evt) => this._handleEscClose(evt));
  }
  close() {
    this._element.classList.remove("pop-up_active");
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      console.log("Закрыл!");
      this.close();
      document.removeEventListener("keydown", (evt) => this._handleEscClose(evt));
    }
  }
  _handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }
  setEventListeners() {
    this._element.querySelector(".pop-up__close-icon").addEventListener("click", () => {
      this.close();
    });
    popupFullImg.addEventListener("mousedown", (evt) => {
      this._handleOverlayClose(evt);
    });
  }
}
