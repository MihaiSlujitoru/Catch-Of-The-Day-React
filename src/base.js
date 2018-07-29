import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
	apiKey: "",
	authDomain: "",
	databaseURL: ""
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// This is a default export

export default base;
