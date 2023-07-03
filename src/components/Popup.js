export default class Popup {
  constructor(selector) {
    this._element = document.querySelector(selector);
    this._button = this._element.querySelector(".pop-up__close-icon");
    this.functionClose = (evt) => {
      if (evt.target === evt.currentTarget || evt.key === "Escape") {
        this.close();
      }
    }
  }
  open() {
    this._element.classList.add("pop-up_active");
    // this.setEventListeners()
  }
  close() {
    this._element.classList.remove("pop-up_active");
    this._removeEventListeners()
  }

  setEventListeners() {
    document.addEventListener("keydown", this.functionClose);
    this._button.addEventListener("click", this.functionClose);
    this._element.addEventListener("mousedown", this.functionClose);
  }
  _removeEventListeners() {
    document.removeEventListener("keydown", this.functionClose);
    this._button.removeEventListener("click", this.functionClose);
    this._element.removeEventListener("mousedown", this.functionClose);
  }

  _handleClose(evt) {
    if (evt.target === evt.currentTarget || evt.key === "Escape") {
      this.close();
    }
  }
}
