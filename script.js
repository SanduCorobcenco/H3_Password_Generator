// Array of upper cased characters to be included in password
var upperCasedCharacters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
// Array of lower cased characters to be included in password
var lowerCasedCharacters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
// Array of numeric characters to be included in password
var numericCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
// Array of special characters to be included in password
var specialCharacters = ["@", "%", "+", "\\", "/", "'", "!", "#", "$", "^", "?", ":", ",", ")", "(", "}", "{", "]", "[", "~", "-", "_", "."];

// Function that will prompt user for password options
function passwordOptions(){
    var length = parseInt(prompt("How many characters would you like your passoword to contain?"));

// Checking if password length is a number
if (isNaN(length) === true) {
    alert("Password length must be a number");
    return;
  }

// Checking if password length is less than 8 characters, if it evaluates true alert will appear
if ( length < 8 ) {
    alert("Password length must be at least 8 characters");
    return;
}

// Checking if password length is greater than 128 characters, if it evaluates true alert will appear
if ( length > 128 ) {
    alert("Password length must be less than 129");
    return;
}

// Variable to store boolean regarding the inclusion of upper cased characters
var includingUpperCasedCharacters = confirm(
    "Click OK to confirm including Upper Cased Characters");

// Variable to store boolean regarding the inclusion of lower cased characters
var includingLowerCasedCharacters = confirm(
    "Click OK to confirm including Lower Cased Characters");

// Variable to store boolean regarding the inclusion of numeric characters
var includingNumericCharacters = confirm(
    "Click OK to confirm including Numeric Characters");

// Variable to store boolean regarding the inclusion of special characters
var includingSpecialCharacters = confirm(
    "Click OK to confirm including Special Characters");

// Conditional statement to check if user does not include any types of characters. Password generator ends if all four variables evaluate to false
if(includingUpperCasedCharacters === false &&
   includingLowerCasedCharacters === false &&
   includingNumericCharacters === false &&
   includingSpecialCharacters === false
   ){
       alert("The password must including at least one character type")
       return;
   };

// Declaring object that will store user input
var passwordOptionsObject = {
    length: length,
    includingUpperCasedCharacters: includingUpperCasedCharacters,
    includingLowerCasedCharacters: includingLowerCasedCharacters,
    includingNumericCharacters: includingNumericCharacters, 
    includingSpecialCharacters: includingSpecialCharacters
};
return passwordOptionsObject;
};

// Declaring function that will get random element from array
function getRandom(array) {
var randomIndex = Math.floor(Math.random() * array.length );
var randomCharacter = array[randomIndex];
return randomCharacter;
};

// Declaring function that will generate password
function generatePassword() {
    var options = passwordOptions();
    // Variable to store password as it's being concatenated
    var result = [];
  
    // Array to store types of characters to include in password
    var possibleCharacters = [];
  
    // Array to contain one of each type of chosen character to ensure each will be used
    var guaranteedCharacters = [];
  
    // Conditional statement that adds array of special characters into array of possible characters based on user input
    // Push new random special character to guaranteedCharacters
    if (options.includingSpecialCharacters) {
      possibleCharacters = possibleCharacters.concat(specialCharacters);
      guaranteedCharacters.push(getRandom(specialCharacters));
    }
  
    // Conditional statement that adds array of numeric characters into array of possible characters based on user input
    // Push new random special character to guaranteedCharacters
    if (options.includingNumericCharacters) {
      possibleCharacters = possibleCharacters.concat(numericCharacters);
      guaranteedCharacters.push(getRandom(numericCharacters));
    }
  
    // Conditional statement that adds array of lowercase characters into array of possible characters based on user input
    // Push new random lower-cased character to guaranteedCharacters
    if (options.includingLowerCasedCharacters) {
      possibleCharacters = possibleCharacters.concat(lowerCasedCharacters);
      guaranteedCharacters.push(getRandom(lowerCasedCharacters));
    }
  
    // Conditional statement that adds array of uppercase characters into array of possible characters based on user input
    // Push new random upper-cased character to guaranteedCharacters
    if (options.includingUpperCasedCharacters) {
      possibleCharacters = possibleCharacters.concat(upperCasedCharacters);
      guaranteedCharacters.push(getRandom(upperCasedCharacters));
    }
  
    // For loop to iterate over the password length from the options object, selecting random indices from the array of possible characters and concatenating those characters into the result variable
    for (var i = 0; i < options.length; i++) {
      var possibleCharacter = getRandom(possibleCharacters);
  
      result.push(possibleCharacter);
    }
  
    // Mix in at least one of each guaranteed character in the result
    for (var i = 0; i < guaranteedCharacters.length; i++) {
      result[i] = guaranteedCharacters[i];
    }
  
    // Transform the result into a string and pass into writePassword
    return result.join("");
  }
  
// Get references to the #copy_button and #generate_button elements
  var copyButton = document.querySelector("#copy_button");
  var generateButton = document.querySelector("#generate_button");
  
// Write password to the #password input
  function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");
  
    passwordText.value = password;
  
    copyButton.removeAttribute("disabled");
    copyButton.focus();
  }
  
// Declaring function that allows to copy password to clipboard
  function copyToClipboard() {
    var passwordText = document.querySelector("#password");
  
    passwordText.select();
    document.execCommand("copy");
  
    alert(
      "Your password " + passwordText.value + " was copied to your clipboard."
    );
  }
  
// Add event listener to generate button
  generateButton.addEventListener("click", writePassword);
  
// Add event listener to copy button
  copyButton.addEventListener("click", copyToClipboard);