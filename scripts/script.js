import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { closePopup, openPopup } from "./utils.js";

const cardsContainer = document.querySelector(".cards");
const profile = document.querySelector(".profile");
const editBtn = profile.querySelector(".btn_style_edit-profile");
const popups = Array.from(document.querySelectorAll(".popup"));
const popupProfile = document.querySelector(".popup_style_profile");
const profileForm = popupProfile.querySelector(".popup__form");
const addBtn = document.querySelector(".btn_style_add");

const popupPlace = document.querySelector(".popup_style_place");
const placeText = popupPlace.querySelector(".popup__input_type_place-name");
const imageLink = popupPlace.querySelector(".popup__input_type_place-link");
const placeForm = popupPlace.querySelector(".popup__form");

//Edit profile functions
const userName = profile.querySelector(".profile__name");
const userAbout = profile.querySelector(".profile__title");
const userNameEdit = popupProfile.querySelector(".popup__input_type_user-name");
const userAboutEdit = popupProfile.querySelector(".popup__input_type_about-me");

const settings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".btn_style_save",
    inactiveButtonClass: "btn_style_save-disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
};

const addCardValidator = new FormValidator(settings, placeForm);
const profileFormValidator = new FormValidator(settings, profileForm);

const initialCards = [
    {
        title: "Yosemite Valley",
        image: "https://code.s3.yandex.net/web-code/yosemite.jpg",
    },
    {
        title: "Lake Louise",
        image: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
    },
    {
        title: "Bald Mountains",
        image: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
    },
    {
        title: "Latemar",
        image: "https://code.s3.yandex.net/web-code/latemar.jpg",
    },
    {
        title: "Vanoise National Park",
        image: "https://code.s3.yandex.net/web-code/vanoise.jpg",
    },
    {
        title: "Lago di Braies",
        image: "https://code.s3.yandex.net/web-code/lago.jpg",
    },
];

function createCard(item) {
    const card = new Card(item, "#card-template");
    const cardElement = card.generateCard();
    return cardElement
}

initialCards.forEach((item) => {
    const cardElement = createCard(item)
    cardsContainer.append(cardElement);
});

const renderCard = () => {
    const item = {};
    item.title = placeText.value;
    item.image = imageLink.value;
    const cardElement = createCard(item)
    cardsContainer.prepend(cardElement);
    closePlace();
};

function closeProfile() {
    closePopup(popupProfile);
}

function openProfile() {
    userNameEdit.value = userName.textContent;
    userAboutEdit.value = userAbout.textContent;
    profileFormValidator.resetValidation()
    openPopup(popupProfile);
}

function saveProfile(e) {
    e.preventDefault();
    userName.textContent = userNameEdit.value;
    userAbout.textContent = userAboutEdit.value;
    closeProfile();
}

editBtn.addEventListener("click", openProfile);
profileForm.addEventListener("submit", saveProfile);

//function to close popup when clicking outside the form or image
popups.forEach((popup) => {
    popup.addEventListener("click", (evt) => {
        if (evt.target.classList.contains("popup_opened")) {
            closePopup(popup);
        }
        if (evt.target.classList.contains("btn_style_close")) {
            closePopup(popup);
        }
    });
});

//place functions
function openPlacePopup() {
    placeForm.reset();
    addCardValidator.resetValidation();
    openPopup(popupPlace);
}

export function closePlace() {
    closePopup(popupPlace);
}

addBtn.addEventListener("click", openPlacePopup);
placeForm.addEventListener("submit", renderCard);




addCardValidator.enableValidation();
profileFormValidator.enableValidation();
