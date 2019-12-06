let http = require('http')
const url = require('url')
const fs = require('fs')
const Route = require('route-parser')

function getiD(pathname){
    return pathname[pathname.length-1] 
}

class myExpress{
    constructor(){

        this.routes={}
        this.app = this.init()
       // this.listen(8080)
    }
    init(){
        const server = http.createServer((req, res) => {
            let {pathname} = url.parse(req.url,true)

            if(req.method =="PUT" && /^\/students\/\d+$/.test(pathname) ){
                req.id = getiD(pathname.split("/"))
                this.routes[pathname+'-'+req.method](req,res)
            }
            else if (req.method =="DELETE" && /^\/students\/\d?$/.test(pathname)  ){
                req.id = getiD(pathname.split("/"))
                if (req.id){
                    pathname = pathname.slice(0,-1) 
                }
                this.routes[pathname+'-'+req.method](req,res)   
            }
            else if(this.routes[pathname+'-'+req.method]){
                this.routes[pathname+'-'+req.method](req,res)
            }
            else{
                res.write("ERROR PAGE NOT FOUND")
            }
            res.end()            
          })
          return server
    }
    send(message){
        res.write(message)
    }
    get(path,cb){
        this.routes[path+'-'+'GET']=cb
    }
    post(path,cb){
        this.routes[path+'-'+'POST']=cb
    }
    put(path,cb){
         this.routes[path+"-"+"PUT"]=cb
    } 
    delete(path, cb){
        this.routes[path+"-"+"DELETE"]=cb
    }
    all(){

    }
    listen(port){
        this.app.listen(port)
    }
    render(){
    }
}
function express(){
    return new myExpress()
}
module.exports = express