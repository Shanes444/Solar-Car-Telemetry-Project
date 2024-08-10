// JS Functionality relating to index.html 
// By: Nick Kolesar

const wrapper                 = document.querySelector('.wrapper');
const loginPopupBtn           = document.querySelector('.loginBtn-popup');
const closeBtn                = document.querySelector('.close-icon');
const loginEyeIcon            = document.querySelector('.login-toggle-visible');
const registerEyeIcon         = document.querySelector('.register-toggle-visible');
const loginLink               = document.querySelector('.login-link');
const registerLink            = document.querySelector('.register-link');
const notifyIncorrectPassword = document.querySelector('.notify-incorrect-password');
const notifyRegisterError     = document.querySelector('.notify-register-error');


//---------------------------------------------------------//
//               Login Page Functionality                  //
//---------------------------------------------------------//

// Makes the Login form visible to the user
loginPopupBtn.addEventListener('click', ()=> {
    if (wrapper.classList.contains('active-popup')) {
        closeForm();
    }
    else {
        // MAKING FORM VISIBLE
        wrapper.classList.add('active-popup');
    }
});

// Makes form invisible to the user upon clicking X in the corner of the form
closeBtn.addEventListener('click', ()=> { closeForm(); });


// Shift from login form to registration form
registerLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');
    document.getElementById("userEmail").value    = "";
    document.getElementById("userPassword").value = "";
});

// Shift from registration form to login form
loginLink.addEventListener('click', ()=> {
    wrapper.classList.remove('active');
    document.getElementById("email").value    = "";
    document.getElementById("password").value = "";
});

// Toggles visibility of the password input to user
function toggleVisible() {
    const userLoginPassword    = document.getElementById("userPassword");
    const userRegisterPassword = document.getElementById("password");

    // swap input type and icon image
    if (userLoginPassword.type === "password") {
        userLoginPassword.type = "text";
        loginEyeIcon.src       = "Images/eye-outline.svg";
    }
    else {
        userLoginPassword.type = "password";
        loginEyeIcon.src       = "Images/eye-off-outline.svg";
    }

    if (userRegisterPassword.type === "password") {
        userRegisterPassword.type = "text";
        registerEyeIcon.src       = "Images/eye-outline.svg";
    }
    else {
        userRegisterPassword.type = "password";
        registerEyeIcon.src       = "Images/eye-off-outline.svg";
    }
}

// Make wrapper div and it's contents invisible
function closeForm() {
    wrapper.classList.remove('active-popup');

    // remove all user input
    document.getElementById("userEmail").value    = "";
    document.getElementById("userPassword").value = "";
    document.getElementById("email").value        = "";
    document.getElementById("password").value     = "";

    // Focus login form if registration form was open
    if (wrapper.classList.contains('active')) {
        wrapper.classList.remove('active');
    }

    // Remove any error messages that were displayed
    if (notifyIncorrectPassword.classList.contains('show-message')) {
        notifyIncorrectPassword.classList.remove('show-message');
    }
    if (notifyRegisterError.classList.contains('show-message')) {
        notifyRegisterError.classList.remove('show-message');
    }
}

//-------------------------------------------------//
//         Registration password strength          //
//-------------------------------------------------//

// Source code for password strength slider: https://www.geeksforgeeks.org/create-a-password-strength-checker-using-html-css-and-javascript/
// Registration password strength
let newPassword = document.getElementById("password");
let strength    = document.getElementById("password-strength");

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
};

const userPasswordRequirements = document.querySelector('.password-user-aid');

const observer = new MutationObserver(mutationsList => {
    for(let mutation of mutationsList) {
      if(mutation.type === 'attributes' && mutation.attributeName === 'class') {
        if (wrapper.classList.contains('active-popup') && wrapper.classList.contains('active')) {
            userPasswordRequirements.style.display = 'block';
        }
        else {
            userPasswordRequirements.style.display = 'none';
        }
      }
    }
  });
  
  observer.observe(wrapper, { attributes: true });
