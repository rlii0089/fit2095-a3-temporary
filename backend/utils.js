const studentIDTwoDigits = 33; // Student ID: 33119937
const studentNameInitials = "RL"; // Name: Raymond Li

/**
 * Generate a driver ID.
 * @returns {string} The driver ID.
 */
function generateDriverID() {
    // Generate a driver ID in the format DXX-33-YYY where X is a random digit, Y is a random letter.
    return `D${this.generateRandomDigits(2)}-${studentIDTwoDigits}-${this.generateRandomLetters(3)}`;
}

/**
 * Generate a package ID
 * @returns {string} - The package ID
 */
function generatePackageID() {
    // Generate a package ID in the format PXXX-RL-YYY where X is a random digit, Y is a random letter
    return `P${this.generateRandomLetters(3)}-${studentNameInitials}-${this.generateRandomDigits(3)}`;
}

/**
 * Generate a random string of letters.
 * @param {number} numberOfLetters - The number of letters to generate.
 * @returns {string} The random string of letters.
 */
function generateRandomLetters(numberOfLetters) {
    let randomLetters = '';
    let lettersChoices = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < numberOfLetters; i++) {
        randomLetters += lettersChoices.charAt(Math.floor(Math.random() * lettersChoices.length)); // Append a random letter to the string of random letters
    }
    return randomLetters;
}

/**
 * Generate a random number.
 * @param {number} numberOfDigits - The number of digits to generate.
 * @returns {number} The random number
 */
function generateRandomDigits(numberOfDigits) {
    return Math.floor(Math.random() * 10 ** numberOfDigits);
}

module.exports = {
    generateDriverID,
    generatePackageID,
    generateRandomLetters,
    generateRandomDigits
}; // Export the functions
