// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAfGmvePlZ3TY-M3Rli58t_vySElrmgg_4",
//   authDomain: "project-54940.firebaseapp.com",
//   projectId: "project-54940",
//   storageBucket: "project-54940.appspot.com",
//   messagingSenderId: "254437816903",
//   appId: "1:254437816903:web:a254940c0fc6fd492a0f62"
// };
const app = firebase.initializeApp({
    apiKey: "AIzaSyAfGmvePlZ3TY-M3Rli58t_vySElrmgg_4",
    authDomain: "project-54940.firebaseapp.com",
    projectId: "project-54940",
    storageBucket: "project-54940.appspot.com",
    messagingSenderId: "254437816903",
    appId: "1:254437816903:web:a254940c0fc6fd492a0f62"
})

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firebase Authentication and get a reference to the service
// const auth = getAuth(app);

// export {auth};
export const auth = app.auth()
export default app