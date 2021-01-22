const express = require('express')
const router = express.Router()
const admin = require('firebase-admin')
const db = admin.firestore()
const firebase = require('firebase')
const userServices = require('../services/userServices')
const afiliadosServices = require('../services/afiliadosServices')

//Ruta inicio
router.get('/', function(req, res) {
    res.render('index')
})

//Ruta añadir afiliado
router.get('/addAfiliado', userServices.isAuth, function(req, res) {
    res.render('addAfiliado')
})

router.post('/addAfiliado', afiliadosServices.add)

//Ruta editar afiliado
router.get('/editAfiliado', /*userServices.isAuth,*/ function(req, res) {
    console.log(req.query)
    res.render('editAfiliado', req.query)

})

router.post('/editAfiliado', afiliadosServices.update)

// Ruta dash Afiliado
router.get('/home-afi', afiliadosServices.dash)

//Ruta dash tabla
router.get('/dash', /*userServices.isAuth,*/ afiliadosServices.tabla)

//Ruta añadir correo
router.get('/sign-up', function(req, res) {
    res.render('signup')
})

router.post('/sign-up', userServices.signup)

//Ruta iniciar sesion
router.get('/login', userServices.isAllReadyAuth, function(req, res) {
    res.render('login')
})

router.post('/login', userServices.login)

//Ruta cerrar sesion
router.get('/logout', userServices.logout)

//Ruta eliminar
router.get('/delet', userServices.isAuth, afiliadosServices.delete)

/////////////////////////////////////////////////////////////////////////
//Rutas informacion catem
router.get('/nosotros', function(req, res) {
    res.render('nosotros')
})

router.get('/derechos', function(req, res) {
    res.render('derechos')
})

router.get('/galeria', function(req, res) {
    res.render('galeria')
})

router.get('/directorio', function(req, res) {
    res.render('directorio')
})

router.get('/contacto', function(req, res) {
        res.render('contacto')
    })
    ///////////////////////////////////////////////////////////////////////////////
module.exports = router