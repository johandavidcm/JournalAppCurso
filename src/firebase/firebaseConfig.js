import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/firebase-auth';

const firebaseConfig = {
    apiKey: "AIzaSyBfVOjXLUJeY9SNha2vGo2xQU6i5mM1ss4",
    authDomain: "react-app-curso-fa7e3.firebaseapp.com",
    projectId: "react-app-curso-fa7e3",
    storageBucket: "react-app-curso-fa7e3.appspot.com",
    messagingSenderId: "209657992831",
    appId: "1:209657992831:web:6974dde4312c3ad663914a"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}