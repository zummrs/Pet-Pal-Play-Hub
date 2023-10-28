// auth
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
// db 
import { getFirestore, collection }  from 'firebase/firestore'
// image storage
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export const app = firebase.initializeApp({
    apiKey: "AIzaSyAfGmvePlZ3TY-M3Rli58t_vySElrmgg_4",
    authDomain: "project-54940.firebaseapp.com",
    projectId: "project-54940",
    storageBucket: "project-54940.appspot.com",
    messagingSenderId: "254437816903",
    appId: "1:254437816903:web:a254940c0fc6fd492a0f62"
})

// auth 
export const auth = app.auth()

// db 
export const db = getFirestore(app);
export const playdatesCollectionRef = collection(db, 'playdates'); // ref to playdates collection in firestore

// image storage
// create a ref to the storage
export const storage = getStorage();

export default app
