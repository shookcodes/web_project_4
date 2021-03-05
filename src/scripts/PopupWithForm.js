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
        
        console.log(inputs)

        inputs.forEach(input => {
            inputValues[input.name] = input.value;
            //inputValues.push(input.name = input.value)
           
            
        }); 
        

        return inputValues
    }
    


    close() {
        this._form.reset();
        super.close();
        
    }

    _submitEventHandler(e) {
        e.preventDefault();
        const inputValues = this._getInputValues(inputValues)

        //const eachItem = inputValues.split(",")
        //console.log(inputValues);
        console.log(Object.values(inputValues))

        const eachValue = Object.values(inputValues);
        
        eachValue.forEach(item => console.log(item))
        //inputValues.forEach((item) => {console.log(item.value)})
        this._submitHandler(inputValues);
        //console.log(inputValues);
        this.close();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._submitEventHandler
        )
    }

  
}