// import firebase from "../../app/config/firebase";
// //reference message collection
// var messagesRef = firebase.database().ref("contact_form");

// //listen for form submit
// document.getElementById("contactForm").addEventListener("submit", submitForm);
// //submit form
// function submitForm(e) {
//   e.preventDefault();
//   //get values
//   var name = getInputVal("name");
//   var email = getInputVal("email");
//   var message = getInputVal("message");
//   //save message
//   saveMessage(name, email, message);
// }
// //function to get form values
// function getInputVal(id) {
//   return document.getElementById(id).value;
// }
// //save message to firebase
// function saveMessage(name, email, message) {
//   var newMessageRef = messagesRef.push();
//   newMessageRef.set({
//     name: name,
//     email: email,
//     message: message
//   });
// }
