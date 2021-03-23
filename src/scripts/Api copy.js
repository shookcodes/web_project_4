export default class Api {
    constructor(url, auth, id) {
      this._url = url;
      this._auth = auth;
      this._id = id;
    }
  
    getInitialCards() {
        return fetch(this._url + "/cards/", {
            headers: {
              authorization: this._auth, 
              "Content-Type": "application/json" 
            }
          })
            .then(res => {
              if (res.ok) {
                  console.log(res)
                return res.json();
              }
              return Promise.reject(`Error: ${res.status}`);
            })
            .catch(err => console.log(err))
    }


    getUserInfo() {
        return fetch(this._url + "/users/me", {
            headers: {
                method: "GET",
              authorization: this._auth, 
              "Content-Type": "application/json" 
            }
          })
            .then(res => {
              if (res.ok) {
                  console.log(res)
                return res.json();
              }
              return Promise.reject(`Error: ${res.status}`);
            })
            .then(data => {
                console.log(data)
                return Promise.resolve(data)
            })
            .catch(err => console.log(err))
    }

    setUserInfo(name, about) {
        return fetch(this._url + "/users/me/", {
            method: "PATCH",
            headers: {
              authorization: this._auth, 
              "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                name, about
            })
            
          })
          .catch(err => console.log(err))
    }
    
    setUserAvatar(avatar) {
        return fetch(this._url + "/users/me/avatar", {
            method: "PATCH",
            headers: {
              authorization: this._auth, 
              "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                avatar
            })
          })
          .then(res => res.ok ? res.json() : Promise.reject('Error' + res.statusText)) 
        .catch(err => console.log(err)) 
    }
  

  }
  
