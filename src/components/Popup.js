export default class Popup {
  constructor(selector) {
    {
      this._element = document.querySelector(selector);
    }
  }
  open() {
    // this._element = document.querySelector(this._selector)
    // console.log(this._selector)
    // console.log(this._element)
    // this._element.classList.add("pop-up_active");
    // document.addEventListener("keydown", () => {
    //   this._handleEscClose();
    // });
  }
  close() {
    this._element.classList.remove("pop-up_active");
  }
  _handleEscClose() {
    if (evt.key === "Escape") {
      this.close();
      document.removeEventListener("keydown", _handleEscClose);
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
    popupFullImg.addEventListener("mousedown", (evt) => {this._handleOverlayClose(evt)});
  }
}
