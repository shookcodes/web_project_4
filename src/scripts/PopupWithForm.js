import Popup from "./Popup.js";


export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitHandler = submitHandler
        this._submitEventHandler = this._submitEventHandler.bind(this);
        this._form = this._popup.querySelector(".popup__form"); 
    }

    _getInputValues () {
        const inputValues = {};
        const inputs = [...this._form.querySelectorAll(".popup__input")];
        
        inputs.forEach(input => {
            inputValues[input.name] = input.value;
            
        }); 
        return inputValues;
    }
    
    open() {
        super.open();
        this._form.reset();
    }

    close() {
        this._form.reset();
        super.close();
        console.log()
    }

    _submitEventHandler(e) {
        e.preventDefault();
        const inputValues = this._getInputValues();
        this._submitHandler(inputValues);
        this.close();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._submitEventHandler
        )
    }

  
}