// JWT
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
var { expressjwt: expressJWT } = require("express-jwt");
const cors = require('cors');

var cookieParser = require('cookie-parser')

const express = require('express');
const { usuario } = require('./models');

const app = express();

app.set('view engine', 'ejs');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

app.use(cookieParser());//
app.use(
  expressJWT({
    secret: process.env.SECRET,
    algorithms: ["HS256"],//usa pra fazer criptografia
    getToken: req => req.cookies.token
  }).unless({ path: ["/autenticar", "/logar", "/deslogar","/usuario/cadastrar","/usuarios/listar"] })
);

app.get('/autenticar', async function(req, res){
  res.render('autenticar');
})


app.get('/', async function(req, res){
  res.render('home')
})

app.post('/logar', (req, res) => {
  if (req.body.usuario == "Ahsoka" && req.body.senha == "123456"){
    let id ="1";

    const token = jwt.sign({id }, process.env.SECRET,{ 
      expiresIn:3003
    })
    res.cookie('token',token, {httpOnly:true});
     return res.json({
      usuario: req.body.usuario,
      senha : req.body.senha,
      token: token
     })
  }
 res.status(500).json({mensagem :"Deu ruim aí brow"})
})

app.get('/usuario/cadastrar', function(req, res) {
  res.render('usuario/cadastrar');
})

app.post("/usuario/cadastrar", async function (req,res){
  if (req.body.senha == req.body.senhaConfirm) {
    console.log(req.body);
    
    await usuario.create(req.body)
    res.redirect("/usuarios/listar")

    const encrypted_key = crypto.encrypt(req.body.senha);
    console.log(encrypted_key)
    
    const decrypted_key = crypto.decrypt(encrypted_key);
    console.log(decrypted_key)
  } else {
    res.status(500).json({message:"Deu ruim aí em cadastrar.. Tente novamente"})
  }
 })

app.get('/usuarios/listar', async function(req, res){
  try {
    var usuarios = await usuario.findAll();
    res.render('index', { usuarios });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ocorreu um erro ao buscar os usuário.' });
  }
})

app.post('/deslogar', function(req, res) { //quando é para deslogar deleta o TOKEN
  res.cookie('token', null, {httpOnly:true});
   res.json({
   deslogado:true
   })
})

app.listen(3000, function() {
  console.log('App funcionando locamente na porta 3000!')
});