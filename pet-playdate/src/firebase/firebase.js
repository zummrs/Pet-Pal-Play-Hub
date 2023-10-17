import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const app = firebase.initializeApp({
    apiKey: "AIzaSyAfGmvePlZ3TY-M3Rli58t_vySElrmgg_4",
    authDomain: "project-54940.firebaseapp.com",
    projectId: "project-54940",
    storageBucket: "project-54940.appspot.com",
    messagingSenderId: "254437816903",
    appId: "1:254437816903:web:a254940c0fc6fd492a0f62"
})

export const auth = app.auth()
export default app