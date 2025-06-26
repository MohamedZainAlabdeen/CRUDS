'use strict';

const toggleTheme = () => {
    const currentTheme =
        document.documentElement.getAttribute("data-theme") || "light";
    const newTheme = currentTheme == "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
};

const storedTheme = localStorage.getItem("theme");

const systemThemeIsDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
).matches;

const initialTheme = storedTheme ?? (systemThemeIsDark ? "dark" : "light");

document.documentElement.setAttribute("data-theme", initialTheme);

// Attach ToggleTheme to theme button click event
window.addEventListener("DOMContentLoaded", function () {
    const $themeBtn = document.querySelector(".theme-toggle");

    if ($themeBtn) $themeBtn.addEventListener("click", toggleTheme);
});


