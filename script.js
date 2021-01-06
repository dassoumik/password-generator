// Assignment Code
var multiplier;
var count = 0;
var validPassLength = false;
var warn = false;
var noWarn = false;
var selListLen;
var passLength;
var passSingle;
var selListElement;
var passCode;
var passwordArray = " ";
var generateBtn = document.querySelector("#generate");
var passSelect = {
  lc: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
    "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
  ],
  uc: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
    "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
  ],
  num: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  sc: ["~", "!", "@", "#", "$", "%", "-", "+", "^", "*", "(", "{"]
};
var selList = [];
var h2Select = document.querySelector(".wrapper .card .card-header h2");
var cardSelect = document.querySelector(".card-header");
var buttonGenerate = document.querySelector("#generate");

var warnMesg = document.createElement("label");
var h3Text = document.createElement("h3");
var passLenInput = document.createElement("input");
var passLenLabel = document.createElement("label");
var qForm = document.createElement("form");
var lForm = document.createElement("form");

h3Text.textContent = "Select all that apply!";

var cBox1 = document.createElement("input");
var lBox1 = document.createElement("label");

var cBox2 = document.createElement("input");
var lBox2 = document.createElement("label");

var cBox3 = document.createElement("input");
var lBox3 = document.createElement("label");

var cBox4 = document.createElement("input");
var lBox4 = document.createElement("label");

var buttonApply = document.createElement("button");
var buttonApplyLength = document.createElement("button");
var buttonGenNxtPwd = document.createElement("button");

var invalidLength = document.createElement("label");

var applyDiv = document.createElement("div");
var applyLengthDiv = document.createElement("div");
var genNxtPwdDiv = document.createElement("div");


var breakLine1 = document.createElement("br");
var breakLine2 = document.createElement("br");
var breakLine3 = document.createElement("br");
var breakLine4 = document.createElement("br");
var breakLine5 = document.createElement("br");
var breakLine6 = document.createElement("br");

warnMesg.textContent = "Please check atleast one box.";
warnMesg.setAttribute("style", "color: red;");

passLenInput.setAttribute("type", "text");
passLenInput.classList.add("hide", "txt", "outline-none");

passLenLabel.textContent = "Please select password length min 8, max 128.";
passLenLabel.classList.add("hide");

cBox1.setAttribute("type", "checkbox");
cBox1.setAttribute("name", "lc");
cBox1.setAttribute("value", "lowerCase");
cBox1.classList.add("cbox");
lBox1.setAttribute("for", "cBox1");
lBox1.textContent = "Do you want your password to have lower case characters?";


cBox2.setAttribute("type", "checkbox");
cBox2.setAttribute("name", "uc");
cBox2.setAttribute("value", "upperCase");
lBox2.setAttribute("for", "cBox2");
lBox2.textContent = "Do you want your password to have upper case characters?";

cBox3.setAttribute("type", "checkbox");
cBox3.setAttribute("name", "num");
cBox3.setAttribute("value", "number");
lBox3.setAttribute("for", "cBox3");
lBox3.textContent = "Do you want your password to have numbers?";

cBox4.setAttribute("type", "checkbox");
cBox4.setAttribute("name", "sc");
cBox4.setAttribute("value", "specialCharacter");
lBox4.setAttribute("for", "cBox4");
lBox4.textContent = "Do you want your password to have special characters?";

qForm.setAttribute("style", "margin: auto; padding: auto;");

lForm.setAttribute("class", "hide");
lForm.setAttribute("style", "margin: auto; padding: auto;");

invalidLength.textContent = "Please input valid length!";
invalidLength.setAttribute("style", "color: red");

applyDiv.classList.add("card-div");

buttonApply.setAttribute("onclick", "apply(); return false;");
buttonApply.textContent = "Apply Selection";
buttonApply.classList.add("btn", "outline-none");

applyLengthDiv.classList.add("card-div", "hide");

buttonApplyLength.setAttribute("onclick", "applyLength(); return false;");
buttonApplyLength.textContent = "Apply Length";
buttonApplyLength.classList.add("btn", "hide", "outline-none");

genNxtPwdDiv.classList.add("card-div", "hide");

buttonGenerate.classList.add("outline-none");

buttonGenNxtPwd.setAttribute("onclick", "generateNextPassword();");
buttonGenNxtPwd.textContent = "Refresh & Restart";
buttonGenNxtPwd.classList.add("btn", "hide", "outline-none");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  if (password != null && password != " ") {
    passwordText.value = password;
    buttonGenerate.classList.add("hide");
    genNxtPwdDiv.classList.remove("hide");
    buttonGenNxtPwd.classList.remove("hide");
  } else
    passwordText.value = "Your Secure Password";
}

function generatePassword() {
  // add the forms for complexity and length selection
  h2Select.after(qForm);
  qForm.after(lForm);

  qForm.appendChild(h3Text);
  h3Text.after(cBox1);
  cBox1.after(lBox1);
  lBox1.after(breakLine1);

  breakLine1.after(cBox2);
  cBox2.after(lBox2);
  lBox2.after(breakLine2);

  breakLine2.after(cBox3);
  cBox3.after(lBox3);
  lBox3.after(breakLine3);

  breakLine3.after(cBox4);
  cBox4.after(lBox4);
  lBox4.after(breakLine4);

  // Below are length selection forms and refresh buttons 
  // initially set as hidden elements on definition.
  breakLine4.after(applyDiv);
  applyDiv.appendChild(buttonApply);
  lForm.appendChild(passLenLabel);
  passLenLabel.after(passLenInput);
  passLenInput.after(breakLine5);
  breakLine5.after(applyLengthDiv);
  applyLengthDiv.appendChild(buttonApplyLength);

  buttonGenerate.after(breakLine6);
  breakLine6.after(buttonGenNxtPwd);

  buttonGenerate.disabled = true;

  return passwordArray;
}

function apply() {
  // This is function is run when "Apply Selection" button is clicked.
  // It does the validation and sets flags for selection criteria.
  if (qForm.lc.checked == false && qForm.uc.checked == false &&
    qForm.num.checked == false && qForm.sc.checked == false) {

    h3Text.before(warnMesg);
    warn = true;

  } else {
    noWarn = true;
    if (qForm.lc.checked) {
      selList.push("lc");
    }
    if (qForm.uc.checked) {
      selList.push("uc");

    }
    if (qForm.num.checked) {
      selList.push("num");
    }
    if (qForm.sc.checked) {
      selList.push("sc");
    }

    selListLen = selList.length;
    passLenLabel.classList.remove("hide");
    passLenInput.classList.remove("hide");
    qForm.classList.add("hide");
    lForm.classList.remove("hide");
    applyLengthDiv.classList.remove("hide");
    buttonApplyLength.classList.remove("hide");
    passLenInput.focus();
  }
}

function applyLength() {
  // This function runs on clicking "Apply Length" button. It validates the length
  // and creates the password based on chosen complexity and length.
  passLength = parseInt(passLenInput.value);
  if (passLength > 7 && passLength < 129) {
    validPassLength = true;


    for (let i = 0; i < passLength; i++) {

      x = Math.floor(Math.random() * selListLen);
      selListElement = selList[x];
      switch (selListElement) {
        case ("lc" || "uc"):
          multiplier = 26;
        case ("num"):
          multiplier = 10;
        case ("sc"):
          multiplier = 12;
        default:
          multiplier = 10;
      }

      randomNumber = Math.floor(Math.random() * multiplier);
      passCode = passSelect[selListElement];
      passSingle = passCode[randomNumber];
      passwordArray = passwordArray + passSingle;
    }
  }
  passwordArray.trim();
  if (noWarn && validPassLength) {
    lForm.classList.add("hide");
    buttonGenerate.disabled = false;
    buttonGenerate.click();
  } else {
    if (count === 0) {
      lForm.lastElementChild.before(invalidLength);
      passLenInput.focus();
      count++;
    }
  }
}

function generateNextPassword() {
  // Reloads the home page on clicking the "Refresh" button.
  location.reload();
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);