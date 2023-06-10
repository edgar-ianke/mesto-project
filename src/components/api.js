import { linkInputAvatar, linkInputCreate, nameInputCreate, nameInputEdit, jobInputEdit } from "./modal";

function getInfo() {
  return fetch("https://nomoreparties.co/v1/plus-cohort-25/users/me", {
    headers: {
      authorization: "02ffe6ee-1e50-4771-9330-975ddbfb736c",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  });
}

function getCards() {
  return fetch("https://nomoreparties.co/v1/plus-cohort-25/cards", {
    headers: {
      authorization: "02ffe6ee-1e50-4771-9330-975ddbfb736c",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  });
}

function patchProfile() {
  return fetch("https://nomoreparties.co/v1/plus-cohort-25/users/me", {
    method: "PATCH",
    headers: {
      authorization: "02ffe6ee-1e50-4771-9330-975ddbfb736c",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameInputEdit.value,
      about: jobInputEdit.value,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  });
}

function loadCard() {
  return fetch("https://nomoreparties.co/v1/plus-cohort-25/cards", {
    method: "POST",
    headers: {
      authorization: "02ffe6ee-1e50-4771-9330-975ddbfb736c",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameInputCreate.value,
      link: linkInputCreate.value,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  });
}

function removeCard(cardId) {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-25/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "02ffe6ee-1e50-4771-9330-975ddbfb736c",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  });
}

function addLike(cardId) {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-25/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: "02ffe6ee-1e50-4771-9330-975ddbfb736c",
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  });
}

function removeLike(cardId) {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-25/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "02ffe6ee-1e50-4771-9330-975ddbfb736c",
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  });
}

function newAvatar() {
  return fetch("https://nomoreparties.co/v1/plus-cohort-25/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: "02ffe6ee-1e50-4771-9330-975ddbfb736c",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: linkInputAvatar.value,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  });
}

export { getInfo, getCards, patchProfile, loadCard, removeCard, addLike, removeLike, newAvatar };
