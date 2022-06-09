import { response, Router } from "express";
import fetch from "node-fetch"
import axios from 'axios';
const router = Router();
var Datos = [];
var Usuarios = [];

// Enlazar páginas para navegar
router.get("/", function (req, res) {
  res.render("Index.ejs")
})
router.get("/Catalogo", function (req, res) {
  res.render("Catalogo.ejs")
})

router.get("/CajaComentario", function (req, res) {
  res.render("Comentarios.ejs")
})

router.get("/MandarInfo", function (req, res) {
  res.render("MandarIinfo.ejs")
})

router.get("/Prueba", function (req, res) {
  res.render("Prueba.ejs")
})

router.get("/Mostrar", function (req, res) {
  res.render("Mostrar.ejs")
})

router.get("/Catalogo/Glosario", function (req, res) {
  res.render("Glosario_A.ejs")
})

router.get("/Catalogo/Java", function (req, res) {
  res.render("Pestaña_Programacion.ejs")
})

router.get("/", function (req, res) {
  res.render('Mostrar.ejs')
})

router.get("/Ejemplo", function (req, res) {
  res.render("Ejemplo.ejs", { Datos })
})

router.get("/Ejemplo2", function (req, res) {
  res.render("Ejemplo2.ejs", { Usuarios })
})



/*  -----------------------------------------Rutas a la Api Rest----------------------------------------- */

const OptionsGET = {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  }
};

//Conexión a Api Rest
router.get("/ProbarConexion", function (req, res) {
  var url = 'http://localhost:2000';

  try {
    fetch(url, OptionsGET)
      .then(response => console.log("Success: ", response.json))
      .then(data => {
        const json = JSON.parse(data);
        console.log(json);
      })
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
})

//Ver todos los usuarios registrados
router.post("/Ejemplo2", function (req, res) {
  var url = 'http://localhost:2000/Servidor/MostrarUsuarios/';
  try {
    axios.post(url)
      .then(function (res) {
        console.log("Data: ", res.data);
        Usuarios.push(res.data)
      })
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
  res.render("Ejemplo2", { Usuarios })
})


//Encontrar un usuarios en especifico
router.post("/Ejemplo", function (req, res) {
  var { Id } = req.body
  var url = 'http://localhost:2000/Servidor/EncontrarUsuario/' + Id;
  try {
    axios.post(url)
      .then(function (res) {
        console.log("Data: ", res.headers);
        Datos.push(res.data)
      })
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
  res.render("Ejemplo", { Datos })
  Datos = [];
})

//VerInformación
router.get("/Catalogo/Glosario", function (req, res) {
  const { Palabra } = req.params
  var url = 'http://localhost:2000/Servidor/ObtenerInfo/' + Palabra;

  try {
    fetch(url, OptionsGET)
      .then(res => res.json())
      .catch(error => res.send(error, "Fallo de Conexión"))
      .then(response => console.log("Success: ", response))
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
  const Info = res.json();
})


//Registrar Usuarios
router.post("/RegistrarUsuario", function (req, res) {
  const { Nombre, Apellido, Correo, Contraseña } = req.body
  var url = 'http://localhost:2000/Servidor/RegistrarUsuarios';
  var data = { Nombre, Apellido, Correo, Contraseña };

  var options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    fetch(url, options)
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
  } catch (error) {
    res.status(500);
    res.message(error.message);
  }
})

router.post("/MandarInfo", function (req, res) {
  const { letra, palabra, significado, imagen } = req.body
  var url = 'http://localhost:2000/Servidor/AltaInfo';
  var data = { letra, palabra, significado, imagen };

  var options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    fetch(url, options)
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
  } catch (error) {
    res.status(500);
    res.message(error.message);
  }

  res.render("MandarIinfo")
})



export default router;
