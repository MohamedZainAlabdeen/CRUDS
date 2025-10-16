'use strict';

// Delete Confirm Message Handler
const confirmMessageHandler = (callback) => {
    document
        .querySelector(".popup-actions .continue-btn")
        .addEventListener("click", callback);

    closePopup(document.querySelector(".popup-close"), confirmPopup);
    closePopup(document.querySelector(".popup-actions .close-btn"), confirmPopup);
};

// open modual
const openPopup = (btn, popup) => {
    btn.addEventListener("click", () => {
        popup.classList.add("active");
        document.querySelector(".overlay").classList.add("active");
    })
};
// Close modual
const closePopup = (btn, popup, callback) => {
    btn.addEventListener("click", callback);

    btn.addEventListener("click", () => {
        popup.classList.remove("active");
        document.querySelector(".overlay").classList.remove("active");
    });
};

// Toggle the popup
const togglePopup = (btnOpen, btnClose, popup) => {
    openPopup(btnOpen, popup);
    
    closePopup(btnClose, popup);
};

