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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) {
        console.log("user not authorized")
    };

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth; 
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName, 
                email, 
                createdAt, 
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    } 
    return userRef;
}


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;