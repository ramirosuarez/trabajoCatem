var admin = require("firebase-admin");

var serviceAccount = require("../serviceAccount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://trabajocatem.firebaseio.com"
});

const firebase = require('firebase')
var firebaseConfig = {
    apiKey: "AIzaSyAz_wAyhm9jlBnHiPCfrdBdC2SManylpGU",
    authDomain: "catem-bkn.firebaseapp.com",
    projectId: "catem-bkn",
    storageBucket: "catem-bkn.appspot.com",
    messagingSenderId: "769963605820",
    appId: "1:769963605820:web:5fe6e67441f42966722839",
    measurementId: "G-HGHJBNJ7E3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);