'use strict';

// Delete Confirm Message Handler
const confirmMessageHandler = (callback) => {
    document
        .querySelector(".popup-actions .continue-btn")
        .addEventListener("click", callback);

    closePopup(document.querySelector(".popup-close"));
    closePopup(document.querySelector(".popup-actions .close-btn"));
};

const closePopup = (btn) => {
    btn.addEventListener("click", () => {
        document.getElementById("confirmPopup").classList.remove("active");
        document.querySelector(".overlay").classList.remove("active");
    });
};
