const http=require("http");
const fs=require("fs");
const path=require("path");

const port=3000;
const root=__dirname;
const dbPath=path.join(root,"mensajes.json");

const mimeTypes={
  ".html":"text/html; charset=utf-8",
  ".css":"text/css; charset=utf-8",
  ".js":"application/javascript; charset=utf-8",
  ".json":"application/json; charset=utf-8"
};

function ensureDb(){
  if(!fs.existsSync(dbPath)){
    fs.writeFileSync(dbPath,"[]","utf8");
  }
}

function sendJson(res,status,data){
  res.writeHead(status,{"Content-Type":"application/json; charset=utf-8"});
  res.end(JSON.stringify(data));
}

function saveMessage(data){
  const current=JSON.parse(fs.readFileSync(dbPath,"utf8"));
  current.push({
    id:Date.now(),
    name:data.name,
    email:data.email,
    message:data.message,
    createdAt:new Date().toISOString()
  });
  fs.writeFileSync(dbPath,JSON.stringify(current,null,2),"utf8");
}

ensureDb();

const server=http.createServer((req,res)=>{
  if(req.method==="POST"&&req.url==="/api/contact"){
    let body="";
    req.on("data",chunk=>body+=chunk);
    req.on("end",()=>{
      try{
        const data=JSON.parse(body||"{}");
        const valid=data.name&&String(data.email||"").includes("@")&&String(data.message||"").trim().length>=1;

        if(!valid){
          sendJson(res,400,{ok:false,message:"Datos no validos."});
          return;
        }

        saveMessage(data);
        sendJson(res,200,{ok:true,message:`Mensaje guardado correctamente, ${data.name}.`});
      }catch{
        sendJson(res,400,{ok:false,message:"Peticion incorrecta."});
      }
    });
    return;
  }

  const cleanUrl=req.url==="/"?"index.html":req.url.replace(/^\//,"");
  const filePath=path.join(root,cleanUrl);
  const ext=path.extname(filePath).toLowerCase();

  fs.readFile(filePath,(err,data)=>{
    if(err){
      res.writeHead(404,{"Content-Type":"text/plain; charset=utf-8"});
      res.end("No encontrado");
      return;
    }

    res.writeHead(200,{"Content-Type":mimeTypes[ext]||"text/plain; charset=utf-8"});
    res.end(data);
  });
});

server.listen(port,()=>{
  console.log(`Servidor activo en http://localhost:${port}`);
});
