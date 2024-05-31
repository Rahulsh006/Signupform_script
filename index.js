document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();
    if (checkInputs()) {
        alert('Sign Up Complete!!!');
    }
});

const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const phoneno = document.getElementById('phoneno');

username.addEventListener('input', () => validateUsername());
email.addEventListener('input', () => validateEmail());
password.addEventListener('input', () => {
    validatePassword();
    updateStrengthMeter();
});
password2.addEventListener('input', () => validatePassword2());
phoneno.addEventListener('input', () => validatePhone());

function checkInputs() {
    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isPassword2Valid = validatePassword2();
    const isPhoneValid = validatePhone();

    return isUsernameValid && isEmailValid && isPasswordValid && isPassword2Valid && isPhoneValid;
}

function validateUsername() {
    const usernameValue = username.value.trim();
    if (usernameValue.length < 6 || /[^a-zA-Z0-9]/.test(usernameValue)) {
        setErrorFor(username, 'Username must be at least 6 characters and contain no special characters');
        return false;
    } else {
        setSuccessFor(username);
        return true;
    }
}

function validateEmail() {
    const emailValue = email.value.trim();
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!re.test(emailValue)) {
        setErrorFor(email, 'Email is not valid');
        return false;
    } else {
        setSuccessFor(email);
        return true;
    }
}

function validatePassword() {
    const passwordValue = password.value.trim();
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!re.test(passwordValue)) {
        setErrorFor(password, 'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character');
        return false;
    } else {
        setSuccessFor(password);
        return true;
    }
}

function validatePassword2() {
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    if (passwordValue !== password2Value || passwordValue == '' || password2Value == '') {
        setErrorFor(password2, 'Passwords do not match');
        return false;
    } 
	else {
        setSuccessFor(password2);
        return true;
    }
}

function validatePhone() {
    const phoneValue = phoneno.value.trim();
    const re = /^\d{10}$/;
    if (!re.test(phoneValue)) {
        setErrorFor(phoneno, 'Phone number must be 10 digits');
        return false;
    } else {
        setSuccessFor(phoneno);
        return true;
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function updateStrengthMeter() {
    const passwordValue = password.value.trim();
    const formControl = password.parentElement;
    let strength = 0;

    if (passwordValue.length >= 8) strength++;
    if (passwordValue.match(/[a-z]/)) strength++;
    if (passwordValue.match(/[A-Z]/)) strength++;
    if (passwordValue.match(/\d/)) strength++;
    if (passwordValue.match(/[@$!%*?&]/)) strength++;

    formControl.querySelector('.strength-meter')?.remove();

    const strengthMeter = document.createElement('div');
    strengthMeter.className = 'strength-meter';
    formControl.appendChild(strengthMeter);

    switch (strength) {
        case 0:
        case 1:
        case 2:
            strengthMeter.style.background = 'red';
            strengthMeter.style.width = '20%';
            break;
        case 3:
            strengthMeter.style.background = 'orange';
            strengthMeter.style.width = '50%';
            break;
        case 4:
            strengthMeter.style.background = 'yellow';
            strengthMeter.style.width = '75%';
            break;
        case 5:
            strengthMeter.style.background = 'green';
            strengthMeter.style.width = '100%';
            break;
    }
}
