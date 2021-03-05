export default class UserInfo {
    constructor(person, about) {
        this._person = document.querySelector(person);
        this._about = document.querySelector(about);
    }

    getUserInfo() {
        
        this.userInfo =[this._person.textContent, this._about.textContent]

        console.log(this.userInfo)
        return this.userInfo
    }

    setUserInfo(person, about) {
        this._person.textContent = person;
        this._about.textContent = about
        console.log(person)
    }
}