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
  popupPlace,
  popupProfile,
  poupupAvatar
} from "../utils/constants.js";
import "./index.css";
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

let userId;

api.getAppInfo().then(([cardsData, userData]) => {
  userId = userData._id;
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

  /*
  function savingContent(isSaving, popup, buttonText){ 
    //const originalText = popup.querySelector('.btn_style_save').textContent 
    if(isSaving) { 
      popup.querySelector('.btn_style_save').textContent = buttonText; 
    } 
    if (!isSaving) { popup.querySelector('.btn_style_save').textContent = buttonText
  }
  } 

  */


  const addPlacePopup = new PopupWithForm({
    popupSelector: ".popup_style_place",
    submitHandler: (data) => {
      addPlacePopup.savingContent(true, "Saving...");
      let cardData = { name: data["place-name"], link: data["place-link"] };
      
      api.addCard(cardData).then((res) => {
        
        const cardElement = createCard(res);
        defaultCards.prependItem(cardElement);
        addCardValidator.resetValidation();
      }).then(addPlacePopup.savingContent(false, "Create Place"))
      
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
  const card = new Card(
    {
      data: data,
      template: "#card-template",
      handleCardClick: () => {
        openImage.open(data.name, data.link);
      },
      handleDeleteCardClick: () => {
        const popupDelete = new PopupWithForm({
          popupSelector: ".popup_style_delete",
          submitHandler: () => {
            popupDelete.savingContent(true, "Saving...")
            api.removeCard(card._id).then(() => {
              card.deleteCard();
            }).then(
              popupDelete.savingContent(false, "Yes")
            );
          },
        });

        popupDelete.setEventListeners();
        popupDelete.open(data);
        deleteCardValidator.resetValidation();
      },
      handleLikeCardClick: () => {
        if (card.cardLiked()) {
          api.removeCardLike(card._id, data.likes).then((res) => {
            card.updateCardLikes(res.likes);
          });
        } else if (!card.cardLiked()) {
          api
            .addCardLike(card._id, data.likes)
            .then((res) => {
              card.updateCardLikes(res.likes);
            })

            .catch((err) => console.log(err));
        }
      },
    },
    userId
  );

  const cardElement = card.generateCard();
  return cardElement;
}

//edit profile

const editProfilePopup = new PopupWithForm({
  popupSelector: ".popup_style_profile",
  submitHandler: (userInfo, savingContent) => {
    
    const name = userInfo["user-name"];
    const about = userInfo["about-me"];
    editProfilePopup.savingContent(true, "Saving...")
    api
      .setUserInfo({ name, about })
      .then(profileData.setUserInfo({ name, about }))
      .then(editProfilePopup.savingContent(false, "Save"));
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
    editAvatarPopup.savingContent(true, "Saving")
    api
      .setUserAvatar(avatar["avatar-url"])
      .then(profileData.setUserAvatar(avatar["avatar-url"]))
      .then(editAvatarPopup.savingContent(false, "Saving"))
  },
});

editAvatarPopup.setEventListeners();

editAvatarBtn.addEventListener("click", () => {
  editAvatarPopup.open();
  avatarFormValidator.resetValidation();
});
