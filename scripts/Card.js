import {
    openPopup,
    imagePopup,
    imagePopupPicture,
    imagePopupCaption,
} from "./utils.js";

export default class Card {
    constructor({ title, image }, template) {
        this._title = title;
        this._image = image;
        this._template = template;
    }

    generateCard() {
        const cardTemplate = document
            .querySelector(this._template)
            .content.querySelector(".card");
        this._cardElement = cardTemplate.cloneNode(true);
        const cardImage = this._cardElement.querySelector(".card__image");
        this._cardElement.querySelector(".card__title").textContent = this._title;
        cardImage.src = this._image;
        cardImage.alt = this._title;

        this._setEventListeners();

        return this._cardElement;
    }

    _toggleLikeBtn(e) {
        e.target.classList.toggle("btn_style_like");
        e.target.classList.toggle("btn_style_like-active");
    }

    _openImage() {
        imagePopupPicture.src = this._image;
        imagePopupPicture.alt = this._title;
        imagePopupCaption.textContent = this._title;

        openPopup(imagePopup);
    }

    _deleteCard(e) {
        const card = e.target.closest(".card");
        card.remove();
    }

    _setEventListeners() {
        const likeBtn = this._cardElement.querySelector(".btn_style_like");
        const deleteBtn = this._cardElement.querySelector(".btn_style_delete");
        const cardImage = this._cardElement.querySelector(".card__image");

        likeBtn.addEventListener("click", this._toggleLikeBtn);
        deleteBtn.addEventListener("click", this._deleteCard);
        cardImage.addEventListener("click", () => {
            this._openImage(imagePopup);
        });
    }
}
