// THIS JS FILE CONTAINS ALL FIREBASE INTERACTION FUNCTIONALITY
// By: Nick Kolesar

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, 
         signInWithEmailAndPassword, signOut, 
         onAuthStateChanged, updatePassword,
         EmailAuthProvider, reauthenticateWithCredential,
         sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCYJu7XcLm3ENGT5u1O0RDDZJDp4Aft52E",
  authDomain: "solarcartelemetrywebsite.firebaseapp.com",
  projectId: "solarcartelemetrywebsite",
  storageBucket: "solarcartelemetrywebsite.appspot.com",
  messagingSenderId: "44607249830",
  appId: "1:44607249830:web:ed681932e902e00d374367",
  measurementId: "G-LQ287R01VE"
};

// Initialize Firebase
const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);


// URL variables
const url               = window.location.href;
const indexURL          = window.location.origin + '/index.html';
const forgotPasswordURL = window.location.origin + '/recover-password.html';
const dashboardURL      = window.location.origin + '/dashboard.html';
const profileURL        = window.location.origin + '/profile.html';

// Session handling
onAuthStateChanged(auth, (user) => {
  if (user) {


    // if the user is logged in already and not on the dashboard/profile redirect to dashboard.html
    if (url !== dashboardURL && url !== profileURL) {
      window.location.replace(dashboardURL);
    }

    //--------------------------------------------------//
    //         Fill in Profile Information              //
    //--------------------------------------------------//
    if (window.location.href === profileURL) {
      
      const profileEmail          = document.getElementById("profile-email");
      const profileAccountCreated = document.getElementById("profile-account-created");
      const creationDate = new Date(user.metadata.creationTime);
      const day = creationDate.getDate();
      let monthText;

      // convert month number to text, Jan=0 .. Dec=11
      switch(creationDate.getMonth()) {
        case 0:
          monthText = "January";
          break;
        case 1:
          monthText = "February";
          break;
        case 2:
          monthText = "March";
          break;
        case 3:
          monthText = "April";
          break;
        case 4:
          monthText = "May";
          break;
        case 5:
          monthText = "June";
          break;
        case 6:
          monthText = "July";
          break;
        case 7:
          monthText = "August";
          break;
        case 8:
          monthText = "September";
          break;
        case 9:
          monthText = "October";
          break;
        case 10:
          monthText = "November";
          break;
        case 11:
          monthText = "December";
          break;
        default:
          monthText = "#";
      }
      const year = creationDate.getFullYear();

      // Write profile information
      profileEmail.innerHTML          = '<b style="color:#500000;">Email:</b> '+user.email;
      profileAccountCreated.innerHTML = '<b style="color:#500000;">Account Created:</b> '+monthText+' '+day+', '+year;
            

      // TEXT STYLING
      const profileFontColor = "black";
      
      profileAccountCreated.style.color      = profileFontColor;
      profileEmail.style.color               = profileFontColor;
      profileAccountCreated.style.fontWeight = "bold";
      profileEmail.style.fontWeight          = "bold";

    }
  } 
  else {
    // No valid session then disallow access to main pages
    if (url !== indexURL && url !== forgotPasswordURL) {
      window.location.replace(indexURL);
    }
  }
});

//--------------------------------------------//
//           Main Firebase Functions          //
//--------------------------------------------//

// Form/Button vars
const loginForm           = document.getElementById("login-form");
const registerForm        = document.getElementById("register-form");
const logoutButton        = document.querySelector('.logout-btn');
const newPasswordForm     = document.getElementById("reset-password-form");
const recoverPasswordForm = document.getElementById("recover-password-form");

// Event Listeners
// variable must exist for event listener to be set
loginForm           && loginForm.addEventListener('submit', login);
registerForm        && registerForm.addEventListener('submit', register);
logoutButton        && logoutButton.addEventListener('click', logout);
newPasswordForm     && newPasswordForm.addEventListener('submit', changePassword);
recoverPasswordForm && recoverPasswordForm.addEventListener('submit', recoverPassword);


// FUNCTIONS
/*----------------------------------------------------------------------------------------------*/

function login(event) {
  event.preventDefault();

  // save email and password as variables for sign-in
  const email    = document.getElementById("userEmail").value;
  const password = document.getElementById("userPassword").value;

  // Call Firebase sign-in function
  signInWithEmailAndPassword(auth, email, password)
  .then(() => {
      window.location.replace(dashboardURL);
  })
  .catch((error) => {
    const errorCode               = error.code;
    const errorMessage            = error.message;
    const notifyIncorrectPassword = document.querySelector('.notify-incorrect-password');

    if (errorCode === 'auth/invalid-credential') {
      !notifyIncorrectPassword.classList.contains('show-message') && 
      notifyIncorrectPassword.classList.add('show-message');
    }
    else {
      // unhandled errors
      alert(errorCode, errorMessage);
    }
  });
}

/*----------------------------------------------------------------------------------------------*/

function register(event) {
  event.preventDefault();

  // get email and password from registration form
  const email    = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // check password is of sufficient strength
  // REQUIREMENTS:
  //   - 10 Total characters minimum
  //   - 1 Lowercase letter [a-z]
  //   - 1 Capital letter [A-Z]
  //   - 1 Number [0-9]
  //   - 1 Symbol [@$!#%*?&()-+_=.,]
  //     Entropy: 62.85 bits
  const registerError = document.querySelector('.notify-register-error');
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%*?&()-+_=.,])[A-Za-z\d@$!#%*?&()-+_=.,]{10,}$/;
  
  // Check password against password security policy (passwordRegex)
  if (!passwordRegex.test(password)) {
    registerError.textContent = "Password not strong enough";
    registerError.classList.add('show-message');
  } 
  else {
    // Call Firebase create account function
    createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      // Signed up 
      alert("Your Account has been created successfully!");
    })
    .catch((error) => {
      const errorCode    = error.code;
      const errorMessage = error.message;
      
      if (errorCode === 'auth/email-already-in-use') {
        // give feedback to user
        registerError.textContent = "Email already exists";
        registerError.classList.add('show-message');
      }
      else {
        alert(errorCode, errorMessage);  
      }
    });
  }
}

/*----------------------------------------------------------------------------------------------*/

function logout() {
  signOut(auth).then(() => {
      // sign out successful
  }).catch((error) => {
    // there was an error
    const errorCode    = error.code;
    const errorMessage = error.message;
    alert(errorCode, errorMessage);  
  });
}

/*----------------------------------------------------------------------------------------------*/

function changePassword(event) {
  event.preventDefault();

  const user            = auth.currentUser;
  const currentPassword = document.getElementById("cur-password");
  const newPassword     = document.getElementById("new-password");
  const credential      = EmailAuthProvider.credential(user.email, currentPassword.value);
  const errorMessage    = document.getElementById("new-password-error-message");

  // Call Firebase reauth function
  reauthenticateWithCredential(user, credential)
  .then((userCredential) => {
    const user = userCredential.user;
    
    // replace current credentials with data in credential var
    // validation on new password security policy is done in profile-page.js
    // updatePassword() returns void(0) so error undefined is returned on success
    updatePassword(user, newPassword.value)
    .then(() => {
      // Password updated sucessfully
      alert("Your password has been updated");
    })
    .catch((error) => {
      // Password update failed
      const errorCode = error.code;
      if (errorCode === undefined) {
        alert("Your password has been updated");
        newPasswordForm.reset();
      }
      else {
        alert(errorCode);
      }
    })
  })
  .catch((error) => {
    // An error occurred in reauthenticateWithCredential() 
    const errorCode = error.code;
    
    if (errorCode === "auth/invalid-credential") {
      errorMessage.textContent = "Current password is invalid";
    }
    else {
      errorMessage.textContent = "Uncaught error: " + errorCode;
    }
  });
}

/*----------------------------------------------------------------------------------------------*/

function recoverPassword(event) {
  event.preventDefault();

  const email = document.getElementById("recovery-email").value;

  sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent successfully
    // Displays as successful even if email doesn't exist
    alert("We have attempted to send a reset password email to " + email + ', Please check your email.');
    window.location.replace(indexURL);
  })
  .catch((error) => {
    // Handle errors
    alert("Error sending password reset email:" + error.code);
  });
}
