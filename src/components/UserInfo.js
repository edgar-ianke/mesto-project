import { api } from './Api-class'
import { } from './utils'
import {
    nameInputEdit,
    jobInputEdit,
    renderSaving,
    closePopUp,
    popUpEdit,
    popUpAvatar,
    linkInputAvatar,
} from "./modal";

const userName = document.querySelector(".profile__name")
const userDescription = document.querySelector(".profile__description")
const userAvatar = document.querySelector(".profile__avatar")

const objSelectors = {
    name: document.querySelector(".profile__name"),
    description: document.querySelector(".profile__description"),
    avatar: document.querySelector(".profile__avatar")
}
console.log(objSelectors)
class UserInfo {
    constructor(selectors) {
        this._name = selectors.name,
            this._aboutMe = selectors.description,
            this._avatar = selectors.avatar
    }

    getUserInfo() {
        //console.log(this)
        // возвращает объект с данными пользователя
        let userInfo = {};
        api.getInfo()
            .then((data) => {
                userInfo = Object.assign({}, data);
                this._name.textContent = userInfo.name;
                this._aboutMe.textContent = userInfo.about;
                this._avatar.src = userInfo.avatar;
                console.log(userInfo)
            })
            .catch(() => {
                console.log('Что то не так c UserInfo.getUserInfo()')
            })
    }
    setUserInfo() {
        //  принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу
        const nameInputEdit = document.querySelector("#author-name");
        const jobInputEdit = document.querySelector("#author-description");
        // console.log(nameInputEdit.value)
        // console.log(jobInputEdit.value)

        api.patchProfile(nameInputEdit.value, jobInputEdit.value)
            .then((res) => {
                this._name.textContent = res.name;
                this._aboutMe.textContent = res.about;
            })
            .catch(() => {
                console.log('Что то не так c UserInfo.setUserInfo()')
            })
            .finally(() => {
                //const buttonText = evt.target.querySelector(".form__submit-button").textContent;
                closePopUp(popUpEdit);
                //renderSaving(evt, false, buttonText);
             })
    }
}
export const getProfileInfo = new UserInfo(objSelectors)
getProfileInfo.getUserInfo()
