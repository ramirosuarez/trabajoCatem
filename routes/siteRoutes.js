const express = require('express')
const router = express.Router()
const admin = require('firebase-admin')
const db = admin.firestore()




router.get('/', async function (req, res) {

  const data = []
  const productosRef = await db.collection('Data').get()

  for (const producto of productosRef.docs) {
    data.push(producto.data())
  }

  console.log(data)

  res.render('index', {
    datos:data
  })
})

router.get('/login', function (req, res) {
  res.render('login', {
  })
})

router.get('/signup', function (req, res) {
  res.render('signup', {
  })
})

// router.get('/home',function (req, res) {
//   res.render('home',{
    
//   })
// })

router.get('/home',function (req, res) {
  // console.log(req.query)///se ocupar  cuando en el formulario envia por get
  console.log(req.body)

  res.render('dashCliente',{
    
  })  
})
router.post('/home',function (req, res) {
  // console.log(req.query)
  // console.log(req.body)
  var name = req.body
  if (name == "hola") {
      console.log('me dice que')
  }else{
    console.log('que pasi')
  }
  res.render('dashCliente',{
    
  })  
})

router.get('/home',function (req, res) {
  // console.log(req.query)
  // console.log(req.body)
  var name = req.query;
  if (name == "hola") {
      console.log('me dice que')
  }else{
    console.log('que pasi')
  }
  res.render('dashCliente',{
    
  })  
})


router.get('/socio',function (req ,res) {
 res.render('socio',{
   
 }) 
})

router.get('/updateCliente',function (req,res) {
  res.render('formUptateCliente',{
    name:"Actuliza tus datos"
  })
})

router.get('/updateServicio',function (req,res) {
  res.render('formUptateServicio',{
    name:"Actualiza tus datos"
  })
})

router.get('/notificaciones',function (req,res){
  res.render('notificaciones',{

  })
})

router.get('/frm-cliente', (req ,res) => {
  // var name = req.param('name')
  // console.log(name)
  res.render('frm-cliente',{

  })
})

router.get('/frmPrestador', (req ,res) => {
  res.render('frmPrestador',{

  })
})


router.get('/login' ,(req, res) => {
  res.render('index',{

  })
})

router.get('/homePrestador', (req,res ) => {
  res.render('dashPrestador')
})

router.get('/homeCliente', (req,res)=>{
  res.render('dashCliente',{

  })
})
//////////////////////////////////////////////77
module.exports = router
