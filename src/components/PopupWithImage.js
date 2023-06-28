import Popup from "./Popup";
export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }
  open(item) {
    this._element.querySelector(".full-img").src = item.link;
    this._element.querySelector(".full-img__info").textContent = item.name;
    super.open();
  }
}
