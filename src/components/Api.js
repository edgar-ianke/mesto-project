export default class Api {
  constructor(options) {
    this._adress = options.adress;
    this._headers = options.headers;
    this._authorization = this._headers.authorization;
  }

  checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
  addLike(cardId) {
    return fetch(`${this._adress}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this.checkResponse);
  }

  getInfo() {
    return fetch(`${this._adress}/users/me`, {
      headers: this._headers,
    }).then(this.checkResponse);
  }

  getCards() {
    return fetch(`${this._adress}/cards`, {
      headers: this._headers,
    }).then(this.checkResponse);
  }

  patchProfile({ name, about }) {
    return fetch(`${this._adress}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this.checkResponse);
  }
  // getInitialData() {
  //   return Promise.all([
  //     fetch(`${this._adress}/users/me`, {
  //       headers: this._headers,
  //     }),
  //     fetch(`${this._adress}/cards`, {
  //       headers: this._headers,
  //     }),
  //   ]).then((responses) => {
  //     responses.forEach(this.checkResponse);
  //   });
  // }

  loadCard({ name, link }) {
    return fetch(`${this._adress}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this.checkResponse);
  }

  removeCard(cardId) {
    return fetch(`${this._adress}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this.checkResponse);
  }

  removeLike(cardId) {
    return fetch(`${this._adress}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this.checkResponse);
  }

  newAvatar({ link }) {
    return fetch(`${this._adress}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this.checkResponse);
  }
}

// export const api = new Api({
//   adress: `https://nomoreparties.co/v1/plus-cohort-25`,
//   method: "GET",
//   headers: {
//     authorization: "02ffe6ee-1e50-4771-9330-975ddbfb736c",
//     "Content-Type": "application/json",
//   },
// });
