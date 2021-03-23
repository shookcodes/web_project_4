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
  editAvatarBtn,
  placeText,
  imageLink,
  avatarForm,
  personName,
  personAbout,
  avatarEditBtn,
  personAvatar,
  userNameEdit,
  userAboutEdit,
  personAvatarEdit,
  avatarQuery,
  avatarPopup
} from "../utils/constants.js";
import "./index.css";
import profileImage from "../images/profile__avatar.png";
import headerImage from "../images/header__logo.svg";
import Api from "../scripts/Api.js"

const headerLogo = document.querySelector("#header-logo");
headerLogo.src = headerImage;

const profilePicture = document.querySelector("#profile-picture");
profilePicture.src = profileImage;


const addCardValidator = new FormValidator(settings, placeForm);
const profileFormValidator = new FormValidator(settings, profileForm);
const avatarFormValidator = new FormValidator(settings, avatarForm);



addCardValidator.enableValidation();
profileFormValidator.enableValidation();
avatarFormValidator.enableValidation();

const openImage = new PopupWithImage(".popup_style_image");
openImage.setEventListeners();

const profileData = new UserInfo(personName, personAbout, personAvatar);

console.log(profileData)

const api = new Api(
  "https://around.nomoreparties.co/v1/group-9",
  "260d5980-6d5e-481f-83d5-bd34d23b0619"
); 

let userId;

api.getUserInfo()
.then((userInfo) => {
  userId = userInfo._id
  profileData.setUserInfo(userInfo.name, userInfo.about, userInfo.avatar)
})


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


const editProfilePopup = new PopupWithForm(".popup_style_profile", handleEditProfileSubmit()
  
);

function handleEditProfileSubmit() {
  api.setUserInfo()
  .then((res) => {console.log(res.name, res.about)})
}

editProfilePopup.setEventListeners();


editBtn.addEventListener("click", () => {
  const [name, about] = api.getUserInfo()
  .then(
    userNameEdit.value = name,
  userAboutEdit.value = about
  );
 
  editProfilePopup.open();
  profileFormValidator.resetValidation();
});


//edit avatar
const editAvatarPopup = new PopupWithForm(".popup_style_avatar", (avatar) => {
    handleAvatarSubmit(avatar)
    console.log(avatar)
  }

)


function handleAvatarSubmit(avatar) {

  const avatarURL = avatar["avatar-url"]
  console.log(avatarURL)
  console.log(avatar)
  api.setUserAvatar()
  .then( res => {
    avatarURL = res.avatar["avatar-url"]
  })
  .catch(err => console.log(err))
}

editAvatarPopup.setEventListeners();

console.log(editAvatarBtn);

editAvatarBtn.addEventListener("click", () => {
  console.log(editAvatarPopup)
  editAvatarPopup.open();
  //avatarFormValidator.resetValidation();
})

