const admin = require('firebase-admin')
const db = admin.firestore()
const firebase = require('firebase')

async function agregar (email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            // Signed in
            // ...
        })
        .catch((error) => {
            console.log(error.code)
            console.log(error.message)
        });
}