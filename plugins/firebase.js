import firebase from 'firebase/app'
import "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyCMN5BJLT4tZmt24_j7dD82vdaekIkeZeY",
    authDomain: "trial-8d443.firebaseapp.com",
    projectId: "trial-8d443",
    storageBucket: "trial-8d443.appspot.com",
    messagingSenderId: "532498052470",
    appId: "1:532498052470:web:653e351262e357f950b657"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

// const db = firebase.firestore()
// const settings = { timestampsInSnapshots: true }
// db.settings(settings)
export default firebase