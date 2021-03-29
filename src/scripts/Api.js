class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }


  _checkResponse(res, err) {
    if (res.ok) {
        return res.json();
    }
    return  Promise.reject(err)
}

  //GET https://around.nomoreparties.co/v1/group-9/cards
  getCardList() {
    return fetch(this._baseUrl + "/cards", {
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  getUserInfo() {
    return fetch(this._baseUrl + "/users/me", {
        headers: this._headers
      })
      .then(this._checkResponse)
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
      .then(this._checkResponse)
  }

  //DELETE https://around.nomoreparties.co/v1/groupId/cards/cardId 
  removeCard(cardId) {
    return fetch(this._baseUrl + "/cards/" + cardId, {
        method: "DELETE",
        headers: this._headers,
        body: JSON.stringify({cardId})
      })
      .then(this._checkResponse)

  }

  getCardLikes(cardId) {
    return fetch(this._baseUrl + "/cards/likes/" + cardId, {
        method: "GET",
        headers: this._headers,
        //body: JSON.stringify({cardId})
      })
      .then(this._checkResponse)
  }

  addCardLike(cardId, like) {
    return fetch(this._baseUrl + "/cards/likes/" + cardId, {
        method: "PUT",
        headers: this._headers,
        body: JSON.stringify({cardId, like})
      })
      .then(this._checkResponse)
  }

  removeCardLike(cardId, like) {
    return fetch(this._baseUrl + "/cards/likes/" + cardId, {
        method: "DELETE",
        headers: this._headers,
        body: JSON.stringify({cardId, like})
      })
      .then(this._checkResponse)
  }

  setUserInfo({ name, about }) {
    return fetch(this._baseUrl + "/users/me", {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({name, about})
      })
      .then(this._checkResponse)
  }

  setUserAvatar(avatar) {
    return fetch(this._baseUrl + "/users/me/avatar", {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({avatar})
      })
      .then(this._checkResponse)
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
