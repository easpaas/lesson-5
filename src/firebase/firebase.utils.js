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
    appId: "1:562325095295:web:eac7ca1ffe5daa329f904a"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const collectionRef = firestore.collection('users');

    const snapShot = await userRef.get();
    const collectionSnapshot = await collectionRef.get();
    console.log({ collection: collectionSnapshot.docs.map(doc => doc.data()) });

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

export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd
    ) => {
    const collectionRef = firestore.collection(collectionKey);

    // batch obj - groups all sets for firestore
    const batch = firestore.batch();

    // call batch set on each element
    objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
    });

    return await batch.commit();
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

// export const convertCollectionsSnapshotToMap = (collections) => {
//   const transformedCollection = collections.docs.map((doc) => {
//     const { title, items } = doc.data();
//     return {
//       routeName: encodeURI(title.toLowerCase()),
//       id: doc.id,
//       title,
//       items,
//     };
//   });

//   return transformedCollection.reduce((accumulator, collection) => {
//     accumulator[collection.title.toLowerCase()] = collection;
//     return accumulator;
//   }, {});
// };
