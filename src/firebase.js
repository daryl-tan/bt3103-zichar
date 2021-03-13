import firebase from "firebase";
const firebaseConfig = {
	apiKey: "AIzaSyD2hS9nyMncHvs2Ak1TrYyCz6CJb0XsIFM",
	authDomain: "bt3103-zichar-ab201.firebaseapp.com",
	projectId: "bt3103-zichar-ab201",
	storageBucket: "bt3103-zichar-ab201.appspot.com",
	messagingSenderId: "22239220444",
	appId: "1:22239220444:web:8529764992534644255a19",
};
firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;
