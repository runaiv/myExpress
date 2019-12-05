// creer un fichier a la racine my-express.js
// et tu mets dedans 
const express = require('./my-express')
const app =  express()
const url = require('url')

app.get('/', function (req, res) {
  const {query} = url.parse(req.url,true)
  const {name} = query
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.write(`<h1>Hello ${name || 'World' }</h1>`)
  })

app.get('/hello', function (req, res) {
      
    res.write('hello')

  })

