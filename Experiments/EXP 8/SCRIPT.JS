// ==========================================
// EXPERIMENT 8
// FORM EVENTS AND LIVE VALIDATION
// Gym Admission Form
// ==========================================


// Get form elements

const form = document.getElementById("gymForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const ageInput = document.getElementById("age");
const planInput = document.getElementById("plan");
const dateInput = document.getElementById("startDate");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirmPassword");
const termsInput = document.getElementById("terms");


// ==========================================
// NAME VALIDATION
// ==========================================

function validateName() {

    let name = nameInput.value.trim();
    let error = document.getElementById("nameError");

    if (name === "") {

        showError(nameInput, error, "Name is required.");

        return false;

    }

    if (name.length < 3) {

        showError(
            nameInput,
            error,
            "Name must contain at least 3 characters."
        );

        return false;

    }

    showSuccess(
        nameInput,
        error,
        "✓ Looks good!"
    );

    return true;
}


// ==========================================
// EMAIL VALIDATION
// ==========================================

function validateEmail() {

    let email = emailInput.value.trim();

    let error = document.getElementById("emailError");

    let pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (email === "") {

        showError(
            emailInput,
            error,
            "Email is required."
        );

        return false;

    }

    if (!pattern.test(email)) {

        showError(
            emailInput,
            error,
            "Enter a valid email address."
        );

        return false;

    }

    showSuccess(
        emailInput,
        error,
        "✓ Valid email address"
    );

    return true;
}


// ==========================================
// PHONE VALIDATION
// ==========================================

function validatePhone() {

    let phone = phoneInput.value.trim();

    let error = document.getElementById("phoneError");

    let pattern = /^[6-9]\d{9}$/;


    if (phone === "") {

        showError(
            phoneInput,
            error,
            "Phone number is required."
        );

        return false;

    }

    if (!pattern.test(phone)) {

        showError(
            phoneInput,
            error,
            "Enter a valid 10-digit mobile number."
        );

        return false;

    }

    showSuccess(
        phoneInput,
        error,
        "✓ Valid phone number"
    );

    return true;
}


// ==========================================
// AGE VALIDATION
// ==========================================

function validateAge() {

    let age = Number(ageInput.value);

    let error = document.getElementById("ageError");


    if (!ageInput.value) {

        showError(
            ageInput,
            error,
            "Age is required."
        );

        return false;
    }


    if (age < 16 || age > 80) {

        showError(
            ageInput,
            error,
            "Age must be between 16 and 80."
        );

        return false;
    }


    showSuccess(
        ageInput,
        error,
        "✓ Valid age"
    );

    return true;
}


// ==========================================
// PLAN VALIDATION
// ==========================================

function validatePlan() {

    let error = document.getElementById("planError");


    if (planInput.value === "") {

        showError(
            planInput,
            error,
            "Please select a membership plan."
        );

        return false;
    }


    showSuccess(
        planInput,
        error,
        "✓ Plan selected"
    );

    return true;
}


// ==========================================
// DATE VALIDATION
// ==========================================

function validateDate() {

    let error = document.getElementById("dateError");

    if (dateInput.value === "") {

        showError(
            dateInput,
            error,
            "Please select a start date."
        );

        return false;
    }


    let selectedDate =
        new Date(dateInput.value);

    let today = new Date();

    today.setHours(0, 0, 0, 0);


    if (selectedDate < today) {

        showError(
            dateInput,
            error,
            "Start date cannot be in the past."
        );

        return false;
    }


    showSuccess(
        dateInput,
        error,
        "✓ Valid start date"
    );

    return true;
}


// ==========================================
// PASSWORD VALIDATION
// ==========================================

function validatePassword() {

    let password = passwordInput.value;

    let error =
        document.getElementById("passwordError");

    let bar =
        document.getElementById("strengthBar");


    if (password.length === 0) {

        bar.style.width = "0%";

        showError(
            passwordInput,
            error,
            "Password is required."
        );

        return false;
    }


    let strength = 0;


    if (password.length >= 8)
        strength++;

    if (/[A-Z]/.test(password))
        strength++;

    if (/[0-9]/.test(password))
        strength++;

    if (/[^A-Za-z0-9]/.test(password))
        strength++;


    bar.style.width =
        (strength * 25) + "%";


    if (password.length < 8) {

        showError(
            passwordInput,
            error,
            "Password must contain at least 8 characters."
        );

        return false;
    }


    showSuccess(
        passwordInput,
        error,
        "✓ Strong password"
    );

    return true;
}


// ==========================================
// CONFIRM PASSWORD
// ==========================================

function validateConfirmPassword() {

    let error =
        document.getElementById("confirmError");


    if (confirmInput.value === "") {

        showError(
            confirmInput,
            error,
            "Please confirm your password."
        );

        return false;
    }


    if (confirmInput.value !== passwordInput.value) {

        showError(
            confirmInput,
            error,
            "Passwords do not match."
        );

        return false;
    }


    showSuccess(
        confirmInput,
        error,
        "✓ Passwords match"
    );

    return true;
}


// ==========================================
// TERMS VALIDATION
// ==========================================

function validateTerms() {

    let error =
        document.getElementById("termsError");


    if (!termsInput.checked) {

        error.textContent =
            "You must accept the terms and conditions.";

        error.className = "error";

        return false;
    }


    error.textContent =
        "✓ Terms accepted";

    error.className = "success";

    return true;
}


// ==========================================
// ERROR FUNCTION
// ==========================================

function showError(input, error, message) {

    input.classList.remove("valid");

    input.classList.add("invalid");

    error.textContent = message;

    error.className = "error";
}


// ==========================================
// SUCCESS FUNCTION
// ==========================================

function showSuccess(input, error, message) {

    input.classList.remove("invalid");

    input.classList.add("valid");

    error.textContent = message;

    error.className = "success";
}


// ==========================================
// LIVE INPUT EVENTS
// ==========================================

nameInput.addEventListener("input", validateName);

emailInput.addEventListener("input", validateEmail);

phoneInput.addEventListener("input", validatePhone);

ageInput.addEventListener("input", validateAge);

passwordInput.addEventListener("input", validatePassword);

confirmInput.addEventListener(
    "input",
    validateConfirmPassword
);


// ==========================================
// CHANGE EVENTS
// ==========================================

planInput.addEventListener(
    "change",
    validatePlan
);

dateInput.addEventListener(
    "change",
    validateDate
);

termsInput.addEventListener(
    "change",
    validateTerms
);


// ==========================================
// BLUR EVENTS
// ==========================================

nameInput.addEventListener(
    "blur",
    validateName
);

emailInput.addEventListener(
    "blur",
    validateEmail
);

phoneInput.addEventListener(
    "blur",
    validatePhone
);

ageInput.addEventListener(
    "blur",
    validateAge
);


// ==========================================
// FORM SUBMIT EVENT
// ==========================================

form.addEventListener("submit", function(event) {

    event.preventDefault();


    let validName = validateName();

    let validEmail = validateEmail();

    let validPhone = validatePhone();

    let validAge = validateAge();

    let validPlan = validatePlan();

    let validDate = validateDate();

    let validPassword = validatePassword();

    let validConfirm = validateConfirmPassword();

    let validTerms = validateTerms();


    let allValid =
        validName &&
        validEmail &&
        validPhone &&
        validAge &&
        validPlan &&
        validDate &&
        validPassword &&
        validConfirm &&
        validTerms;


    let success =
        document.getElementById("successMessage");


    if (allValid) {

        success.style.display = "block";

        success.innerHTML =
            "🎉 Admission Successful! Welcome to FITZONE GYM.";

        form.reset();

    } else {

        success.style.display = "block";

        success.style.background =
            "rgba(239, 68, 68, 0.1)";

        success.style.borderColor =
            "rgba(239, 68, 68, 0.3)";

        success.style.color =
            "#f87171";

        success.innerHTML =
            "⚠️ Please correct the highlighted fields.";

    }

});