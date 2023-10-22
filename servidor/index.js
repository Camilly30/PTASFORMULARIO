// JWT
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
var { expressjwt: expressJWT } = require("express-jwt");
const cors = require('cors');

var cookieParser = require('cookie-parser')

const express = require('express');
const { usuario } = require('./models');
const crypto = require('./crypto'); 
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
  }).unless({ path: ["/autenticar", "/logar", "/deslogar","/cadastrar","/listar"] })
);

app.get('/autenticar', async function(req, res){
  res.render('autenticar');
})


app.get('/', async function(req, res){
  res.render('home')
})

app.post('/logar', (req, res) => {
  if (req.body.name == "mimy" && req.body.senha == "123"){
    let id ="1";

    const token = jwt.sign({id }, process.env.SECRET,{ 
      expiresIn:3003
    })
    res.cookie('token',token, {httpOnly:true});
     return res.json({
      name: req.body.name,
      senha : req.body.senha,
      token: token
     })
  }
 res.status(500).json({mensagem :"Deu ruim aí brow"})
})

app.get('/cadastrar', function(req, res) {
  res.render('cadastrar');
})

app.post("/cadastrar", async function (req,res){
  if (req.body.senha == req.body.senhaConfirm) {
    console.log(req.body);
    
    let criatura = req.body
    criatura.senha= crypto.encrypt(req.body.senha)

    await usuario.create(criatura);
    res.redirect('listar')
  } else {
    res.status(500).json({message:"Deu ruim aí em cadastrar.. Tente novamente"})
  }
 })
 
app.get('/listar', async function(req, res){
  try {
    var usuarios = await usuario.findAll();
    res.render('listar', { usuarios });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ocorreu um erro ao buscar os usuário.' });
  }
})


app.post('/deslogar', function(req, res) { //quando é para deslogar deleta o TOKEN
  res.cookie('logar', null, {httpOnly:true});
   res.json({
   deslogado:true
   })
})


app.listen(3000, function() {
  console.log('App funcionando locamente na porta 3000!')
});