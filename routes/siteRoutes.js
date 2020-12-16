const express = require('express')
const router = express.Router()
const admin = require('firebase-admin')
const db = admin.firestore()
const firebase = require('firebase')



router.get('/', async function(req, res) {

    res.render('index', {
        isLogged: false
    })
})

router.post('/home-afi', async function(req, res) {
    console.log(req.body)
    await db.collection('Agremiados').add(req.body)
    res.redirect('/dash')
})


router.get('/sign-in', function(req, res) {
    res.render('login', {

    })
})

router.post('/sign-in', function(req, res) {
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

router.get('/sign-up', function(req, res) {

    res.render('signup', {

    })
})

router.post('/sign-up', function(req, res) {
    console.log(req.body)

    let email = req.body.email
    let password = req.body.password

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            // Signed in
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
        });

    res.redirect('/')
})

router.get('/dash', async function(req, res) {
    const data = []
    const agremiadosRef = await db.collection('Agremiados').get()
    for (const agremiado of agremiadosRef.docs) {
        data.push({id: agremiado.id, data: agremiado.data()})
    }
    res.render('dash1', {
        agremiados: data
    })
})

router.get('/home-afi', function(req, res) {
    console.log(req.query.data)
    res.render('dashAfi', req.query)
})


// router.get('/socio', function(req, res) {
//     res.render('socio', {

//     })
// })

router.get('/upd-agr', function(req, res) {
    res.render('formUptateCliente', {
        name: "Actuliza tus datos"
    })
})

router.get('/upd-afi', function(req, res) {
    res.render('formUpdateAfi', {
    })
})

router.get('/notificaciones', function(req, res) {
    res.render('notificaciones', {

    })
})

router.get('/frm-agr', (req, res) => {
    res.render('frm-cliente', {

    })
})

router.get('/add-afi', (req, res) => {
    res.render('frmAfi', {

    })
})

router.get('/logout', function (req, res) {
    firebase.auth().signOut().then(function() {
        console.log('si cerro secion xd')
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });

    res.redirect('/')
})


router.get('/notify', function(req, res) {
    res.render('notify', {

    })
})

// router.get('/home-agr', (req, res) => {
//     res.render('dashPrestador')
// })

//Aqui van las rutas de informacion xd

router.get('/nosotros', function(req, res) {
    res.render('nosotros', {

    })
})

router.get('/derechos', function(req, res) {
    res.render('derechos', {

    })
})

router.get('/galeria', function(req, res){
    res.render('galeria', {

    })
})

router.get('/directorio', function(req, res){
    res.render('directorio', {

    })
})

router.get('/contacto', function(req, res){
    res.render('contacto', {
        
    })
})
//////////////////////////////////////////////77
module.exports = router