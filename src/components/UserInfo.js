export const objSelectors = {
    name: ".profile__name",
    description: ".profile__description",
    avatar: ".profile__avatar"
}
export default class UserInfo {
    constructor(selectors) {
        this._dataName = document.querySelector(selectors.name),
        this._dataAbout = document.querySelector(selectors.description),
        this._dataAvatar = document.querySelector(selectors.avatar)
    }

    getUserInfo() {
        // возвращает объект с данными пользователя
        return {name: this.name, about: this._about};
    }
    getUserId() {
        return this._id = id;
    }

    setUserInfo({name, about, avatar, _id}) {
        //  принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу

        // this._name.textContent = name;
        // this._aboutMe.textContent = about;
        // this._aboutMe.textContent = avatar;

        this._name = name;
        this._about = about;
        this._avatar = avatar;
        this._id = _id;
        this._dataName.textContent = this._name;
        this._dataAbout.textContent = this._about;
        this._dataAvatar.src = this._avatar;

    }
}

//export const profileInfo = new UserInfo(objSelectors)


