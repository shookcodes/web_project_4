function closeByEscape(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector(".popup_opened");
        closePopup(openedPopup);
    }
}

export function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", closeByEscape);
}

export function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closeByEscape);
}

export const imagePopup = document.querySelector(".popup_style_image");
export const imagePopupPicture = imagePopup.querySelector(".popup__image");
export const imagePopupCaption = imagePopup.querySelector(".popup__caption");
