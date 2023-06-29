export default class Popup {
  constructor(selector) {
    this._element = document.querySelector(selector);
    this._button = this._element.querySelector(".pop-up__close-icon");
    this.functionClose = (evt) => {
      if (evt.target === evt.currentTarget || evt.key === "Escape") {
        console.log('functionClose')
        this.close();
      }
    }
  }
  open() {
    console.log("-----------------------------------------");
    this._element.classList.add("pop-up_active");
    this.setEventListeners()
  }
  close() {
    console.log("close")
    this._element.classList.remove("pop-up_active");
    this._removeEventListeners()
  }

  setEventListeners() {
    console.log('setEventListeners')
    document.addEventListener("keydown", this.functionClose);
    this._button.addEventListener("click", this.functionClose);
    this._element.addEventListener("mousedown", this.functionClose);
  }
  _removeEventListeners() {
    console.log('removeEventListeners')
    document.removeEventListener("keydown", this.functionClose);
    this._button.removeEventListener("click", this.functionClose);
    this._element.removeEventListener("mousedown", this.functionClose);
  }

  _handleClose(evt) {
    if (evt.target === evt.currentTarget || evt.key === "Escape") {
      console.log('handleClose')
      this.close();
    }
  }
  // _handleOverlayClose(evt) {
  //   if (evt.target === evt.currentTarget || evt.key === "Escape") {
  //     console.log('handleOverlayClose')
  //     this.close();
  //   }
  // }
  // _handleEscClose(evt) {
  //   if (evt.key === "Escape") {
  //     console.log("Закрыл!");
  //     this.close();
  //   }
  // }
}
