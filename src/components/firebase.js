import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: "AIzaSyCKPwAxf7lc2M0gt8aQAdyCJ9N4vaF_Os0",
  // authDomain: "eye-clinic-77ea0.firebaseapp.com",
  // projectId: "eye-clinic-77ea0",
  // storageBucket: "eye-clinic-77ea0.appspot.com",
  // messagingSenderId: "455750057162",
  // appId: "1:455750057162:web:b012561b2b1eab7ec8c833",
  // measurementId: "G-YFYDSVJ8WL"
  apiKey: "AIzaSyB1i2k80PmyVZl6kdRaCsq5gM2BlC8KzYc",
  authDomain: "glassesd-cd48f.firebaseapp.com",
  projectId: "glassesd-cd48f",
  storageBucket: "glassesd-cd48f.appspot.com",
  messagingSenderId: "862054620672",
  appId: "1:862054620672:web:a61cf1f3a3d30e741d02e5",
  measurementId: "G-DFJWK4PHSG"
};


firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();