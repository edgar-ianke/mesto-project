import Popup from "./Popup";
export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector)
    }
    open(item) {
        this.src = item.link;
        this.info = item.name;
        super.open()
    }
}
