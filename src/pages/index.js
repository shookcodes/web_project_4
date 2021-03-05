import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import Section from "../scripts/Section.js";
import UserInfo from "../scripts/UserInfo.js";

import {
  initialCards,
  settings,
  placeForm,
  profileForm,
  addBtn,
  editBtn,
  placeText,
  imageLink,
  personName,
  personAbout,
  userNameEdit,
  userAboutEdit,
} from "../utils/constants.js";
import "./index.css";
import profileImage from "../images/profile__avatar.png";
import headerImage from "../images/header__logo.svg";

const headerLogo = document.querySelector("#header-logo");
headerLogo.src = headerImage;

const profilePicture = document.querySelector("#profile-picture");
profilePicture.src = profileImage;

const addCardValidator = new FormValidator(settings, placeForm);
const profileFormValidator = new FormValidator(settings, profileForm);

addCardValidator.enableValidation();
profileFormValidator.enableValidation();

const openImage = new PopupWithImage(".popup_style_image");
openImage.setEventListeners();

//creates default card list
const defaultCards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      defaultCards.addItem(cardElement);
    },
  },
  ".cards"
);

defaultCards.renderer();

const renderCard = () => {
  const item = {};
  item.title = placeText.value;
  item.image = imageLink.value;
  const cardElement = createCard(item);
  defaultCards.prependItem(cardElement);
};

//creates new individual cards
function createCard(item) {
  const card = new Card(item, "#card-template", () => {
    openImage.open(item.title, item.image);
  });

  const cardElement = card.generateCard();
  return cardElement;
}

//create new card from place form
const addPlacePopup = new PopupWithForm(".popup_style_place", (data) => {
  renderCard(data);
});

addPlacePopup.setEventListeners();

addBtn.addEventListener("click", () => {
  addCardValidator.resetValidation();
  addPlacePopup.open();
});

//edit profile
const profileData = new UserInfo(personName, personAbout);

const editProfilePopup = new PopupWithForm(".popup_style_profile", (data) => {
  profileData.setUserInfo(data["user-name"], data["about-me"]);
});

editProfilePopup.setEventListeners();

editBtn.addEventListener("click", () => {
  const [person, about] = profileData.getUserInfo();
  userNameEdit.value = person;
  userAboutEdit.value = about;
  editProfilePopup.open();
  profileFormValidator.resetValidation();
});
