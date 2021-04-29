import { firebase } from '@firebase/app';
require('firebase/auth')

import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyDXTJMAoN4tYV8456hnG611t1cgjndKuSw",
    authDomain: "celiquiz.firebaseapp.com",
    projectId: "celiquiz",
    storageBucket: "celiquiz.appspot.com",
    messagingSenderId: "226340250977",
    appId: "1:226340250977:web:8f0e3100f4c047517f9120",
    measurementId: "G-BP8NPDEYSG"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;