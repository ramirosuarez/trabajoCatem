const admin = require('firebase-admin')
const db = admin.firestore()
const firebase = require('firebase');
const router = require('../routes/siteRoutes');


//Funcion dash afiliados totales
async function afiliados (req, res) {
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
        res.render('dash', {
            agremiados: data
        })
    } else {
        res.redirect('/')
    }
}

//Funcion agregar afiliados
async function agregar (req, res) {
    console.log(req.body)
    await db.collection('Agremiados').add(req.body)
    res.redirect('/dash')
}

//Funcion eliminar afiliados
async function eliminar (req, res) {
    console.log(req.query.id)
    const id = req.query.id
    db.collection("Agremiados").doc(id).delete().then(function() {
        console.log("Joder tio, se ha eliminado correctamente");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    res.redirect('/dash')
}

//Funcion dash afiliado individual
function dashAfi (req, res) {
    console.log(req.query.data)
    res.render('dashAfi', req.query)
}


module.exports = {
    tabla: afiliados,
    add: agregar,
    delete: eliminar,
    dash: dashAfi,
}