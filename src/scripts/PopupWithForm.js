import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, submitHandler}) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._submitEventHandler = this._submitEventHandler.bind(this);
    this._form = this._popup.querySelector(".popup__form");
  }

  _getInputValues() {
    const inputValues = {};
    const inputs = [...this._form.querySelectorAll(".popup__input")];

    inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  _clearInputValues() {
    const inputValues = {};
    const inputs = [...this._form.querySelectorAll(".popup__input")];

    inputs.forEach((input) => {
      inputValues[input.name] = "";
    });

    return inputValues;
  }

 open(data) {
   this._data = data; 
   super.open();
 }

 savingContent(isSaving, buttonText){ 
  if(isSaving) { 
    this._popup.querySelector('.btn_style_save').textContent = buttonText; 

  } 
  if (!isSaving) { this._popup.querySelector('.btn_style_save').textContent = buttonText

}
}


  close() {
    this._clearInputValues();
    this._form.reset();
    super.close();
  }

  _submitEventHandler(e) {
    e.preventDefault();
    const inputValues = this._getInputValues(inputValues);
    this._submitHandler(inputValues);
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._submitEventHandler);
  }
}
