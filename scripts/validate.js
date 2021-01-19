
const settingsObject = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".btn_style_save",
    inactiveButtonClass: "btn_style_save-disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
};



const showInputError = (formSelector, inputSelector, errorMessage, config) => {
    const errorClass = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.add(config.inputErrorClass);
    errorClass.textContent = errorMessage;
    errorClass.classList.add(config.errorClass);
};

const hideInputError = (formSelector, inputSelector, config) => {
    const errorClass = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.remove(config.inputErrorClass);
    errorClass.classList.remove(config.errorClass);
    errorClass.textContent = "";
};

const toggleButtonState = (inputList, buttonElement, config) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(config.inactiveButtonClass);
    } else {
        buttonElement.classList.remove(config.inactiveButtonClass);
    }
};

const checkInputValidity = (formSelector, inputSelector, config) => {
    if (!inputSelector.validity.valid) {
        showInputError(
            formSelector,
            inputSelector,
            inputSelector.validationMessage,
            config
        );
    } else {
        hideInputError(formSelector, inputSelector, config);
    }
};

const hasInvalidInput = (inputList, config) => {
    return inputList.some((inputSelector) => {
        return !inputSelector.validity.valid;
    });
};

const setEventListeners = (formSelector, config) => {
    const inputList = Array.from(formSelector.querySelectorAll(config.inputSelector));

    const buttonElement = formSelector.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, config)

    inputList.forEach((inputSelector) => {
        inputSelector.addEventListener("input", function () {
            checkInputValidity(formSelector, inputSelector, config);
            toggleButtonState(inputList, buttonElement, config)
        });
    });
};

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));

    formList.forEach((formSelector) => {

        formSelector.addEventListener("submit", (evt) => {
            evt.preventDefault;
        })
        setEventListeners(formSelector, config)
    })
};

enableValidation(settingsObject);
