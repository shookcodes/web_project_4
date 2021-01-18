const cardsContainer = document.querySelector(".cards");
const profile = document.querySelector(".profile");
const editBtn = profile.querySelector(".btn_style_edit-profile");
const popups = Array.from(document.querySelectorAll(".popup"));
const popupProfile = document.querySelector(".popup_style_profile");
const profileCloseBtn = popupProfile.querySelector(".btn_style_close");
const openedPopup = document.querySelector('.popup_opened');
const profileForm = popupProfile.querySelector(".popup__form");
const addBtn = document.querySelector(".btn_style_add");
const imagePopup = document.querySelector(".popup_style_image");
const imagePopupPicture = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

//Edit profile functions
const userName = profile.querySelector(".profile__name");
const userAbout = profile.querySelector(".profile__title");
const userNameEdit = popupProfile.querySelector(".popup__input_type_user-name");
const userAboutEdit = popupProfile.querySelector(".popup__input_type_about-me");


function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened')
        closePopup(openedPopup);
    }
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
}
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
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

//function to close popup when clicking outside the form or image
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('btn_style_close')) {
            closePopup(popup)
        }
    })
})


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
const placeText = popupPlace.querySelector(".popup__input_type_place-name");
const imageLink = popupPlace.querySelector(".popup__input_type_place-link");
const placeForm = popupPlace.querySelector(".popup__form");

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

function toggleLikeBtn(e) {
    e.target.classList.toggle("btn_style_like");
    e.target.classList.toggle("btn_style_like-active");
}

function deleteCard(e) {
    const card = e.target.closest(".card");
    card.remove();
}

function openImage(item) {
    imagePopupPicture.src = item.link;
    imagePopupPicture.alt = item.name;
    imagePopupCaption.textContent = item.name;

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
    cardImage.addEventListener("click", () => {
        openImage(item)
    });

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

