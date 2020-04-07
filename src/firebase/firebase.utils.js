import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAykokM2VtvCvF7K3O_qkhtEElBW6P7ISY",
    authDomain: "crown-db-5b55f.firebaseapp.com",
    databaseURL: "https://crown-db-5b55f.firebaseio.com",
    projectId: "crown-db-5b55f",
    storageBucket: "crown-db-5b55f.appspot.com",
    messagingSenderId: "477135925494",
    appId: "1:477135925494:web:7bfbc465ceee2d8333bcd7",
    measurementId: "G-0K2X4SRW8B"
  };


firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

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
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
