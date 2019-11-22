// creer un fichier a la racine my-express.js
// et tu mets dedans 
const express = require('./my-express')
const app =  express()

app.get('/', function (req, res) {
    res.write('hello world')
  })

  app.get('/hello', function (req, res) {
      
    res.write('hello')

  })

