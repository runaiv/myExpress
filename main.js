// creer un fichier a la racine my-express.js
// et tu mets dedans 
const express = require('./my-express')
const app =  express()
const url = require('url')
const fs = require('fs')
const Route = require('route-parser')
const LOCAL_DB= 'students.json'

app.get('/', function (req, res) {

  const {query} = url.parse(req.url,true)
  const {name} = query
  res.send(`<h1>Hello ${name || 'World' }</h1>`)
  })

app.get('/hello', function (req, res) {
      
    res.write('hello')

  })

  app.post('/students', function (req, res) {
    data =""
    req.on('data', chunk => {
        data +=chunk.toString()
    })
    req.on("end", ()=>{
        if (data){
          console.log("data =>",data)
          user=JSON.parse(data) // transform to  6
          if(fs.existsSync(LOCAL_DB)){
              const json = require(`./${LOCAL_DB}`)
              // gere le cas ou on supprime un user entre 2 id afin deviter doublons
              const max_id = Math.max.apply(Math, json.map(obj => obj.id))                
              user.id = max_id +1 
              json.push(user)
              data = json
          }
          else{
          user.id = 1 
          data = [user]
        }
        fs.writeFileSync(LOCAL_DB,JSON.stringify(data,null,' '))
        }     
    })
  })

  app.put('/students/:id', function (req, res) {
    if(fs.existsSync(LOCAL_DB)){
      const json = require(`./${LOCAL_DB}`) 
      const newJson = []
      let data = ''
      req.on('data', chunk => {
          data +=chunk.toString()
      })
      req.on("end", ()=>{
          if(data){
            properties = JSON.parse(data)
            for (user of json ) {
              if(user.id==req.id){
                Object.keys(properties).forEach(key => {
                  value = properties[key]
                  user[key]=value
                })  
              }
              newJson.push(user)
            } 
            fs.writeFileSync(LOCAL_DB,JSON.stringify(newJson,null,' '))
          }
         
      })
    }

  })

  app.delete('/students/',function (req, res){
    if(fs.existsSync(LOCAL_DB)){

      const json = require(`./${LOCAL_DB}`) 
      let newJson=[]
      console.log('req ',req.id)
      if (!req.id){
        fs.writeFileSync(LOCAL_DB,JSON.stringify([],null,' '))
      }
      else{
        for(user of json)
          if(user.id != req.id){
            newJson.push(user)
          }
        fs.writeFileSync(LOCAL_DB,JSON.stringify(newJson,null,' '))
      }
    }
  })

  app.all()

  app.listen(8080)

