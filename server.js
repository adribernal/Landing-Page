const http=require("http");
const fs=require("fs");
const path=require("path");

const port=3000;
const root=__dirname;

const types={
  ".html":"text/html; charset=utf-8",
  ".css":"text/css; charset=utf-8",
  ".js":"application/javascript; charset=utf-8",
  ".json":"application/json; charset=utf-8"
};

const server=http.createServer((req,res)=>{
  if(req.method==="POST"&&req.url==="/api/contact"){
    let body="";
    req.on("data",chunk=>body+=chunk);
    req.on("end",()=>{
      try{
        const data=JSON.parse(body||"{}");
        const valid=data.name&&String(data.email||"").includes("@")&&String(data.message||"").trim().length>=5;
        res.writeHead(valid?200:400,{"Content-Type":"application/json; charset=utf-8"});
        res.end(JSON.stringify(valid
          ?{ok:true,message:`Mensaje recibido correctamente, ${data.name}.`}
          :{ok:false,message:"Datos no validos."}
        ));
      }catch{
        res.writeHead(400,{"Content-Type":"application/json; charset=utf-8"});
        res.end(JSON.stringify({ok:false,message:"Peticion incorrecta."}));
      }
    });
    return;
  }

  const filePath=req.url==="/" ? path.join(root,"index.html") : path.join(root,req.url);
  const ext=path.extname(filePath).toLowerCase();

  fs.readFile(filePath,(err,data)=>{
    if(err){
      res.writeHead(404,{"Content-Type":"text/plain; charset=utf-8"});
      res.end("No encontrado");
      return;
    }
    res.writeHead(200,{"Content-Type":types[ext]||"text/plain; charset=utf-8"});
    res.end(data);
  });
});

server.listen(port,()=>{
  console.log(`Servidor activo en http://localhost:${port}`);
});
