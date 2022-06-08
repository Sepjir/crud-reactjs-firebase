import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAEp5JRcdHGdQrg9N14OUoGIl_u0RGKDzI",
    authDomain: "crud-react-sepjir.firebaseapp.com",
    projectId: "crud-react-sepjir",
    storageBucket: "crud-react-sepjir.appspot.com",
    messagingSenderId: "354989474002",
    appId: "1:354989474002:web:95bbb1206eb3c305b8ed0b"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)

  export {firebase}