let cardsContainer = document.querySelector(".cards");
const profile = document.querySelector(".profile");
const editBtn = profile.querySelector(".btn_style_edit-profile");
const popupProfile = document.querySelector(".popup_style_profile");
const profileCloseBtn = popupProfile.querySelector(".btn_style_close");
const profileForm = popupProfile.querySelector(".popup__container");
const addBtn = document.querySelector(".btn_style_add");


//Edit profile functions
const userName = profile.querySelector(".profile__name");
const userAbout = profile.querySelector(".profile__title");
const userNameEdit = popupProfile.querySelector(".popup__field_type_user-name");
const userAboutEdit = popupProfile.querySelector(".popup__field_type_about-me");


function closeProfile() {
    popupProfile.classList.remove("popup_fade-in");
    popupProfile.classList.add("popup_fade-out");

}

function openProfile() {
    userNameEdit.value = userName.textContent;
    userAboutEdit.value = userAbout.textContent;

    if (popupProfile.classList.contains("popup_closed")) {
        popupProfile.classList.remove("popup_closed");
    }
    popupProfile.classList.remove("popup_fade-out");
    popupProfile.classList.add("popup_fade-in");

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
        link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
        name: "Lake Louise",
        link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
        name: "Bald Mountains",
        link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
        name: "Vanoise National Park",
        link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
];



initialCards.forEach(item => {
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector(".card__image").src = item.link;
    cardElement.querySelector(".card__image").alt = item.name;
    cardElement.querySelector(".card__title").textContent = item.name;
    cardsContainer.append(cardElement);

})

//place functions
const popupPlace = document.querySelector(".popup_style_place");
const placeCloseBtn = popupPlace.querySelector(".btn_style_close")
const placeText = popupPlace.querySelector(".popup__field_type_place-name");
const imageLink = popupPlace.querySelector(".popup__field_type_place-link");
const placeForm = popupPlace.querySelector(".popup__container");



function addPlace(e) {
    if (popupPlace.classList.contains("popup_closed")) {
        popupPlace.classList.remove("popup_closed");
    }
    popupPlace.classList.remove("popup_fade-out");
    popupPlace.classList.add("popup_fade-in");
    e.preventDefault();

}

function closePlace() {
    popupPlace.classList.remove("popup_fade-in");
    popupPlace.classList.add("popup_fade-out");

};


function savePlace(e) {
    e.preventDefault();
    let cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector(".card__title").textContent = placeText.value;
    cardElement.querySelector(".card__image").src = imageLink.value;
    cardElement.querySelector(".card__image").alt = imageLink.value;
    cardsContainer.prepend(cardElement);
    renderCards();

    closePlace();
}

placeCloseBtn.addEventListener("click", closePlace);
addBtn.addEventListener("click", addPlace);
placeForm.addEventListener("submit", savePlace);




const imagePopup = document.querySelector(".image-popup");
const closeImageBtn = imagePopup.querySelector(".btn_style_close-image");

function renderCards() {
    let card = cardsContainer.querySelectorAll(".card");
    let likeBtn = cardsContainer.querySelectorAll(".btn");
    let deleteBtn = cardsContainer.querySelectorAll(".btn_style_delete");
    let cardImage = cardsContainer.querySelectorAll(".card__image");
    let cardTitle = cardsContainer.querySelectorAll(".card__title");

    for (let i = 0; i < card.length; i++) {
        //Toggles the hearts between white and black when user clicks on them. 
        likeBtn[i].addEventListener("click", toggleLikeBtn);

        function toggleLikeBtn() {
            likeBtn[i].classList.toggle("btn_style_like");
            likeBtn[i].classList.toggle("btn_style_like-active");
        }

        //deletes card when trashcan button is clicked
        deleteBtn[i].addEventListener("click", deleteCard);

        function deleteCard() {
            card[i].remove();
        }

        //opens image in popup when image is clicked
        cardImage[i].addEventListener("click", openImage);

        function openImage() {
            imagePopup.querySelector(".image-popup__image").src = cardImage[i].src;
            imagePopup.querySelector(".image-popup__image").alt = cardImage[i].alt;
            imagePopup.querySelector(".image-popup__caption").textContent = cardTitle[i].textContent;

            if (imagePopup.classList.contains("image-popup_closed")) {
                imagePopup.classList.remove("image-popup_closed");
            }
            imagePopup.classList.remove("popup_fade-out");
            imagePopup.classList.add("popup_fade-in");
        }
    }
}

function closeImage() {
    imagePopup.classList.remove("popup_fade-in");
    imagePopup.classList.add("popup_fade-out");

}

closeImageBtn.addEventListener("click", closeImage);


renderCards();
//functions for opening card images







