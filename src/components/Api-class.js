class Api {
  constructor(options) {
    this._adress = options.adress;
    this._headers = options.headers;
    this._authorization = this._headers.authorization;
  }

  handleError(res) {
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
    }).then(this.handleError);
  }

  getInfo() {
    return fetch(`${this._adress}/users/me`, {
      headers: this._headers,
    }).then(this.handleError);
  }

  getCards() {
    return fetch(`${this._adress}/cards`, {
      headers: this._headers,
    }).then(this.handleError);
  }

  patchProfile({ name, about }) {
    return fetch(`${this._adress}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this.handleError);
  }
  getInitialData() {
    return Promise.all([
      fetch(`${this._adress}/users/me`, {
        headers: this._headers,
      }),
      fetch(`${this._adress}/cards`, {
        headers: this._headers,
      }),
    ]).then((responses) => {
      responses.forEach(this.handleError);
    });
  }

  loadCard({ name, link }) {
    return fetch(`${this._adress}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this.handleError);
  }

  removeCard(cardId) {
    return fetch(`${this._adress}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this.handleError);
  }

  removeLike(cardId) {
    return fetch(`${this._adress}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this.handleError);
  }

  newAvatar({ link }) {
    return fetch(`${this._adress}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this.handleError);
  }
}

export const api = new Api({
  adress: `https://nomoreparties.co/v1/plus-cohort-25`,
  method: "GET",
  headers: {
    authorization: "02ffe6ee-1e50-4771-9330-975ddbfb736c",
    "Content-Type": "application/json",
  },
});
