// ==========================================
// EXPERIMENT 9
// LOCALSTORAGE AND SESSIONSTORAGE
// ==========================================


// ==========================================
// LOAD SAVED THEME
// ==========================================

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
    document.body.className = savedTheme;
    updateThemeStatus(savedTheme);
} else {
    document.body.className = "dark";
}


// ==========================================
// CHANGE THEME
// ==========================================

function setTheme(theme) {

    document.body.className = theme;

    // Save theme permanently
    localStorage.setItem("theme", theme);

    updateThemeStatus(theme);
}


// ==========================================
// UPDATE THEME MESSAGE
// ==========================================

function updateThemeStatus(theme) {

    const status =
        document.getElementById("themeStatus");

    status.textContent =
        "Current theme: " +
        theme.charAt(0).toUpperCase() +
        theme.slice(1);
}


// ==========================================
// SAVE USER NAME IN SESSION STORAGE
// ==========================================

function saveSession() {

    const username =
        document.getElementById("username").value.trim();

    const status =
        document.getElementById("sessionStatus");

    if (username === "") {

        status.textContent =
            "⚠️ Please enter your name.";

        return;
    }

    sessionStorage.setItem("username", username);

    status.textContent =
        "✓ Welcome, " + username + "!";
}


// ==========================================
// LOAD SESSION DATA
// ==========================================

const savedUsername =
    sessionStorage.getItem("username");

if (savedUsername) {

    document.getElementById("username").value =
        savedUsername;

    document.getElementById("sessionStatus").textContent =
        "✓ Welcome back, " + savedUsername + "!";
}


// ==========================================
// CLEAR STORAGE
// ==========================================

function clearPreferences() {

    localStorage.removeItem("theme");

    sessionStorage.removeItem("username");

    document.body.className = "dark";

    document.getElementById("username").value = "";

    document.getElementById("themeStatus").textContent =
        "Current theme: Dark";

    document.getElementById("sessionStatus").textContent =
        "Preferences cleared.";

}