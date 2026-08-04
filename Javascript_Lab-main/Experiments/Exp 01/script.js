// External JavaScript File

console.log("=== External JavaScript ===");
console.log("External JavaScript file (script.js) loaded successfully");

// Function using External JavaScript
function showWelcomeMessage() {
    var studentName = "Jash Chauhan";
    var currentDate = new Date();
    var hours = currentDate.getHours();
    var greeting;
    
    if (hours < 12) {
        greeting = "Good Morning";
    } else if (hours < 18) {
        greeting = "Good Afternoon";
    } else {
        greeting = "Good Evening";
    }
    
    var welcomeText = greeting + ", " + studentName + "! Welcome to JavaScript Programming.";
    
    document.getElementById("welcomeMessage").innerHTML = 
        "<strong>Welcome Message:</strong><br>" + welcomeText;
    
    console.log("Welcome message displayed using External JavaScript");
    console.log("Message: " + welcomeText);
    console.info("Current time: " + currentDate.toLocaleTimeString());
}

console.log("All JavaScript functions are ready!");
