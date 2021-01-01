const cardsContainer = document.querySelector(".cards");
const profile = document.querySelector(".profile");
const editBtn = profile.querySelector(".btn_style_edit-profile");
//const popup = document.querySelector(".popup");
const popupProfile = document.querySelector(".popup_style_profile");
const profileCloseBtn = popupProfile.querySelector(".btn_style_close");
const profileForm = popupProfile.querySelector(".popup__container");
const addBtn = document.querySelector(".btn_style_add");
const imagePopup = document.querySelector(".popup_style_image");

//Edit profile functions
const userName = profile.querySelector(".profile__name");
const userAbout = profile.querySelector(".profile__title");
const userNameEdit = popupProfile.querySelector(".popup__field_type_user-name");
const userAboutEdit = popupProfile.querySelector(".popup__field_type_about-me");

function openPopup(popup) {
    popup.classList.add("popup_opened");
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
}

function closeProfile() {
    closePopup(popupProfile);
}

function openProfile() {
    userNameEdit.value = userName.textContent;
    userAboutEdit.value = userAbout.textContent;

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
profileCloseBtn.addEventListener("click", closeProfile);

//Card functions
const cardTemplate = document.querySelector("#card-template").content;

const initialCards = [
    {
        name: "Yosemite Valley",
        link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
    },
    {
        name: "Lake Louise",
        link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
    },
    {
        name: "Bald Mountains",
        link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
    },
    {
        name: "Latemar",
        link: "https://code.s3.yandex.net/web-code/latemar.jpg",
    },
    {
        name: "Vanoise National Park",
        link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
    },
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg",
    },
];

//place functions
const popupPlace = document.querySelector(".popup_style_place");
const placeCloseBtn = popupPlace.querySelector(".btn_style_close");
const placeText = popupPlace.querySelector(".popup__field_type_place-name");
const imageLink = popupPlace.querySelector(".popup__field_type_place-link");
const placeForm = popupPlace.querySelector(".popup__container");

function openPlacePopup() {
    openPopup(popupPlace)
}

function closePlace() {
    closePopup(popupPlace);
}

function savePlace(e) {
    e.preventDefault();
    const cardElement = createCard({
        link: imageLink.value,
        name: placeText.value,
    });
    cardsContainer.prepend(cardElement);
    closePlace();
    placeForm.reset();
}

placeCloseBtn.addEventListener("click", closePlace);
addBtn.addEventListener("click", openPlacePopup);
placeForm.addEventListener("submit", savePlace);

const closeImageBtn = imagePopup.querySelector(".btn_style_close-image");

//const likeBtn = cardsContainer.querySelectorAll(".btn");
function toggleLikeBtn(e) {
    e.target.classList.toggle("btn_style_like");
    e.target.classList.toggle("btn_style_like-active");
}

function deleteCard(item) {
    const card = cardsContainer.querySelector(".card");
    card.remove();
}

function openImage(e) {
    imagePopup.querySelector(".popup__image").src = e.target.src;
    imagePopup.querySelector(".popup__image").alt = e.target.alt;
    imagePopup.querySelector(".popup__caption").textContent = e.target.alt;

    openPopup(imagePopup);
}

function createCard(item) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");

    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardElement.querySelector(".card__title").textContent = item.name;
    const cardContent = cardElement.querySelector(".card__content");
    const likeBtn = cardContent.querySelector(".btn_style_like");
    const deleteBtn = cardElement.querySelector(".btn_style_delete");

    likeBtn.addEventListener("click", toggleLikeBtn);
    deleteBtn.addEventListener("click", deleteCard);
    cardImage.addEventListener("click", openImage);

    return cardElement;
}

initialCards.forEach((item) => {
    const cardElement = createCard(item);
    cardsContainer.append(cardElement);
});

function closeImage() {
    closePopup(imagePopup);
}

closeImageBtn.addEventListener("click", closeImage);
