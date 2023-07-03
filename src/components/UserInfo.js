import { api } from './Api-class'

const objSelectors = {
    name: ".profile__name",
    description: ".profile__description",
    avatar: ".form__input"
}
class UserInfo {
    constructor(selectors) {
        this._dataName = document.querySelector(selectors.name),
        this._dataAbout = document.querySelector(selectors.description),
        this._dataAvatar = document.querySelector(selectors.avatar)
    }

    getUserInfo() {
        // возвращает объект с данными пользователя
        return {name: this.name, about: this._aboutMe}
    }


    setUserInfo({name, about, avatar}) {
        //  принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу

        // this._name.textContent = name;
        // this._aboutMe.textContent = about;
        // this._aboutMe.textContent = avatar;

        this._name = name;
        this._about = about;
        this._avatar = avatar;

        this._dataName.textContent = this._name;
        this._dataAbout.textContent = this._about;
        this._dataAvatar.textContent = this._avatar;

    }
}

export const getProfileInfo = new UserInfo(objSelectors)

