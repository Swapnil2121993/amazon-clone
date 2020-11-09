// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase"

const firebaseConfig = {
	apiKey: "AIzaSyCzO8J6WiCEj4XkaGTOWTD_ctXmmGVHgBQ",
	authDomain: "clone-3e341.firebaseapp.com",
	databaseURL: "https://clone-3e341.firebaseio.com",
	projectId: "clone-3e341",
	storageBucket: "clone-3e341.appspot.com",
	messagingSenderId: "254903577454",
	appId: "1:254903577454:web:386a6b74de54a0318def7f",
	measurementId: "G-K3XD9TMZXR"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()

export { db, auth }
