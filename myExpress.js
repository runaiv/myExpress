class myExpress{
    constructor(){
    }
    get(){
        console.log('test')
    }
    post(){
    }
    put(){
    }
    delete(){
    }
    all(){
    }
    listen(){
    }
    render(){
    }
}
function express(){
    return new myExpress()
}
module.exports = express
// creer un fichier a la racine my-express.js
// et tu mets dedans 
const express = require('./my-express')
const app =  express()
app.get()