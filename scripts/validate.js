
const config = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".btn_style_save",
    inactiveButtonClass: "btn_style_save-disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
};



const showInputError = (formSelector, inputSelector, errorMessage, config) => {
    const errorClass = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.add("popup__input_type_error");
    errorClass.textContent = errorMessage;
    errorClass.classList.add("popup__error_visible");

};

const hideInputError = (formSelector, inputSelector) => {
    const errorClass = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.remove("popup__input_type_error");
    errorClass.classList.remove("popup__error_visible");
    errorClass.textContent = "";
};

const toggleButtonState = (inputList, buttonElement, config) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add("btn_style_save-disabled");
    } else {
        buttonElement.classList.remove("btn_style_save-disabled");
    }
};

const checkInputValidity = (formSelector, inputSelector) => {
    if (!inputSelector.validity.valid) {
        showInputError(
            formSelector,
            inputSelector,
            inputSelector.validationMessage
        );
    } else {
        hideInputError(formSelector, inputSelector);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputSelector) => {
        return !inputSelector.validity.valid;
    });
};

const setEventListeners = (formSelector, config) => {
    const inputList = Array.from(formSelector.querySelectorAll(config.inputSelector));

    const buttonElement = formSelector.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, buttonElement)

    inputList.forEach((inputSelector) => {
        inputSelector.addEventListener("input", function () {
            checkInputValidity(formSelector, inputSelector);
            toggleButtonState(inputList, buttonElement)
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


enableValidation(config);
