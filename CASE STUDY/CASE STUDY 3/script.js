// Scholarship Eligibility Checker
// Case Study: A college awards scholarships based on marks

// Detailed custom SVG icons for each scholarship tier
const ICONS = {
    'not-eligible': `
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Shield body -->
            <path d="M32 4L8 16V32C8 44.84 18.8 56.12 32 60C45.2 56.12 56 44.84 56 32V16L32 4Z" fill="#2a1215" stroke="#ef4444" stroke-width="2.5"/>
            <!-- Inner shield highlight -->
            <path d="M32 10L14 19V32C14 42.2 22.4 51.2 32 54.4C41.6 51.2 50 42.2 50 32V19L32 10Z" fill="#1f0a0d" stroke="#ef4444" stroke-width="0.5" opacity="0.4"/>
            <!-- X mark -->
            <path d="M23 23L41 41" stroke="#ef4444" stroke-width="4.5" stroke-linecap="round"/>
            <path d="M41 23L23 41" stroke="#ef4444" stroke-width="4.5" stroke-linecap="round"/>
            <!-- Corner accents -->
            <circle cx="32" cy="14" r="1.5" fill="#ef4444" opacity="0.5"/>
        </svg>`,

    'bronze': `
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Ribbon -->
            <path d="M22 4H42L38 18H26L22 4Z" fill="#a0522d"/>
            <path d="M26 4L22 18" stroke="#8b4513" stroke-width="0.8"/>
            <path d="M32 4V18" stroke="#8b4513" stroke-width="0.5" opacity="0.4"/>
            <path d="M38 4L42 18" stroke="#8b4513" stroke-width="0.8"/>
            <!-- Medal body -->
            <circle cx="32" cy="38" r="20" fill="#cd7f32" stroke="#a0622a" stroke-width="2"/>
            <!-- Inner ring -->
            <circle cx="32" cy="38" r="15" fill="none" stroke="#daa06d" stroke-width="1.2"/>
            <!-- Star in center -->
            <polygon points="32,25 35,33 43,33 37,38 39,46 32,42 25,46 27,38 21,33 29,33" fill="#e8a848" stroke="#b8762a" stroke-width="0.5"/>
            <!-- Shine -->
            <path d="M22 28C24 24 28 22 32 22" stroke="#e8c088" stroke-width="1" stroke-linecap="round" opacity="0.6"/>
        </svg>`,

    'silver': `
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Ribbon -->
            <path d="M22 4H42L38 18H26L22 4Z" fill="#8a8a98"/>
            <path d="M26 4L22 18" stroke="#707080" stroke-width="0.8"/>
            <path d="M32 4V18" stroke="#707080" stroke-width="0.5" opacity="0.4"/>
            <path d="M38 4L42 18" stroke="#707080" stroke-width="0.8"/>
            <!-- Medal body -->
            <circle cx="32" cy="38" r="20" fill="#c0c0c0" stroke="#a8a8b0" stroke-width="2"/>
            <!-- Inner ring -->
            <circle cx="32" cy="38" r="15" fill="none" stroke="#d8d8e0" stroke-width="1.2"/>
            <!-- Star in center -->
            <polygon points="32,25 35,33 43,33 37,38 39,46 32,42 25,46 27,38 21,33 29,33" fill="#d8d8e0" stroke="#a0a0a8" stroke-width="0.5"/>
            <!-- Shine -->
            <path d="M22 28C24 24 28 22 32 22" stroke="#e8e8f0" stroke-width="1" stroke-linecap="round" opacity="0.7"/>
        </svg>`,

    'gold': `
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Ribbon -->
            <path d="M22 4H42L38 18H26L22 4Z" fill="#daa520"/>
            <path d="M26 4L22 18" stroke="#b8860b" stroke-width="0.8"/>
            <path d="M32 4V18" stroke="#b8860b" stroke-width="0.5" opacity="0.4"/>
            <path d="M38 4L42 18" stroke="#b8860b" stroke-width="0.8"/>
            <!-- Medal body -->
            <circle cx="32" cy="38" r="20" fill="#ffd700" stroke="#daa520" stroke-width="2"/>
            <!-- Inner ring -->
            <circle cx="32" cy="38" r="15" fill="none" stroke="#ffe44d" stroke-width="1.2"/>
            <!-- Star in center -->
            <polygon points="32,25 35,33 43,33 37,38 39,46 32,42 25,46 27,38 21,33 29,33" fill="#ffe866" stroke="#d4a800" stroke-width="0.5"/>
            <!-- Shine -->
            <path d="M22 28C24 24 28 22 32 22" stroke="#fff4a0" stroke-width="1" stroke-linecap="round" opacity="0.8"/>
        </svg>`,

    'platinum': `
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Diamond top facets -->
            <path d="M12 20H52L32 56L12 20Z" fill="#e5e4e2" stroke="#c8c8c6" stroke-width="1.5"/>
            <!-- Top edge -->
            <path d="M8 20L16 8H48L56 20H8Z" fill="#f0efed" stroke="#d0d0ce" stroke-width="1"/>
            <!-- Center facets -->
            <path d="M8 20L32 56L24 20Z" fill="#d8d7d5"/>
            <path d="M56 20L32 56L40 20Z" fill="#d8d7d5"/>
            <!-- Top inner facets -->
            <path d="M16 8L24 20H8Z" fill="#e0dfdd"/>
            <path d="M48 8L40 20H56Z" fill="#e0dfdd"/>
            <path d="M16 8H48L40 20H24Z" fill="#f5f4f2"/>
            <!-- Center vertical line -->
            <path d="M32 56L32 20" stroke="#c8c8c6" stroke-width="0.6"/>
            <path d="M32 20L16 8" stroke="#c8c8c6" stroke-width="0.5"/>
            <path d="M32 20L48 8" stroke="#c8c8c6" stroke-width="0.5"/>
            <!-- Sparkle highlights -->
            <circle cx="28" cy="16" r="1" fill="#fff" opacity="0.8"/>
            <circle cx="38" cy="14" r="0.7" fill="#fff" opacity="0.6"/>
            <path d="M20 26L22 24" stroke="#fff" stroke-width="0.8" stroke-linecap="round" opacity="0.5"/>
        </svg>`
};

function checkScholarship() {
    const input = document.getElementById('marksInput');
    const resultSection = document.getElementById('resultSection');
    const resultCard = document.getElementById('resultCard');
    const resultIcon = document.getElementById('resultIcon');
    const resultTitle = document.getElementById('resultTitle');
    const resultMarks = document.getElementById('resultMarks');
    const resultMessage = document.getElementById('resultMessage');

    const marks = parseFloat(input.value);

    // Validate input
    if (isNaN(marks) || marks < 0 || marks > 100) {
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 400);
        resultSection.classList.remove('visible');
        alert('Please enter valid marks between 0 and 100.');
        return;
    }

    let category, message, cssClass;

    if (marks < 50) {
        category = 'Not Eligible';
        message = 'Score below 50. Keep working hard — you can improve!';
        cssClass = 'not-eligible';
    } else if (marks >= 50 && marks <= 69) {
        category = 'Bronze Scholarship';
        message = 'Great start! You\'ve earned a Bronze Scholarship.';
        cssClass = 'bronze';
    } else if (marks >= 70 && marks <= 84) {
        category = 'Silver Scholarship';
        message = 'Impressive performance! You\'ve earned a Silver Scholarship.';
        cssClass = 'silver';
    } else if (marks >= 85 && marks <= 94) {
        category = 'Gold Scholarship';
        message = 'Outstanding! You\'ve earned a Gold Scholarship.';
        cssClass = 'gold';
    } else if (marks >= 95 && marks <= 100) {
        category = 'Platinum Scholarship';
        message = 'Exceptional! You\'ve earned the prestigious Platinum Scholarship!';
        cssClass = 'platinum';
    }

    // Update the result card
    resultCard.className = 'result-card ' + cssClass;
    resultIcon.innerHTML = ICONS[cssClass];
    resultTitle.textContent = category;
    resultMarks.textContent = 'Your Marks: ' + marks + ' / 100';
    resultMessage.textContent = message;

    // Show result with animation
    resultSection.classList.remove('visible');
    // Force reflow to restart animation
    void resultSection.offsetWidth;
    resultSection.classList.add('visible');
}

// Allow pressing Enter to check
document.getElementById('marksInput').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        checkScholarship();
    }
});
