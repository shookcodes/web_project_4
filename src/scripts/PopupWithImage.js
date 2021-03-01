import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector(".popup__image");
        this._caption = this._popup.querySelector(".popup__caption");
    }

    open(caption, image) {
        super.open();
        this._caption.textContent = caption;
        this._image.src = image;
        this._image.alt = caption;
    }

    close() {
        super.close();
    }

    setEventListeners() {
        super.setEventListeners();
    }
}
