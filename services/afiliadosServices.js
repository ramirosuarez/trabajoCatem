const admin = require('firebase-admin')
const db = admin.firestore()
const firebase = require('firebase');
const router = require('../routes/siteRoutes');


//Funcion dash afiliados totales
async function afiliados(req, res) {
    const data = []
    let isLogged = true;
    const agremiadosRef = await db.collection('Agremiados').get()
    for (const agremiado of agremiadosRef.docs) {
        data.push({
            id: agremiado.id,
            data: agremiado.data()
        })
    }
    // console.log(data)
    if (isLogged) {
        res.render('dash', {
            agremiados: data
        })
    } else {
        res.redirect('/')
    }
}

//Funcion agregar afiliados
async function agregar(req, res) {
    console.log(req.body)
    await db.collection('Agremiados').add(req.body)
    res.redirect('/dash')
}

//Funcion eliminar afiliados
async function eliminar(req, res) {
    console.log(req.query.id)
    const id = req.query.id
    db.collection("Agremiados").doc(id).delete().then(function() {
        console.log("Joder tio, se ha eliminado correctamente")
        res.redirect('/dash')
    }).catch(function(error) {
        console.error("Error removing document: ", error)
        res.redirect('/dash')
    });

}

//Funcion actualizar datos
async function actualizar(req, res) {
    const id = req.query.id
    let AgremiadoRef = db.collection("Agremiados").doc(id)
    AgremiadoRef.update(data)
}

//Funcion para obtener elemento por Id
async function getById(req, res) {
    console.log(req.query.id)
    const id = req.query.id
    const data = {}
    let agremiado = await db.collection('Agremiados').doc(id).get()
    data = {
        id: agremiado.id,
        data: agremiado.data()
    }
    console.log('data', data)
}

// //Funcion para optener datos por id
// async function getById(req,res){

//     console.log(req.query.id)
//      console.log(req.query.op)

//     const id = req.query.id
//     const op = req.query.op
//     let data={}
//     let afiliado = await db.collection('Afiliados').doc(id).get()
//     data = {
//       id:afiliado.id,
//       data: afiliado.data()
//      }
//       if(op == 1){
//         console.log('data',data)
//         res.render('edit',{
//           afiliado:data
//         })
//       }
//       if(op == 2){
//         console.log('data',data)
//         res.render('view',{
//           afiliado:data
//         })
//       }
//   }

//Funcion dash afiliado individual
function dashAfi(req, res) {
    console.log(req.query.data)
    res.render('dashAfi', req.query)
}

//Funcion para actualizar datos prueba 1
function update(req, res) {
    console.log(req.query.data)
    res.render('editAfiliado', req.query)
}


module.exports = {
    tabla: afiliados,
    add: agregar,
    delete: eliminar,
    dash: dashAfi,
    getById: getById,
    update: update,
}