export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._closeButton = this._popup.querySelector(".btn_style_close")
    }

    open() {  
        this._popup.classList.add("popup_opened"); 
         
    }

    close() {
        this._popup.classList.remove("popup_opened"); 

    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    setEventListeners() {
        document.addEventListener('keyup', this._handleEscClose);
        this._closeButton.addEventListener("click", () => { this.close()})
    }
}

