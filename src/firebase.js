import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDUHjOyuKzsuk9Xkj6MdFqyENQfXKHxJrA",
    authDomain: "my-dev-united-app.firebaseapp.com",
    projectId: "my-dev-united-app",
    storageBucket: "my-dev-united-app.appspot.com",
    messagingSenderId: "135158303354",
    appId: "1:135158303354:web:cb744a106944a5410209c3"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Exporta la funcionalidad de la DB
export const firestore = firebase.firestore();

//login social con FIREBASE:

// -- el modulo de la autenticacion --
export const auth = firebase.auth();

// -- el provedor de la autenticacion --
export const provider = new firebase.auth.GoogleAuthProvider();

// -- la utilidad de hacer login con el popup --
export const loginWithGoogle = () => auth.signInWithPopup(provider);

// -- la utilidad para hacer logout --
export const logout = () => auth.signOut();


// exporta el paquete de firebase para poder usarlo
export default firebase;