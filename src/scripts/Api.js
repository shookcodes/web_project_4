class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //GET https://around.nomoreparties.co/v1/group-9/cards
  getCardList() {
    return fetch(this._baseUrl + "/cards", {
      headers: this._headers
    })
      .then((res, err) => (res.ok ? res.json() : Promise.reject(err)))
      .catch((err) => console.log(err));
  }

  getUserInfo() {
    return fetch(this._baseUrl + "/users/me", {
        headers: this._headers
      })
        .then((res, err) => (res.ok ? res.json() : Promise.reject(err)))
        .catch((err) => console.log(err));
    }
  
    getAppInfo() {
        return Promise.all([this.getCardList(), this.getUserInfo()])
    }

    //POST https://around.nomoreparties.co/v1/groupId/cards 
  addCard({ name, link }) {
    return fetch(this._baseUrl + "/cards/", {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({name, link})
      })
        .then((res, err) => (res.ok ? res.json() : Promise.reject(err)))
        .catch((err) => console.log(err));
  }

  //DELETE https://around.nomoreparties.co/v1/groupId/cards/cardId 
  removeCard(cardId) {
    return fetch(this._baseUrl + "/cards/" + cardId, {
        method: "DELETE",
        headers: this._headers,
        body: JSON.stringify({cardId})
      })
        .then((res, err) => (res.ok ? res.json() : Promise.reject(err)))
        .catch((err) => console.log(err));

  }

  getCardLikes(cardId) {
    return fetch(this._baseUrl + "/cards/likes/" + cardId, {
        method: "GET",
        headers: this._headers,
        //body: JSON.stringify({cardId})
      })
        .then((res, err) => (res.ok ? res.json() : Promise.reject(err)))
        .catch((err) => console.log(err));
  }

  addCardLike(cardId, like) {
    return fetch(this._baseUrl + "/cards/likes/" + cardId, {
        method: "PUT",
        headers: this._headers,
        body: JSON.stringify({cardId, like})
      })
        .then((res, err) => (res.ok ? res.json() : Promise.reject(err)))
        .catch((err) => console.log(err));
  }

  removeCardLike(cardId, like) {
    return fetch(this._baseUrl + "/cards/likes/" + cardId, {
        method: "DELETE",
        headers: this._headers,
        body: JSON.stringify({cardId, like})
      })
        .then((res, err) => (res.ok ? res.json() : Promise.reject(err)))
        .catch((err) => console.log(err));
  }

  setUserInfo({ name, about }) {
    return fetch(this._baseUrl + "/users/me", {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({name, about})
      })
        .then((res, err) => (res.ok ? res.json() : Promise.reject(err)))
        .catch((err) => console.log(err));
  }

  setUserAvatar(avatar) {
    return fetch(this._baseUrl + "/users/me/avatar", {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({avatar})
      })
        .then((res, err) => (res.ok ? res.json() : Promise.reject(err)))
        .catch((err) => console.log(err));
  }
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-9",
  headers: {
    authorization: "260d5980-6d5e-481f-83d5-bd34d23b0619",
    "Content-Type": "application/json",
  },
});

export default api;
