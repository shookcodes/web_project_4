export default class UserInfo {
  constructor(person, about) {
    this._person = document.querySelector(person);
    this._about = document.querySelector(about);
  }

  getUserInfo() {
    return (this.userInfo = [
      this._person.textContent,
      this._about.textContent,
    ]);
  }

  setUserInfo(person, about) {
    this._person.textContent = person;
    this._about.textContent = about;
  }
}
