import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js"
import Section from "./Section.js";
import UserInfo from "./UserInfo.js"

import {initialCards, settings, placeForm, profileForm, addBtn, editBtn, placeText, imageLink, personName, personAbout, userNameEdit, userAboutEdit } from "./constants.js"
import "../pages/index.css";
import profileImage from "../images/profile__avatar.png"
import headerImage from "../images/header__logo.svg";

const headerLogo = document.querySelector("#header-logo");
headerLogo.src = headerImage;

const profilePicture = document.querySelector("#profile-picture");
profilePicture.src = profileImage

const addCardValidator = new FormValidator(settings, placeForm);
const profileFormValidator = new FormValidator(settings, profileForm);

addCardValidator.enableValidation();
profileFormValidator.enableValidation();



const openImage = new PopupWithImage(".popup_style_image");
openImage.setEventListeners();



    
//creates default card list
const defaultCards = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, "#card-template",  () => {
            openImage.open(item.title, item.image)
           
        });
       
        const cardElement = card.generateCard();
        defaultCards.addItem(cardElement);
    }
}, ".cards")

defaultCards.renderer();

const renderCard = () => {
    const item = {};
    item.title = placeText.value;
    item.image = imageLink.value;
    const cardElement = createCard(item)
    document.querySelector(".cards").prepend(cardElement);
};

//creates new individual cards
function createCard(item) {
    const card = new Card(item, "#card-template", () => {
        openImage.open(item.title, item.image)

    });

    const cardElement = card.generateCard();
    return cardElement
}

//create new card from place form
const addPlacePopup = new PopupWithForm(".popup_style_place", () =>  {
    addCardValidator.resetValidation()
    renderCard() 
});

addPlacePopup.setEventListeners();

addBtn.addEventListener("click", () => {
    addPlacePopup.open();  
})

//edit profile
const currentProfileData = new UserInfo(personName, personAbout);

const editProfilePopup = new PopupWithForm(".popup_style_profile", () => {
    currentProfileData.setUserInfo(userNameEdit.value, userAboutEdit.value);
    profileFormValidator.resetValidation();

})

editProfilePopup.setEventListeners();

editBtn.addEventListener("click", () => {
    let [person, about] = currentProfileData.getUserInfo();
    console.log(person)
    userNameEdit.value = person;
    userAboutEdit.value = about;
    editProfilePopup.open();
    
   
})





