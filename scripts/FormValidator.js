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

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._settings.inactiveButtonClass);
        } else {
            buttonElement.classList.remove(this._settings.inactiveButtonClass);
        }
    }

    _checkInputValidity(inputSelector) {
        if (!inputSelector.validity.valid) {
            this._showInputError(inputSelector, inputSelector.validationMessage);
        } else {
            this._hideInputError(inputSelector);
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputSelector) => {
            return !inputSelector.validity.valid;
        });
    }

    _setEventListeners() {
        const inputList = Array.from(
            this._form.querySelectorAll(this._settings.inputSelector)
        );

        const buttonElement = this._form.querySelector(
            this._settings.submitButtonSelector
        );
        this._toggleButtonState(inputList, buttonElement);

        inputList.forEach((inputSelector) => {
            inputSelector.addEventListener("input", () => {
                this._checkInputValidity(inputSelector);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    }

    enableValidation() {
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        //change to formElement?
        this._setEventListeners();
    }
}

export default FormValidator;
