function normalize(text) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");
}

function isPalindrome(text) {

    const cleaned = normalize(text);

    const reversed = cleaned
        .split("")
        .reverse()
        .join("");

    return cleaned === reversed;
}

function checkPalindrome() {

    try {

        const input = document.getElementById("text-input").value;

        if (input.trim() === "") {
            throw "Please enter some text.";
        }

        const result = document.getElementById("result");

        if (isPalindrome(input)) {

            result.className = "result success";
            result.innerHTML =
                '<i class="fa-solid fa-circle-check"></i> Palindrome';

        } else {

            result.className = "result fail";
            result.innerHTML =
                '<i class="fa-solid fa-circle-xmark"></i> Not a palindrome';
        }

    }

    catch(error){

        alert(error);

    }

}