export default class UserInfo {
  constructor({name, about, avatar}) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar)
  }

  getUserInfo() {
    return (this.userInfo = [
      this._name.textContent,
      this._about.textContent,
      this._avatar.src
    ]);
  }

  getProfileAvatar() {
    return (this.userInfo = [
    
      this._avatar.src
    ]);
  }

  setUserInfo({name, about}) {
     this._name.textContent = name,
     this._about.textContent = about
  }

  setUserAvatar(avatar) {
    return (this._avatar.src = avatar)
  }
}
