// ==========================================
// Case Study 4: ATM Card PIN Verification
// Demonstrating: Functions, Scope, Closure
// ==========================================

// --- 1. Function Declaration (Scope: Global) ---
// Reverses a string
function reverseString(str) {
    return str.split('').reverse().join('');
}

// --- 2. Function Expression (Scope: Global) ---
// Checks if original and reversed strings are identical
const isPalindrome = function(original, reversed) {
    return original === reversed;
};

// --- 3. Arrow Function & 4. Closure (Scope: Global & Local) ---
// Factory function demonstrating closure to keep track of secure attempts
const createATMSystem = () => {
    // Scope: Local variables to createATMSystem
    let attempts = 0; 
    const MAX_ATTEMPTS = 3;

    // The returned arrow function creates a closure, retaining access to 'attempts' and 'MAX_ATTEMPTS'
    return (pin) => {
        attempts++;
        
        if (attempts > MAX_ATTEMPTS) {
            return {
                status: 'BLOCKED',
                message: 'CARD BLOCKED. TOO MANY FAILED ATTEMPTS.'
            };
        }
        
        const reversedPin = reverseString(pin);
        const valid = isPalindrome(pin, reversedPin);
        
        if (valid) {
            // Reset attempts on success if we wanted a real system, but we'll leave it simple
            attempts = 0; 
            return {
                status: 'SUCCESS',
                message: 'SECURITY VERIFIED: PIN IS PALINDROME. ACCESS GRANTED.'
            };
        } else {
            return {
                status: 'ERROR',
                message: `INVALID PIN. ATTEMPT ${attempts} OF ${MAX_ATTEMPTS}.`
            };
        }
    };
};

// Initialize the secure verifier instance (closure is active)
const verifyPin = createATMSystem();

// ==========================================
// UI Interaction Logic
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    let currentPin = "";
    
    // DOM Elements
    const pinDisplay = document.getElementById("pin-display");
    const messageArea = document.getElementById("message-area");
    const numKeys = document.querySelectorAll(".num-key");
    const btnClear = document.getElementById("btn-clear");
    const btnCancel = document.getElementById("btn-cancel");
    const btnEnter = document.getElementById("btn-enter");
    
    // Update the visual dots on the ATM screen
    function updateDisplay() {
        pinDisplay.innerHTML = "";
        for (let i = 0; i < currentPin.length; i++) {
            const dot = document.createElement("div");
            dot.className = "pin-dot";
            pinDisplay.appendChild(dot);
        }
    }
    
    // Display messages on the screen
    function showMessage(msg, type) {
        messageArea.textContent = msg;
        messageArea.className = `message-area ${type === 'error' ? 'msg-error' : (type === 'success' ? 'msg-success' : '')}`;
        
        // Clear success/error message after 3 seconds, unless it's a block message
        if (!msg.includes("BLOCKED") && !msg.includes("GRANTED")) {
            setTimeout(() => {
                messageArea.textContent = "";
                messageArea.className = "message-area";
            }, 3000);
        }
    }
    
    // Number pad click events
    numKeys.forEach(key => {
        key.addEventListener("click", () => {
            // Max 6 digits PIN
            if (currentPin.length < 6) { 
                currentPin += key.getAttribute("data-val");
                updateDisplay();
            }
        });
    });
    
    // Clear key (removes last entered digit)
    btnClear.addEventListener("click", () => {
        currentPin = currentPin.slice(0, -1);
        updateDisplay();
    });
    
    // Cancel key (clears entire input)
    btnCancel.addEventListener("click", () => {
        currentPin = "";
        updateDisplay();
        showMessage("OPERATION CANCELLED", "error");
    });
    
    // Enter key (Submits PIN for verification)
    btnEnter.addEventListener("click", () => {
        if (currentPin.length === 0) {
            showMessage("PLEASE ENTER A PIN", "error");
            return;
        }
        
        // Execute PIN Verification using our closure
        const result = verifyPin(currentPin);
        
        if (result.status === 'BLOCKED') {
            showMessage(result.message, "error");
            // Visually disable keypad
            document.querySelectorAll(".key").forEach(btn => {
                btn.style.opacity = "0.5";
                btn.style.pointerEvents = "none";
            });
            currentPin = "";
            updateDisplay();
        } else if (result.status === 'SUCCESS') {
            showMessage(result.message, "success");
            currentPin = "";
            updateDisplay();
        } else {
            showMessage(result.message, "error");
            currentPin = "";
            updateDisplay();
        }
    });
});
