turnAlertOn = false;
//Set background color
document.getElementById("moodArea").style.background = "#B4B1B1";
document.body.style.background = "#B9B1B1";

//mood button unpressed (turn fun mode off)
function moodOff(myVar1) {
  clearInterval(myVar1);
  //reset color of page back to its initial state
  document.getElementById("leftTxt").setAttribute("style", "color: rgb(0,0,0)");
  document
    .getElementById("rightTxt")
    .setAttribute("style", "color: rgb(0,0,0)");
  document.getElementById("moodArea").style.background = "#B4B1B1";
  //check if the Change Mood button was pressed
  document.getElementsByClassName("active").length;
}

//Change Mood button on/off control
var moodBtn = document.getElementById("checkedBtn");
moodBtn.addEventListener("click", function() {
  turnAlertOn = true;
  var myVar1 = setInterval(function() {
    //check the active state of the button

    if (document.getElementsByClassName("active").length > 0) {
      if (turnAlertOn) {
        alert(
          "You have activated 'Fun Mode'. Do not worry about the background changing its colors. You can turn this mode off by clicking the 'Change Mood' button below."
        );
        turnAlertOn = false;
      }
      timeNow = new Date();
      //coding area background color changer
      r = Math.floor(Math.random() * 255);
      g = Math.floor(Math.random() * 255);
      b = Math.floor(Math.random() * 255);
      document.getElementById("moodArea").style.background =
        "rgb(" + r + "," + g + "," + b + ")";
      document
        .getElementById("leftTxt")
        .setAttribute(
          "style",
          "color: rgb(" + (255 - r) + "," + (255 - g) + "," + (255 - b) + ")"
        );
      document
        .getElementById("rightTxt")
        .setAttribute(
          "style",
          "color: rgb(" + (255 - r) + "," + (255 - g) + "," + (255 - b) + ")"
        );
    } else {
      turnAlertOn = false;
      moodOff();
    }
  }, 5000);
});

//Pressing the run code buttons
//get input JavaScript code that is in string format
//variables for running the code (getting content from input and output textareas)
var newInput = document.getElementById("input").value;
var outputContentArea = document.getElementById("output");
var output;

function runCode() {
  //get input JavaScript code that is in string format
  //variables for running the code (getting content from input and output textareas)
  var newInput = document.getElementById("input").value;
  var outputContentArea = document.getElementById("output");
  var output;
  try {
    //we need to convert the input string into JavaScript and run the code in the output
    output = eval(newInput);

    //display results in output area
    outputContentArea.value = output;
    console.log("eval() button works");
    document
      .getElementById("alertArea")
      .setAttribute("class", "alert alert-success");
    document.getElementById("alertArea").innerHTML = "Code is valid.";
  } catch {
    document
      .getElementById("alertArea")
      .setAttribute("class", "alert alert-danger");
    document.getElementById("alertArea").innerHTML =
      "Please write valid JavaScript code.";
  }
  return newInput, outputContentArea, output;
}

var testVar = "I am in global scope? Can you get to me?";
function runCode2() {
  //this function is just used to generate an anonymous function so that the user can copy paste it somewhere else
  var newInput = document.getElementById("input").value;
  var outputContentArea = document.getElementById("output");
  var output;
  try {
    //we need to convert the input string into JavaScript and run the code in the output
    // output = window.Function('"use strict";return (' + newInput + ")");
    output = new Function('"use strict";' + newInput);

    //display results in output area
    outputContentArea.value = output();

    console.log("window.Function() button works");

    //alert("This is valid JS code");
    document
      .getElementById("alertArea")
      .setAttribute("class", "alert alert-success");
    document.getElementById("alertArea").innerHTML = "Code is valid.";
  } catch {
    //alert("Code is not good. Please write valid JavaScript code");
    document
      .getElementById("alertArea")
      .setAttribute("class", "alert alert-danger");
    document.getElementById("alertArea").innerHTML =
      "Please write valid JavaScript code.";
  }
  return newInput, outputContentArea, output;
}

//Download logic
function downloadInnerHtml(filename, elId, mimeType) {
  //get input JavaScript code that is in string format
  var newInput = document.getElementById("input").value;

  var elHtml = newInput;
  var link = document.createElement("a");
  mimeType = mimeType || "text/plain";

  link.setAttribute("download", filename);
  link.setAttribute(
    "href",
    "data:" + mimeType + ";charset=utf-8," + encodeURIComponent(elHtml)
  );
  link.click();
}
$("#download").click(function() {
  console.log("Download is starting...");
  var filenameGiven = prompt("Filename for JavaScript code: ");
  var fileName = filenameGiven + ".txt"; // You can use the .txt extension if you want
  downloadInnerHtml(fileName, "input", "text/html");
});
