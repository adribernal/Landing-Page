const body=document.body;
const preloader=document.getElementById("preloader");
const themeBtn=document.getElementById("themeBtn");
const topic=document.getElementById("topic");
const generate=document.getElementById("generate");
const loading=document.getElementById("loading");
const result=document.getElementById("result");
const form=document.getElementById("form");
const formMsg=document.getElementById("formMsg");
const revealItems=document.querySelectorAll(".reveal");

const examples={
  algebra:[
    "Ejercicio de algebra",
    "1. Resuelve: 3x + 4 = 19",
    "2. Simplifica: 2a + 5a - 1",
    "3. Crea un problema que use una ecuacion sencilla"
  ],
  fotosintesis:[
    "Ejercicio de fotosintesis",
    "1. Define la fotosintesis",
    "2. Explica por que la luz es importante",
    "3. Nombra los elementos que necesita la planta"
  ]
};

window.addEventListener("load",()=>{
  setTimeout(()=>preloader.classList.add("hide"),500);
});

themeBtn.addEventListener("click",()=>{
  body.classList.toggle("light");
  const isLight=body.classList.contains("light");
  localStorage.setItem("theme",isLight?"light":"dark");
  themeBtn.textContent=isLight?"Modo oscuro":"Modo claro";
});

if(localStorage.getItem("theme")==="light"){
  body.classList.add("light");
  themeBtn.textContent="Modo oscuro";
}

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.15});

revealItems.forEach(item=>observer.observe(item));

generate.addEventListener("click",async()=>{
  const value=topic.value.trim().toLowerCase();
  if(!value){
    result.textContent="Escribe un tema para generar un ejercicio.";
    return;
  }

  loading.hidden=false;
  result.textContent="Preparando resultado...";
  await wait(1200);

  const ex=examples[value]||[
    `Ejercicio sobre ${capitalize(value)}`,
    `1. Explica con tus palabras que es ${value}.`,
    `2. Escribe dos preguntas relacionadas con ${value}.`,
    `3. Haz un pequeno resumen final.`
  ];

  loading.hidden=true;
  result.innerHTML=`<h3>${ex[0]}</h3><ul><li>${ex[1]}</li><li>${ex[2]}</li><li>${ex[3]}</li></ul>`;
});

form.addEventListener("submit",async e=>{
  e.preventDefault();
  const data=Object.fromEntries(new FormData(form).entries());
  formMsg.textContent="Enviando mensaje...";
  await wait(1000);

  const valid=data.name&&String(data.email||"").includes("@")&&String(data.message||"").trim().length>=5;
  formMsg.textContent=valid
    ?`Mensaje enviado correctamente, ${data.name}.`
    :"Revisa los datos del formulario.";

  if(valid)form.reset();
});

function wait(ms){return new Promise(resolve=>setTimeout(resolve,ms))}
function capitalize(text){return text.charAt(0).toUpperCase()+text.slice(1)}
