// JS functionality for any internal pages past the login screen
// By: Nick Kolesar

const settingsGear = document.querySelector('.settings');
const settingsMenu = document.querySelector('.settings-popup');

// Clicking gear icon opens menu
settingsGear.addEventListener('click', () => {
    if (settingsMenu.classList.contains('active')) {
        settingsMenu.classList.remove('active');
    }
    else {
        settingsMenu.classList.add('active');
    }
});
