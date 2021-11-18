import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDUHjOyuKzsuk9Xkj6MdFqyENQfXKHxJrA",
    authDomain: "my-dev-united-app.firebaseapp.com",
    projectId: "my-dev-united-app",
    storageBucket: "my-dev-united-app.appspot.com",
    messagingSenderId: "135158303354",
    appId: "1:135158303354:web:cb744a106944a5410209c3"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
// Exporta la funcionalidad de la DB
export const firestore = firebase.firestore()
// exporta el paquete de firebase para poder usarlo
export default firebase
