// Import the functions you need from the SDKs you need
const { initializeApp, getApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getFirestore } = require("firebase/firestore");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4y3OrtBukIni1AazgaemFMaFh9-AkjQA",
  authDomain: "login-prot.firebaseapp.com",
  projectId: "login-prot",
  storageBucket: "login-prot.appspot.com",
  messagingSenderId: "322825583522",
  appId: "1:322825583522:web:b30d608d50be67c46c10fb",
};

// Initialize Firebase
function createFirebaseApp(config) {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}

// const firebaseApp = initializeApp(firebaseConfig);
const firebaseApp = createFirebaseApp(firebaseConfig);

// Firestore exports
const firestore = getFirestore(firebaseApp);

// Auth
const auth = getAuth(firebaseApp);

// export
module.exports = { firestore, auth };
