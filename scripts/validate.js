

const showInputError = (formSelector, inputSelector, errorMessage) => {
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


const checkInputValidity = (formSelector, inputSelector) => {
    if (!inputSelector.validity.valid) {
        showInputError(formSelector, inputSelector, inputSelector.validationMessage);
    } else {
        hideInputError(formSelector, inputSelector);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputSelector) => {
        return !inputSelector.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add("btn_style_save-disabled");
    } else {
        buttonElement.classList.remove("btn_style_save-disabled");
    }
};

const setEventListeners = (formSelector) => {
    const inputList = Array.from(formSelector.querySelectorAll(".popup__input"));

    const buttonElement = formSelector.querySelector(".btn_style_save");
    toggleButtonState(inputList, buttonElement)

    inputList.forEach((inputSelector) => {
        inputSelector.addEventListener("input", function () {
            checkInputValidity(formSelector, inputSelector);
            toggleButtonState(inputList, buttonElement)
        });
    });
};


const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(".popup__form"));
    formList.forEach((formSelector) => {
        formSelector.addEventListener("submit", (evt) => {
            evt.preventDefault;

        })
        setEventListeners(formSelector)
    })
}

enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "btn_style_save-disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
}); 