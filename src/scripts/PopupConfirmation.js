import Popup from "./Popup.js"

export default class PopupConfirmation extends Popup {
    constructor({popupSelector, submitHandler}) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._submitEventHandler = this._submitEventHandler.bind(this);
        this._form = this._popup.querySelector(".popup__form");
      }

      open(data, cardElement) {
        this._data = data; 
        this._cardElement = cardElement
        console.log(data)
        super.open();
      }

      savingContent(isSaving, buttonText){ 
        if(isSaving) { 
          this._popup.querySelector('.btn_style_save').textContent = buttonText; 
      
        } 
        if (!isSaving) { this._popup.querySelector('.btn_style_save').textContent = buttonText
      
      }
      }

      _submitEventHandler(e) {
        e.preventDefault();
        this._submitHandler(this._data);
        this.close();
      }

      setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", this._submitEventHandler);
      }
}