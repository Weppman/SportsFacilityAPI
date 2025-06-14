
require('dotenv').config();
const { initializeApp } = require("firebase/app");
const { getFirestore} = require("firebase/firestore");


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = {db};