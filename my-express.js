let http = require('http')
const url = require('url')
const fs = require('fs')

class myExpress{
    constructor(){

        this.routes={}
        this.app = this.init()
        this.listen(8080)


    }
    init(){
        const server = http.createServer((req, res) => {
            const {pathname} = url.parse(req.url,true)
            if(this.routes[pathname+'-'+req.method]){
                this.routes[pathname+'-'+req.method](req,res)
            }
            else{
                res.write("ERROR PAGE NOT FOUND")
            }
            res.end()            
          })
          return server
    }
    get(path,cb){
    //console.log('path =>',path)
    this.routes[path+'-'+'GET']=cb
    //console.log(this.routes)
    }
    /*post(path,cb){
        this.app.on('request', (req,res) =>{
            cb(req,res)
        } )
    }*/
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