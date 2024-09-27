import Popup from "./Popup";
export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._elemImg = this._element.querySelector(".full-img");
    this._elemText = this._element.querySelector(".full-img__info");
  }
  open(item) {
    this._elemImg.src = item.link;
    this._elemImg.alt = item.name;
    this._elemText.textContent = item.name;
    super.open();
  }
}
