import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyDd_puMLmij0RPoBbJNjZJlQ7GPVXa1BUk",
    authDomain: "e-commerce-project-8cdbc.firebaseapp.com",
    databaseURL: "https://e-commerce-project-8cdbc.firebaseio.com",
    projectId: "e-commerce-project-8cdbc",
    storageBucket: "e-commerce-project-8cdbc.appspot.com",
    messagingSenderId: "562325095295",
    appId: "1:562325095295:web:eac7ca1ffe5daa329f904a",
    measurementId: "G-PXB9098L77"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;