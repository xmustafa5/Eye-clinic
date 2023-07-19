  import firebase from 'firebase/compat/app';
  import 'firebase/compat/firestore';
  import 'firebase/compat/storage';
  import 'firebase/compat/auth';


  const firebaseConfig = {

    apiKey: "AIzaSyB1i2k80PmyVZl6kdRaCsq5gM2BlC8KzYc",
    authDomain: "glassesd-cd48f.firebaseapp.com",
    projectId: "glassesd-cd48f",
    storageBucket: "glassesd-cd48f.appspot.com",
    messagingSenderId: "862054620672",
    appId: "1:862054620672:web:a61cf1f3a3d30e741d02e5",
    measurementId: "G-DFJWK4PHSG"
  };



  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
export const db = firebase.firestore();

// Initialize Storage
export const storage = firebase.storage();
export const auth = firebase.auth();

// You can also export other Firebase services if needed

export default firebase;