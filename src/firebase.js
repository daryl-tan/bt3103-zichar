import firebase from "firebase";
var firebaseConfig = {
	apiKey: "AIzaSyCV3iBPerBC-sjhWiuFoVdD7SPxZ7pc1nY",
	authDomain: "bt3103-zichar.firebaseapp.com",
	projectId: "bt3103-zichar",
	storageBucket: "bt3103-zichar.appspot.com",
	messagingSenderId: "324107074590",
	appId: "1:324107074590:web:446e5b5f0fff5b0c23020f",
};
firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;
