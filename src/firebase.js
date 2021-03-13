import firebase from "firebase";
var firebaseConfig = {
	apiKey: "AIzaSyAwVI09y0zr7AX3OicCfBdOTGE5AIn1qMc",
	authDomain: "bt3103-week-6-58276.firebaseapp.com",
	projectId: "bt3103-week-6-58276",
	storageBucket: "bt3103-week-6-58276.appspot.com",
	messagingSenderId: "702378927289",
	appId: "1:702378927289:web:16b7dab7f54ee59a952768",
};
firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;
