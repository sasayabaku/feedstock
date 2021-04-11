import firebase from 'firebase/app'
import "firebase/database"

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export default firebase