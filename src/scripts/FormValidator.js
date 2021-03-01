class FormValidator {
    constructor(settings, form) {
        this._settings = settings;
        this._form = form;
    }

    _showInputError(inputSelector, errorMessage) {
        const errorClass = this._form.querySelector(`.${inputSelector.id}-error`);
        inputSelector.classList.add(this._settings.inputErrorClass);
        errorClass.textContent = errorMessage;
        errorClass.classList.add(this._settings.errorClass);

        
    }

    _hideInputError(inputSelector) {
        const errorClass = this._form.querySelector(`.${inputSelector.id}-error`);
        inputSelector.classList.remove(this._settings.inputErrorClass);
        errorClass.classList.remove(this._settings.errorClass);
        errorClass.textContent = "";
    }

    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.classList.add(this._settings.inactiveButtonClass);
        } else {
            this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
        }
    }

    _checkInputValidity(inputSelector) {
        if (!inputSelector.validity.valid) {
            this._showInputError(inputSelector, inputSelector.validationMessage);
        } else {
            this._hideInputError(inputSelector);
        }
    }

    _hasInvalidInput() {
        return this._inputList.some((inputSelector) => {
            return !inputSelector.validity.valid;
        });
    }

    _setEventListeners() {
        this._inputList = Array.from(
            this._form.querySelectorAll(this._settings.inputSelector)
        );

        //change to this._ and update throughout file
        this._buttonElement = this._form.querySelector(
            this._settings.submitButtonSelector
        );
        this._toggleButtonState();

        this._inputList.forEach((inputSelector) => {
            inputSelector.addEventListener("input", () => {
                this._checkInputValidity(inputSelector);
                this._toggleButtonState(this._buttonElement);
            });
        });
    }

    resetValidation() {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement)
        });

        this._toggleButtonState();
    }

    enableValidation() {
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();

    }
}

export default FormValidator;
