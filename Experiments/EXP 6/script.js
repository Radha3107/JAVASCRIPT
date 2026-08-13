// ==========================================
// EXPERIMENT 6
// String Functions and Regular Expressions
// Email Validation, Data Extraction & Text Analysis
// ==========================================


// ==========================================
// 1. EMAIL VALIDATION
// ==========================================

function validateEmail() {

    let email = document.getElementById("email").value.trim();

    // Regular Expression for email validation
    let emailPattern =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    let result = document.getElementById("emailResult");

    if (emailPattern.test(email)) {

        result.innerHTML = `
            <span class="success">
                ✓ Valid Email Address
            </span>
            <br>
            Email: ${email}
        `;

    } else {

        result.innerHTML = `
            <span class="error">
                ✗ Invalid Email Address
            </span>
            <br>
            Please enter a valid email address.
        `;

    }
}


// ==========================================
// 2. DATA EXTRACTION - EMAILS
// ==========================================

function extractEmails() {

    let text = document.getElementById("dataText").value;

    // Global regex to find email addresses
    let emailPattern =
        /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

    let emails = text.match(emailPattern);

    let result = document.getElementById("extractionResult");

    if (emails) {

        result.innerHTML = `
            <b>Extracted Email Addresses:</b>
            <br><br>

            ${emails.map(email =>
                `<span class="tag">${email}</span>`
            ).join("")}
        `;

    } else {

        result.innerHTML =
            "No email addresses found.";

    }
}


// ==========================================
// 3. DATA EXTRACTION - PHONE NUMBERS
// ==========================================

function extractNumbers() {

    let text = document.getElementById("dataText").value;

    // Regex for 10-digit phone numbers
    let phonePattern = /\b\d{10}\b/g;

    let numbers = text.match(phonePattern);

    let result = document.getElementById("extractionResult");

    if (numbers) {

        result.innerHTML = `
            <b>Extracted Phone Numbers:</b>
            <br><br>

            ${numbers.map(number =>
                `<span class="tag">${number}</span>`
            ).join("")}
        `;

    } else {

        result.innerHTML =
            "No phone numbers found.";

    }
}


// ==========================================
// 4. DATA EXTRACTION - WORDS
// ==========================================

function extractWords() {

    let text = document.getElementById("dataText").value;

    // Regex to extract alphabetic words
    let words = text.match(/\b[A-Za-z]+\b/g);

    let result = document.getElementById("extractionResult");

    if (words) {

        result.innerHTML = `
            <b>Total Words:</b>
            ${words.length}

            <br><br>

            <b>Extracted Words:</b>
            <br><br>

            ${words.map(word =>
                `<span class="tag">${word}</span>`
            ).join("")}
        `;

    } else {

        result.innerHTML =
            "No words found.";

    }
}


// ==========================================
// 5. TEXT ANALYSIS
// ==========================================

function analyzeText() {

    let text =
        document.getElementById("analysisText").value.trim();

    let result =
        document.getElementById("analysisResult");


    if (text === "") {

        result.innerHTML = `
            <span class="error">
                Please enter some text.
            </span>
        `;

        return;
    }


    // String length
    let characters = text.length;


    // Split text into words
    let words = text.split(/\s+/);


    // Count sentences using Regex
    let sentences = text.match(/[.!?]+/g);

    let sentenceCount =
        sentences ? sentences.length : 0;


    // Count vowels using Regex
    let vowels = text.match(/[aeiou]/gi);

    let vowelCount =
        vowels ? vowels.length : 0;


    // Count digits using Regex
    let digits = text.match(/\d/g);

    let digitCount =
        digits ? digits.length : 0;


    // String functions
    let upperText = text.toUpperCase();

    let lowerText = text.toLowerCase();


    // Display analysis
    result.innerHTML = `

        <b>Characters:</b>
        <span class="highlight">
            ${characters}
        </span>
        <br>

        <b>Words:</b>
        <span class="highlight">
            ${words.length}
        </span>
        <br>

        <b>Sentences:</b>
        <span class="highlight">
            ${sentenceCount}
        </span>
        <br>

        <b>Vowels:</b>
        <span class="highlight">
            ${vowelCount}
        </span>
        <br>

        <b>Digits:</b>
        <span class="highlight">
            ${digitCount}
        </span>

        <br><br>

        <b>Uppercase Text:</b>
        <br>
        ${upperText}

        <br><br>

        <b>Lowercase Text:</b>
        <br>
        ${lowerText}

    `;

}