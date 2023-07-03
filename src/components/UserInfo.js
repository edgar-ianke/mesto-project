import { api } from './Api-class'

const objSelectors = {
    name: ".profile__name",
    description: ".profile__description",
    avatar: ".form__input"
}
class UserInfo {
    constructor(selectors) {
        this._name = document.querySelector(selectors.name),
            this._aboutMe = document.querySelector(selectors.description),
            this._avatar = document.querySelector(selectors.avatar)
    }

    getUserInfo() {
        // возвращает объект с данными пользователя
        const userInfo = {}
        api.getInfo()
            .then((data) => {
                console.log(data)
                userInfo.name = data.name;
                userInfo.about = data.about;
                userInfo.avatar = data.avatar;
                userInfo.cohort = data.cohort;
                userInfo._id = data._id;
            })
            .catch(() => {
                console.log('Что то не так c UserInfo.getUserInfo()')
            })
        console.log(userInfo)
        return userInfo
    }

    setUserInfo() {
        //  принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу
        const nameInputEdit = document.querySelector("#author-name");
        const jobInputEdit = document.querySelector("#author-description");

        api.patchProfile(nameInputEdit.value, jobInputEdit.value)
            .then((res) => {
                this._name.textContent = res.name;
                this._aboutMe.textContent = res.about;
            })
            .catch(() => {
                console.log('Что то не так c UserInfo.setUserInfo()')
            })
    }
}

export const getProfileInfo = new UserInfo(objSelectors)
getProfileInfo.getUserInfo()

