import Popup from "./Popup";
export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector)
        // this.popup = document.querySelector('.pop-up_full-img')
        // this.info = this.popup.querySelector('.full-img__info')
    }
    open(name, link) {
        console.log(this._element)
        // console.log(this)
        // console.log(this._selector)
        // console.log(this)
        // console.log(link)
        // console.log(name)
        // console.log(this)
        //  this.src = item.link;
        //  this.info = item.name;
        //  super.open()
    }   
}
