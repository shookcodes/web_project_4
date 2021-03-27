export const cardsContainer = document.querySelector(".cards");
export const profile = document.querySelector(".profile");
export const editBtn = profile.querySelector(".btn_style_edit-profile");

export const popups = Array.from(document.querySelectorAll(".popup"));
export const popupProfile = document.querySelector(".popup_style_profile");
export const popupImage = document.querySelector(".popup_style_image");
export const profileForm = popupProfile.querySelector(".popup__form");
export const addBtn = document.querySelector(".btn_style_add");
export const editAvatarBtn = document.querySelector(".profile__avatar-edit");
export const popupPlace = document.querySelector(".popup_style_place");
export const placeText = document.querySelector(".popup__input_type_place-name");
export const imageLink = document.querySelector(".popup__input_type_place-link");
export const placeForm = popupPlace.querySelector(".popup__form");
export const popupAvatar = document.querySelector(".popup_style_avatar");
export const avatarForm = popupAvatar.querySelector(".popup__form");
export const popupDelete = document.querySelector(".popup_style_delete");
export const deleteForm = popupDelete.querySelector(".popup__form");
export const imagePopup = document.querySelector(".popup_style_image");
export const imagePopupPicture = imagePopup.querySelector(".popup__image");
export const imagePopupCaption = imagePopup.querySelector(".popup__caption");
export const cardTemplate = document.querySelector('#card-template').content; 
//Edit profile functions
export const userName = document.querySelector(".profile__name");
export const userAbout = profile.querySelector(".profile__title");
export const personName = ".profile__name";
export const personAbout = ".profile__title";
export const personAvatar = ".profile__avatar";
export const personQuery = document.querySelector(".profile__name");
export const aboutQuery = document.querySelector(".profile__title");
export const avatarQuery = document.querySelector(".profile__avatar");
export const avatarEditBtn = ".profile__avatar-edit";
export const personNameEdit = ".popup__input_type_user-name";
export const personAboutEdit = ".popup__input_type_about-me";
export const personAvatarEdit = ".popup__input_type_avatar";

export const userNameEdit = document.querySelector(".popup__input_type_user-name");
export const userAboutEdit = document.querySelector(".popup__input_type_about-me");
export const cardImage = ".card__image"
 

export const settings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".btn_style_save",
    inactiveButtonClass: "btn_style_save-disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
};

export const initialCards = [
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