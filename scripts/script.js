let cardsContainer = document.querySelector(".cards");
let card = cardsContainer.querySelectorAll(".card");
let likeBtn = cardsContainer.getElementsByClassName("btn_style_like");
let profile = document.querySelector(".profile");
let editBtn = profile.querySelector(".btn_style_edit-profile");
let popup = document.querySelector(".popup");
let closeBtn = popup.querySelector(".btn_style_close");
let saveBtn = popup.querySelector(".btn_style_save");
let form = popup.querySelector(".popup__container");


//Toggles the hearts between white and black when user clicks on them. 
for (let i = 0; i < card.length; i++) {
    likeBtn[i].addEventListener("click", toggleLikeBtn);
    function toggleLikeBtn() {
        if (likeBtn[i].textContent === "♡") {
            likeBtn[i].textContent = " ♥";

        } else {
            likeBtn[i].textContent = "♡"
        }
    }
}



//These 2 functions toggle opening and closing the Edit Profile modal.
let userName = profile.querySelector("#name");
let userAbout = profile.querySelector("#about-me");
let userNameEdit = popup.querySelector("#name");
let userAboutEdit = popup.querySelector("#about-me");


function editProfile() {

    popup.classList.remove("popup_closed");
    popup.classList.add("popup_opened");

    userNameEdit.value = userName.textContent;
    userAboutEdit.value = userAbout.textContent;

    return { userNameEdit, userAboutEdit };

}




function closeProfile() {
    popup.classList.remove("popup_opened");
    popup.classList.add("popup_closed");
}

function saveProfile(e) {

    e.preventDefault();

    userName.textContent = "";
    userAbout.textContent = "";

    userName.textContent = userNameEdit.value;
    userAbout.textContent = userAboutEdit.value;

    console.log(userNameEdit.value, userAboutEdit.value);
    popup.classList.remove("popup_opened");
    popup.classList.add("popup_closed");

}

editBtn.addEventListener("click", editProfile);
form.addEventListener("submit", saveProfile);
closeBtn.addEventListener("click", closeProfile);

//These functions pull the user's name from index.html




