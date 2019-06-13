import firebase from 'firebase';
import 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDP_J8iIYcVZhC6hOiSJmCzWPV1ha40kvo",
  authDomain: "re-vents-21770.firebaseapp.com",
  databaseURL: "https://re-vents-21770.firebaseio.com",
  projectId: "re-vents-21770",
  storageBucket: "re-vents-21770.appspot.com",
  messagingSenderId: "218593666264",
  appId: "1:218593666264:web:961b32cdda14aead"
};

firebase.initializeApp(firebaseConfig);
const fireStoreDB = firebase.firestore();

export {
    firebase,
    fireStoreDB
};