// const admin = require('firebase-admin')
// const db = admin.firestore()
// const firebase = require('firebase')

var firebase = require('firebase/app')
require('firebase/auth')

//Funcion agregar correo
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

//Funcion iniciar sesion
async function iniciarSesion (req, res) {
    console.log(req.body)
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

async function isAllReadyAuth (req, res, next) {
    const user = firebase.auth().currentUser
    if (user != null) {
      req.user = user
      res.redirect('/dash')
    } else {
      next()
    }
}

//Funcion cerra sesion
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
    isAllReadyAuth: isAllReadyAuth,
    logout: cerrarSesion
}