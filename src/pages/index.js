import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import Section from "../scripts/Section.js";
import UserInfo from "../scripts/UserInfo.js";

import {
  settings,
  placeForm,
  profileForm,
  addBtn,
  editBtn,
  editAvatarBtn,
  avatarForm,
  deleteForm,
  userNameEdit,
  userAboutEdit,
  popupPlace
} from "../utils/constants.js";
import "./index.css";
import profileImage from "../images/profile__avatar.png";
import headerImage from "../images/header__logo.svg";
import api from "../scripts/Api.js";

const headerLogo = document.querySelector("#header-logo");
headerLogo.src = headerImage;

const addCardValidator = new FormValidator(settings, placeForm);
const profileFormValidator = new FormValidator(settings, profileForm);
const avatarFormValidator = new FormValidator(settings, avatarForm);
const deleteCardValidator = new FormValidator(settings, deleteForm);

addCardValidator.enableValidation();
profileFormValidator.enableValidation();
avatarFormValidator.enableValidation();
deleteCardValidator.enableValidation();

const openImage = new PopupWithImage(".popup_style_image");
openImage.setEventListeners();

const profileData = new UserInfo({
  name: ".profile__name",
  about: ".profile__title",
  avatar: ".profile__avatar",
});

let userId

api.getAppInfo().then(([cardsData, userData]) => {
  userId = userData._id;
        console.log(userId)
  //creates card list from server
  const defaultCards = new Section(
    {
      items: cardsData,
      renderer: (data) => {
        const cardElement = createCard(data);
        defaultCards.addItem(cardElement);
      },
    },
    ".cards"
  );

  defaultCards.renderer();
  profileData.setUserInfo({ name: userData.name, about: userData.about });
  profileData.setUserAvatar(userData.avatar);

  const addPlacePopup = new PopupWithForm({
    popupSelector: ".popup_style_place",
    submitHandler: (data) => {
      let cardData = { name: data["place-name"], link: data["place-link"] };
      
      api.addCard(cardData)
      .then((res) => {
        
        //addPlacePopup.savingData(true, popupSelector)
        const cardElement = createCard(res);
        defaultCards.prependItem(cardElement);
        addCardValidator.resetValidation();
      })
      .then(
       // savingData(false, popupPlace)
      );
    },
  });

  addPlacePopup.setEventListeners();

  addBtn.addEventListener("click", () => {
    addCardValidator.resetValidation();
    addPlacePopup.open();
  });
});

//creates new individual cards
function createCard(data) {
  const card = new Card({
    data: data,
    template: "#card-template",
    handleCardClick: () => {
      openImage.open(data.name, data.link);
    },
    handleDeleteCardClick: () => {
      const deletePopup = new PopupWithForm({
        popupSelector: ".popup_style_delete",
        submitHandler: () => {
          api.removeCard(card._id).then(() => {
            card.deleteCard();
          });
        },
      });

      deletePopup.setEventListeners();
      deletePopup.open(data);
      deleteCardValidator.resetValidation();
    },
    handleLikeCardClick: () => {
      api.addCardLike(card._id, card.likes).then((res) => console.log(res._id, res.likes))
      .then()
      
    }
  }, userId);

  const cardElement = card.generateCard();
  return cardElement;
  
}

function cardLikes(res) {
  
}

//edit profile

const editProfilePopup = new PopupWithForm({
  popupSelector: ".popup_style_profile",
  submitHandler: (userInfo) => {
    const name = userInfo["user-name"];
    const about = userInfo["about-me"];
    api
      .setUserInfo({ name, about })
      .then(profileData.setUserInfo({ name, about }));
  },
});

editProfilePopup.setEventListeners();

editBtn.addEventListener("click", () => {
  const [name, about] = profileData.getUserInfo();
  userNameEdit.value = name;
  userAboutEdit.value = about;
  editProfilePopup.open();
  profileFormValidator.resetValidation();
});

//edit avatar
const editAvatarPopup = new PopupWithForm({
  popupSelector: ".popup_style_avatar",
  submitHandler: (avatar) => {
    api
      .setUserAvatar(avatar["avatar-url"])
      .then(profileData.setUserAvatar(avatar["avatar-url"]));
  },
});

editAvatarPopup.setEventListeners();

editAvatarBtn.addEventListener("click", () => {
  editAvatarPopup.open();
  avatarFormValidator.resetValidation();
});
