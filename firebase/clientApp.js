import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCTVkyILxHyyFVplorlJNGChYzB12vdccM",
    authDomain: "fruit-choice.firebaseapp.com",
    projectId: "fruit-choice",
    storageBucket: "fruit-choice.appspot.com",
    messagingSenderId: "964512558231",
    appId: "1:964512558231:web:4ed74c378406967d0f0dd2"
};

if (!firebase.apps.length) {
    firebase.initializeApp(clientCredentials);
}

export default firebase;