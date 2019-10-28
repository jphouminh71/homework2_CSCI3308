"use strict";
let x = 3.14;
console.log(x);
x = x + 10;
console.log(x);

function display2_1() {
  var myanswer  = "outputs:\n 1) undefined\n 2) true\n 3) false\n The result of the second statement evalautes to true because in JavaScript null and undefined have the same value, but its false in the third statement because they are not of the same data type."  // TODO 2.1: Fill in Answer here after the :
  document.getElementById("21answer").innerHTML = myanswer; // Do not change
}
function display2_2() {
  var myanswer  = "The code would throw an error because using the strict string makes for safe programming. In this case it would throw an error because x was not a declared variable. If you take out the strict string, then JavaScript will not throw any errors but just create x as a new global variable." // TODO 2.2: Fill in Answer here
  document.getElementById("22answer").innerHTML = myanswer; // Do not change
}

function display2_5() {
  var myanswer  = "We are able to see how the children because we are explicitly asking to view all children of one parent. We are not able to see it in the HTML page because the children have attribute 'display' set to none" // TODO 2.5: Fill in Answer here
  document.getElementById("25answer").innerHTML = myanswer; // Do not change
}

function countDiv() { // Do not add or remove lines to this function
    var divs = document.getElementsByTagName("div"); // TODO: Question 2.3: Use the document Object to get the number of divs in the HTML page. Replace dummyMethod with the correct one.
    alert("Number of divs in this page is: " + divs.length); // Do not change
}

function makeOrange() { // Do not add or remove lines to this function
    var narutos = document.getElementsByName("naruto"); // TODO: Question 2.4: Use the document Object to get all tags named "naruto" in the HTML page. Replace dummyMethod with the correct one.
    for(var i=0; i< narutos.length; i++) { // Do not change
        narutos[i].style.color = 'orange'; // Do not change
    }
}

function getChildrenTags() { // Do not add or remove lines to this function
  var children = document.getElementById("div_1134").children; // TODO: Question 2.5 Use the appropriate function to get all the children of a div named 'div_1134'
  var tagNames = ""; // Do not change
  for (var i = 0; i < children.length; i++) {// Do not change
    console.log(children[i].tagName);// Do not change
    tagNames += children[i].tagName +", " ;// Do not change
  }// Do not change
  alert(children.length); // Do not change
  alert("The tags that I found are: " + tagNames);// Do not change
}
