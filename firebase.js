import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyBR0GFDGkzIfEiKYyDn27i9noBjd1qARbY",
  authDomain: "test2-136b7.firebaseapp.com",
  projectId: "test2-136b7",
  storageBucket: "test2-136b7.appspot.com",
  messagingSenderId: "284468969323",
  appId: "1:284468969323:android:4c09bce8dde7c92c5a162e",
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const messaging = firebase.messaging();

export { firebase, messaging };