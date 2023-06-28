export default class Popup {
  constructor(selector) {
    {
      this.element = document.querySelector(selector);
    }
  }
  open() {
    this.element.classList.add("pop-up_active");
    document.addEventListener("keydown", () => {
      this._handleEscClose();

    });
  }
  close() {
    this.element.classList.remove("pop-up_active");
  }
  _handleEscClose() {
    if (evt.key === "Escape") {
      this.close();
      document.removeEventListener("keydown", _handleEscClose);
    }
  }
  setEventListeners() {
    this.element.querySelector(".pop-up__close-icon").addEventListener("click", () => {
      this.close();
    });
    popupFullImg.addEventListener("mousedown", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }
}