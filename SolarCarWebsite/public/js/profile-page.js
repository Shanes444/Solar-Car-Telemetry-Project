// JS Functionality for profile.html
// By: Nick Kolesar


const currentPassword = document.getElementById("cur-password");
const newPassword     = document.getElementById("new-password");
const confirmPassword = document.getElementById("confirm-password");
const strength        = document.getElementById("new-password-strength");
const newPasswordBtn  = document.querySelector('.new-password-button');

// Disable submit button by default
newPasswordBtn.disabled = true;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%*?&()-+_=.,])[A-Za-z\d@$!#%*?&()-+_=.,]{10,}$/;


function compareNewPasswords() {
    // All inputs have values,
    // New password obeys security policy
    // New password and confirm password are the same 
    // current password is different than new password, 
    if (currentPassword.value !== "" && passwordRegex.test(newPassword.value) 
        && newPassword.value === confirmPassword.value && currentPassword.value !== newPassword.value) {

        newPasswordBtn.classList.add('allow-submit');
        newPasswordBtn.disabled = false;
    }
    else {
        newPasswordBtn.classList.contains('allow-submit') && 
        newPasswordBtn.classList.remove('allow-submit');
        newPasswordBtn.disabled = true;
    }
}

// this function was gotten from https://www.geeksforgeeks.org/create-a-password-strength-checker-using-html-css-and-javascript/
newPassword.oninput = function () {
    let point      = 0;
    let value      = newPassword.value;
    let widthPower = ["1%", "25%", "50%", "75%", "100%"];
    let colorPower = ["#D73F40", "#DC6551", "#F2B84F", "#BDE952", "#3ba62f"];

    if (value.length >= 10) {
        let arrayTest = [/[0-9]/, /[a-z]/, /[A-Z]/, /[@$!#%*?&()-+_=.,]/];
        arrayTest.forEach((item) => {
            if (item.test(value)) {
                point += 1;
            }
        });
    }
    strength.style.width           = widthPower[point];
    strength.style.backgroundColor = colorPower[point];
    
    // actual check on password
    compareNewPasswords();
};
