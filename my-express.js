let http = require('http')
const url = require('url')
const fs = require('fs')

class myExpress{
    constructor(){
        this.app = this.init()
        this.listen(8080)
    }
    init(){
        const server = http.createServer(function (req, res) {
          })
          return server
    }
    get(path,cb){
        this.app.on('request', (req,res) =>{
            const {pathname, query} = url.parse(req.url,true)
            console.log(pathname,path);
            
            if (pathname === path){
                cb(req,res)
                res.end()
            }
    
        } )
    }
    post(path,cb){
        this.app.on('request', (req,res) =>{
            cb(req,res)
        } )
    }
    put(){
    } 
    delete(){
    }
    all(){
    }
    listen(port){
        this.app.listen(8080)
    }
    render(){
    }
}
function express(){
    return new myExpress()
}
module.exports = express