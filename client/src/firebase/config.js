import firebase from "firebase/app"
import 'firebase/storage'
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyDzkOOHCj1mJ_nUQYRtD_o5n6M4n1v3R24",
    authDomain: "connectify-3112-411fb.firebaseapp.com",
    projectId: "connectify-3112-411fb",
    storageBucket: "connectify-3112-411fb.appspot.com",
    messagingSenderId: "873020184994",
    appId: "1:873020184994:web:50d92c426980197464fafb",
    measurementId: "G-Z4E8L5HCY9"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const firestore = firebase.firestore();

export { storage, firestore }

export default firebase;