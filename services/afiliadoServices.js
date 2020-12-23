const admin = require('firebase-admin')
const db = admin.firestore()
const firebase = require('firebase')

async function agregar (req, res) {
    console.log(req.body)
    let email = req.body.email
    let password = req.body.password
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            res.redirect('/')
            // Signed in
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
        })
}

async function iniciarSesion (req, res) {
    let email = req.body.email
    let password = req.body.password
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            res.redirect('/')
        })
        .catch((error) => {
            console.log(error.code)
            console.log(error.message)
            // var errorCode = error.code;
            // var errorMessage = error.message;
        })
}

async function cerrarSesion (req, res) {
    firebase.auth().signOut()
        .then(function () {
            console.log('si cerro secion xd')
            res.redirect('/')
            // Sign-out successful.
        })
        .catch(function (error) {
            console.log(error)
            // An error happened.
        })
}

module.exports = {
    signup: agregar,
    login: iniciarSesion,
    logout: cerrarSesion
}