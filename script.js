// Primera funcionalidad real de la landing: cambiar entre tema claro y oscuro
const themeBtn=document.getElementById("themeBtn");

themeBtn.addEventListener("click",()=>{
  document.body.classList.toggle("dark");
});
