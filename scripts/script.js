let cardsContainer = document.querySelector(".cards");
let card = cardsContainer.querySelectorAll(".card");
let likeBtn = cardsContainer.getElementsByClassName("btn_style_like");
let profile = document.querySelector(".profile");
let editBtn = profile.querySelector(".btn_style_edit-profile");
let popup = document.querySelector(".popup");
let closeBtn = popup.querySelector(".btn_style_close");
let saveBtn = popup.querySelector(".btn_style_save");
let form = popup.querySelector(".popup__container");



//These 2 functions toggle opening and closing the Edit Profile modal.
let userName = profile.querySelector(".profile__name");
let userAbout = profile.querySelector(".profile__title");
let userNameEdit = popup.querySelector(".popup__field_type_user-name");
let userAboutEdit = popup.querySelector(".popup__field_type_about-me");


function editProfile() {
    userNameEdit.value = userName.textContent;
    userAboutEdit.value = userAbout.textContent;

}


function openProfile() {
    popup.classList.remove("popup_closed");

    userNameEdit.value = userName.textContent;
    userAboutEdit.value = userAbout.textContent;
}

function closeProfile() {
    popup.classList.add("popup_closed");
}

function saveProfile(e) {

    e.preventDefault();


    userName.textContent = userNameEdit.value;
    userAbout.textContent = userAboutEdit.value;

    popup.classList.add("popup_closed");

}

editBtn.addEventListener("click", openProfile);
form.addEventListener("submit", saveProfile);
closeBtn.addEventListener("click", closeProfile);






