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
            res.setHeader('Content-Type','text/html') 
            pathname= /\w/.test(pathname) ? pathname.replace(/\/$/,"") : pathname // enleve le dernier / sauf pour la page d'accueil /
                if(req.method =="PUT" && /^\/students\/\d+$/.test(pathname) ){
                    req.id = getiD(pathname.split("/"))
                    this.routes[pathname.replace(req.id,":id")+'-'+req.method](req,res)
                }
                else if (req.method =="DELETE" && /^\/students\/\d?$/.test(pathname) || req.method =="DELETE" && /^\/students$/.test(pathname) ){ 
                    if(pathname.endsWith('students')){
                        pathname = pathname.replace('students','students/:id') 
                    }
                    else{
                        req.id = getiD(pathname.split("/"))
                        pathname = pathname.replace(req.id,':id')
                    } 
                    this.routes[pathname+'-'+req.method](req,res)   
                }
            
                
                else if(/^\/students\/all\/\d?$/.test(pathname) ||/^\/students\/all$/.test(pathname) ){
                    //console.log(pathname);
                    if(!pathname.endsWith('students/all')){
                        req.id = getiD(pathname.split("/"))
                        pathname = pathname.replace('/'+req.id,'')

                    }
                    res.routes = []
                    // on va recuperer tte les callbacks
                    Object.entries(this.routes).forEach(elt => {
                        if (!/-ALL/.test(elt[0]))
                            res.routes.push(elt) 
                    })
                
                    this.routes[pathname+'-ALL'](req,res)
                }
                //GET ,POST, , ...
                else if(this.routes[pathname+'-'+req.method]){
                    this.routes[pathname+'-'+req.method](req,res)
                    //resolve(res)
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
    all(path , cb){
        this.routes[path+'-'+'ALL']=cb
    }
    listen(port){
        this.app.listen(port)
    }
    render(page, params=null,cb){
        if (page == 'home'){
            let content='' 
            let err=''
            try {
                content = fs.readFileSync('html.mustache').toString()
            }
            catch (e){
                err = e
            }
            
            if (params){
                Object.entries(params).forEach(param => {
                    content=content.replace('{{'+param[0]+'}}',param[1]) 
                })
            }
            cb(err,content)
        } 
    }
    
}
function express(){
    return new myExpress()
}
module.exports = express