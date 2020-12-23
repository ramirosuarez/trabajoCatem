const express = require('express')
const router = express.Router()
const admin = require('firebase-admin')
const db = admin.firestore()
const firebase = require('firebase')
const afiliadoServices = require('../services/afiliadoServices')

//Ruta inicio
router.get('/', function (req, res) {
    res.render('index')
})

//Ruta añadir afiliado
router.get('/addAfiliado', function (req, res) {
    res.render('addAfiliado')
})

router.post('/addAfiliado', async function (req, res) {
    console.log(req.body)
    await db.collection('Agremiados').add(req.body)
    res.redirect('/dash')
})

//Ruta editar afiliado
router.get('/editAfiliado', function (req, res) {
    res.render('editAfiliado')
})

router.post('/editAfiliado', function (req, res) {
    res.redirect('/dash')
})

//Ruta dash Afiliado
router.get('/home-afi', function (req, res) {
    console.log(req.query.data)
    res.render('dashAfi', req.query)
})

//Ruta dash tabla
router.get('/dash', async function (req, res) {
    const data = []
    let isLogged = true;
    const agremiadosRef = await db.collection('Agremiados').get()
    for (const agremiado of agremiadosRef.docs) {
        data.push({
            id: agremiado.id,
            data: agremiado.data()
        })
    }
    if (isLogged) {
        res.render('dash1', {
            agremiados: data
        })
    } else {
        res.redirect('/')
    }
})

//Ruta añadir correo
router.get('/sign-up', function (req, res) {
    res.render('signup')
})

router.post('/sign-up', afiliadoServices.signup)

//Ruta iniciar sesion
router.get('/sign-in', function (req, res) {
    res.render('login')
})

router.post('/sign-in', function (req, res) {
    console.log(req.body)
    let email = req.body.email
    let password = req.body.password
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            res.redirect('/')
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
})

//Ruta cerrar sesion
router.get('/logout', afiliadoServices.logout)

//Ruta eliminar
router.post('eliminar', function (req, res) {
    db.collection("Agremiados").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
})

/////////////////////////////////////////////////////////////////////////
//Rutas informacion catem
router.get('/nosotros', function (req, res) {
    res.render('nosotros')
})

router.get('/derechos', function (req, res) {
    res.render('derechos')
})

router.get('/galeria', function (req, res) {
    res.render('galeria')
})

router.get('/directorio', function (req, res) {
    res.render('directorio')
})

router.get('/contacto', function (req, res) {
    res.render('contacto')
})
///////////////////////////////////////////////////////////////////////////////
module.exports = router