function getInfo() {
  return fetch("https://nomoreparties.co/v1/plus-cohort-25/users/me", {
    headers: {
      authorization: "02ffe6ee-1e50-4771-9330-975ddbfb736c",
    },
  })
    .then((res) => handleError(res))
    .catch((error) => console.error(`Ошибка при загрузке данных профиля ${error}`));
}

function getCards() {
  return fetch("https://nomoreparties.co/v1/plus-cohort-25/cards", {
    headers: {
      authorization: "02ffe6ee-1e50-4771-9330-975ddbfb736c",
    },
  })
    .then((res) => handleError(res))
    .catch((error) => console.error(`Ошибка при загрузке карточек ${error}`));
}

function patchProfile(name, about) {
  return fetch("https://nomoreparties.co/v1/plus-cohort-25/users/me", {
    method: "PATCH",
    headers: {
      authorization: "02ffe6ee-1e50-4771-9330-975ddbfb736c",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then((res) => handleError(res))
    .catch((error) => console.error(`Ошибка при обновлении профиля ${error}`));
}

function loadCard(name, link) {
  return fetch("https://nomoreparties.co/v1/plus-cohort-25/cards", {
    method: "POST",
    headers: {
      authorization: "02ffe6ee-1e50-4771-9330-975ddbfb736c",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then((res) => handleError(res))
    .catch((error) => console.error(`Ошибка при добавлении карточки ${error}`));
}

function removeCard(cardId) {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-25/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "02ffe6ee-1e50-4771-9330-975ddbfb736c",
    },
  })
    .then((res) => handleError(res))
    .catch((error) => console.error(`Ошибка при удалении карточки ${error}`));
}

function addLike(cardId) {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-25/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: "02ffe6ee-1e50-4771-9330-975ddbfb736c",
      "Content-Type": "application/json",
    },
  })
    .then((res) => handleError(res))
    .catch((error) => console.error(`Ошибка при добавлении лайка ${error}`));
}

function removeLike(cardId) {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-25/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "02ffe6ee-1e50-4771-9330-975ddbfb736c",
      "Content-Type": "application/json",
    },
  })
    .then((res) => handleError(res))
    .catch((error) => console.error(`Ошибка при удалении лайка ${error}`));
}

function newAvatar(link) {
  return fetch("https://nomoreparties.co/v1/plus-cohort-25/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: "02ffe6ee-1e50-4771-9330-975ddbfb736c",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: link,
    }),
  })
    .then((res) => handleError(res))
    .catch((error) => console.error(`Ошибка при обновлении аватара ${error}`));
}

function handleError(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export { getInfo, getCards, patchProfile, loadCard, removeCard, addLike, removeLike, newAvatar };
