# Documentacion tecnica - NeuroLearn AI

## 1. Instrucciones de inicio/ejecucion de vuestra web

Para ejecutar la web hace falta iniciar el servidor `server.js`.

Pasos:

1. Abrir la carpeta del proyecto.
2. Abrir una terminal en la carpeta del proyecto.
3. Ejecutar el comando `node server.js`.
4. Abrir un navegador y entrar en `http://localhost:3000`.
5. Interactuar con la pagina normalmente.

Archivos principales del proyecto:

- `index.html`: estructura de la landing page.
- `styles.css`: estilos visuales y responsive.
- `script.js`: funcionalidades e interacciones.
- `server.js`: servidor backend que recibe el formulario.
- `mensajes.json`: archivo que actua como modelo de datos.

## 2. Enumeracion de al menos las 5 funcionalidades mas importantes implementadas

1. Cambio de modo claro y oscuro.
2. Demo para generar ejercicios a partir de un tema escrito por el usuario.
3. Animacion de spinner durante la carga.
4. Aparicion suave de secciones al hacer scroll.
5. Puntero personalizado.

Funcionalidades adicionales que tambien existen:

- Preloader inicial.
- Formulario conectado al backend.
- Guardado del tema con `localStorage`.
- Hover effects en botones, tarjetas y enlaces.

## 3. Funcionalidad 1

### 3.1. Descripcion por escrito del comportamiento de la funcionalidad 1

La funcionalidad 1 es el **cambio de modo claro y oscuro**.

Permite al usuario cambiar el aspecto visual de la pagina.  
Cuando pulsa el boton correspondiente, la interfaz cambia sus colores de fondo, texto, paneles y botones.

### 3.2. Explicacion del funcionamiento de la funcionalidad 1

Esta funcionalidad se realiza en JavaScript y CSS.

En JavaScript:

- se detecta el boton con `getElementById`
- se escucha el evento `click`
- se añade o elimina la clase `light` en el elemento `body`
- se guarda la preferencia en `localStorage`
- se actualiza el texto del boton

En CSS:

- el selector `body.light` redefine variables de color
- al cambiar las variables CSS, toda la interfaz cambia automaticamente

Esta funcionalidad afecta a:

- `script.js`
- `styles.css`
- el boton `#themeBtn` de `index.html`

### 3.3. Fragmentos de codigo mas relevantes de la funcionalidad 1

Fragmento de `script.js`:

```js
const body = document.body;
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
  body.classList.toggle("light");
  const isLight = body.classList.contains("light");
  localStorage.setItem("theme", isLight ? "light" : "dark");
  themeBtn.textContent = isLight ? "Modo oscuro" : "Modo claro";
});
```

Explicacion:

- `addEventListener("click", ...)` ejecuta una funcion cuando el usuario pulsa el boton.
- `classList.toggle("light")` añade la clase `light` si no existe, o la elimina si ya existe.
- `classList.contains("light")` devuelve `true` o `false` segun si el `body` tiene esa clase.
- `localStorage.setItem(...)` guarda un dato en el navegador para conservar la preferencia.
- `textContent` cambia el texto visible del boton.

Fragmento de `styles.css`:

```css
body.light{
  --bg:#eef5ff;
  --bg2:#dfeaff;
  --panel:#ffffff;
  --text:#1a2940;
  --muted:#5a708d;
  --line:#1730551c;
  --accent:#108cff;
  --accent2:#20be74;
}
```

Explicacion:

- `body.light` solo se aplica cuando el `body` tiene esa clase.
- Dentro se redefinen variables CSS como `--bg`, `--text` o `--accent`.
- Como el resto del CSS usa esas variables, toda la pagina cambia de tema sin reescribir cada regla.

Fragmento de `script.js` para recuperar la preferencia:

```js
if(localStorage.getItem("theme")==="light"){
  body.classList.add("light");
  themeBtn.textContent="Modo oscuro";
}
```

Explicacion:

- `localStorage.getItem("theme")` lee el valor guardado previamente.
- Si el valor es `"light"`, se aplica el tema claro nada mas cargar la pagina.

## 4. Funcionalidad 2

### 4.1. Descripcion por escrito del comportamiento de la funcionalidad 2

La funcionalidad 2 es la **demo para generar ejercicios a partir de un tema escrito por el usuario**.

El usuario escribe un tema, por ejemplo `algebra` o `fotosintesis`, y la pagina genera un ejercicio de ejemplo en la zona de resultados.

### 4.2. Explicacion del funcionamiento de la funcionalidad 2

El comportamiento se implementa en `script.js`.

El flujo es el siguiente:

1. El usuario escribe un texto en el `input`.
2. Pulsa el boton `Generar ejercicio`.
3. JavaScript recoge el valor del campo.
4. Si el campo esta vacio, muestra un mensaje de error.
5. Si el campo tiene contenido, espera un tiempo simulado.
6. Despues inserta un ejercicio en el contenedor de resultados.

Hay dos posibilidades:

- si el tema coincide con un ejemplo predefinido, se usa ese ejemplo
- si no coincide, se genera uno generico con texto dinamico

Esta funcionalidad afecta a:

- `script.js`
- `index.html`

### 4.3. Fragmentos de codigo mas relevantes de la funcionalidad 2

Fragmento de `script.js`:

```js
const topic = document.getElementById("topic");
const generate = document.getElementById("generate");
const result = document.getElementById("result");
```

Explicacion:

- `topic` apunta al campo donde el usuario escribe el tema.
- `generate` apunta al boton que inicia la generacion.
- `result` apunta al contenedor donde se mostrara el ejercicio.

Fragmento de `script.js`:

```js
const examples = {
  algebra: [
    "Ejercicio de algebra",
    "1. Resuelve: 3x + 4 = 19",
    "2. Simplifica: 2a + 5a - 1",
    "3. Crea un problema que use una ecuacion sencilla"
  ],
  fotosintesis: [
    "Ejercicio de fotosintesis",
    "1. Define la fotosintesis",
    "2. Explica por que la luz es importante",
    "3. Nombra los elementos que necesita la planta"
  ]
};
```

Explicacion:

- `examples` es un objeto de JavaScript.
- Cada clave como `algebra` o `fotosintesis` representa un tema.
- Su valor es un array con el titulo y tres ejercicios.

Fragmento de `script.js`:

```js
generate.addEventListener("click", async () => {
  const value = topic.value.trim().toLowerCase();
  if (!value) {
    result.textContent = "Escribe un tema para generar un ejercicio.";
    return;
  }
```

Explicacion:

- `topic.value` obtiene el contenido escrito.
- `trim()` elimina espacios al principio y al final.
- `toLowerCase()` pasa el texto a minusculas para comparar mejor.
- `if (!value)` comprueba si el valor esta vacio.
- `return` corta la ejecucion para no seguir con la generacion.

Fragmento de `script.js`:

```js
const ex = examples[value] || [
  `Ejercicio sobre ${capitalize(value)}`,
  `1. Explica con tus palabras que es ${value}.`,
  `2. Escribe dos preguntas relacionadas con ${value}.`,
  `3. Haz un pequeno resumen final.`
];

result.innerHTML = `<h3>${ex[0]}</h3><ul><li>${ex[1]}</li><li>${ex[2]}</li><li>${ex[3]}</li></ul>`;
```

Explicacion:

- `examples[value]` busca si existe un ejemplo exacto.
- `||` significa “si no existe, usa el valor de la derecha”.
- Las comillas invertidas `` ` ` `` permiten interpolar variables con `${...}`.
- `innerHTML` inserta HTML dentro del contenedor `result`.

## 5. Funcionalidad 3

### 5.1. Descripcion por escrito del comportamiento de la funcionalidad 3

La funcionalidad 3 es la **animacion de spinner durante la carga**.

Mientras la demo “prepara” el ejercicio, aparece una animacion circular que indica que el sistema esta trabajando.

### 5.2. Explicacion del funcionamiento de la funcionalidad 3

Esta funcionalidad combina HTML, CSS y JavaScript.

En HTML:

- existe un contenedor `#loading`
- dentro hay un elemento con clase `spinner`

En JavaScript:

- antes de la espera simulada se quita el atributo `hidden`
- al terminar la espera se vuelve a ocultar

En CSS:

- la clase `.spinner` define el tamaño, el borde y la animacion
- la animacion `spin` hace girar el elemento de forma continua

Esta funcionalidad afecta a:

- `index.html`
- `styles.css`
- `script.js`

### 5.3. Fragmentos de codigo mas relevantes de la funcionalidad 3

Fragmento de `index.html`:

```html
<div id="loading" class="loading" hidden>
  <div class="spinner"></div>
  <span>Generando ejercicio...</span>
</div>
```

Explicacion:

- `hidden` hace que el bloque este oculto inicialmente.
- `.spinner` es el circulo animado.
- el `span` muestra un texto de apoyo para el usuario.

Fragmento de `script.js`:

```js
loading.hidden = false;
result.textContent = "Preparando resultado...";
await wait(1200);
loading.hidden = true;
```

Explicacion:

- `loading.hidden = false` muestra el bloque de carga.
- `await wait(1200)` hace una espera simulada de 1200 milisegundos.
- `loading.hidden = true` vuelve a ocultar el spinner.

Fragmento de `styles.css`:

```css
.spinner{
  width:18px;
  height:18px;
  border:3px solid rgba(255,255,255,.18);
  border-top-color:var(--accent);
  border-radius:50%;
  animation:spin 1s linear infinite;
}

@keyframes spin{to{transform:rotate(360deg)}}
```

Explicacion:

- `border-radius:50%` convierte el bloque en un circulo.
- `border-top-color` colorea solo una parte del borde para que el giro se perciba.
- `animation: spin 1s linear infinite` aplica la animacion llamada `spin`, con duracion de 1 segundo, de forma lineal y repitiendose infinitamente.

## 6. Funcionalidad 4

### 6.1. Descripcion por escrito del comportamiento de la funcionalidad 4

La funcionalidad 4 es la **aparicion suave de secciones al hacer scroll**.

Cuando el usuario va bajando por la pagina, diferentes bloques aparecen con una transicion suave en vez de mostrarse de golpe.

### 6.2. Explicacion del funcionamiento de la funcionalidad 4

Se utiliza la API `IntersectionObserver` de JavaScript.

El funcionamiento es:

1. Varias secciones del HTML tienen la clase `reveal`.
2. En CSS, esa clase define un estado inicial oculto y desplazado.
3. JavaScript observa esos elementos.
4. Cuando entran en pantalla, se les añade la clase `is-visible`.
5. CSS aplica la transicion hasta hacerlos visibles.

Esta funcionalidad afecta a:

- `index.html`
- `styles.css`
- `script.js`

### 6.3. Fragmentos de codigo mas relevantes de la funcionalidad 4

Fragmento de `index.html`:

```html
<section class="hero reveal">
...
</section>
```

Explicacion:

- la clase `reveal` marca ese bloque como animable al hacer scroll.

Fragmento de `styles.css`:

```css
.reveal{
  opacity:0;
  transform:translateY(28px);
  transition:opacity .7s ease,transform .7s ease;
}

.reveal.is-visible{
  opacity:1;
  transform:none;
}
```

Explicacion:

- `opacity:0` hace que el elemento empiece invisible.
- `translateY(28px)` lo coloca un poco mas abajo.
- `transition` indica que los cambios de opacidad y transformacion se hagan suavemente.
- `.is-visible` representa el estado final: visible y en posicion normal.

Fragmento de `script.js`:

```js
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .15 });

revealItems.forEach(item => observer.observe(item));
```

Explicacion:

- `new IntersectionObserver(...)` crea un observador de intersecciones.
- `entries` contiene los elementos observados.
- `entry.isIntersecting` indica si el elemento ha entrado en el area visible.
- `entry.target` es el elemento observado.
- `classList.add("is-visible")` le aplica el estado final.
- `unobserve(...)` deja de observar ese elemento para no repetir el proceso.
- `threshold: .15` significa que la animacion se activa cuando aproximadamente un 15% del elemento entra en pantalla.

## 7. Funcionalidad 5

### 7.1. Descripcion por escrito del comportamiento de la funcionalidad 5

La funcionalidad 5 es el **puntero personalizado**.

En equipos de escritorio, el cursor normal del navegador se sustituye por:

- un punto principal
- una estela que lo sigue

Ademas, al pasar por enlaces, botones o campos del formulario, el efecto cambia de tamaño para indicar interaccion.

### 7.2. Explicacion del funcionamiento de la funcionalidad 5

La funcionalidad se construye con:

- dos `div` en HTML
- estilos CSS para el punto y la estela
- eventos de raton en JavaScript

El proceso es:

1. En `index.html` se crean `#cursor` y `#trail`.
2. En CSS se les da forma, tamaño, posicion fija y aspecto visual.
3. JavaScript escucha `mousemove`.
4. La posicion del cursor principal sigue directamente al raton.
5. La estela se mueve con retraso usando `requestAnimationFrame`.
6. Al entrar en elementos interactivos se activan clases visuales.
7. En pantallas tactiles el cursor custom se oculta con media query.

Esta funcionalidad afecta a:

- `index.html`
- `styles.css`
- `script.js`

### 7.3. Fragmentos de codigo mas relevantes de la funcionalidad 5

Fragmento de `index.html`:

```html
<div id="cursor"></div>
<div id="trail"></div>
```

Explicacion:

- son los dos elementos visuales del puntero personalizado.
- `#cursor` es el nucleo principal.
- `#trail` es la estela.

Fragmento de `styles.css`:

```css
body.cursor-on,body.cursor-on *{cursor:none}
```

Explicacion:

- `cursor:none` oculta el cursor normal del sistema.
- se aplica al `body` y a todos sus descendientes cuando el `body` tiene la clase `cursor-on`.

Fragmento de `styles.css`:

```css
#cursor,#trail{
  position:fixed;
  top:0;
  left:0;
  pointer-events:none;
  border-radius:50%;
  transform:translate(-50%,-50%);
  opacity:0;
  z-index:120;
}
```

Explicacion:

- `position:fixed` permite mover los elementos libremente por la ventana.
- `pointer-events:none` evita que interfieran con clics o hover.
- `transform:translate(-50%,-50%)` centra visualmente cada circulo respecto al punto de coordenadas.

Fragmento de `script.js`:

```js
window.addEventListener("mousemove", e => {
  x = e.clientX;
  y = e.clientY;
  cursor.style.left = x + "px";
  cursor.style.top = y + "px";
  cursor.classList.add("show");
  trail.classList.add("show");
});
```

Explicacion:

- `mousemove` se dispara cada vez que se mueve el raton.
- `clientX` y `clientY` indican la posicion del puntero dentro de la ventana.
- `style.left` y `style.top` colocan el cursor principal en esas coordenadas.
- la clase `show` hace visibles el punto y la estela.

Fragmento de `script.js`:

```js
(function animateTrail(){
  tx += (x - tx) * 0.16;
  ty += (y - ty) * 0.16;
  trail.style.left = tx + "px";
  trail.style.top = ty + "px";
  requestAnimationFrame(animateTrail);
})();
```

Explicacion:

- es una funcion autoejecutable.
- `tx` y `ty` representan la posicion actual de la estela.
- `(x - tx) * 0.16` calcula un acercamiento progresivo al cursor principal.
- `requestAnimationFrame(...)` repite la animacion de forma fluida antes del siguiente repintado del navegador.

## 8. Funcionalidades adicionales

### 8.1. Descripcion por escrito del comportamiento de la funcionalidad adicional

Una funcionalidad adicional es el **preloader inicial**.

Nada mas abrir la pagina aparece una pantalla de carga que oculta temporalmente el contenido principal.

### 8.2. Explicacion del funcionamiento de la funcionalidad adicional

El preloader esta definido en HTML y CSS, y JavaScript lo oculta cuando la pagina termina de cargar.

### 8.3. Fragmentos de codigo mas relevantes de la funcionalidad adicional

Fragmento de `index.html`:

```html
<div id="preloader">
  <div class="spinner spinner--big"></div>
  <p>Cargando plataforma...</p>
</div>
```

Fragmento de `script.js`:

```js
window.addEventListener("load", () => {
  setTimeout(() => preloader.classList.add("hide"), 500);
});
```

Explicacion:

- `load` se dispara cuando la pagina ha terminado de cargar.
- `setTimeout(..., 500)` espera medio segundo antes de ocultar el preloader.
- `classList.add("hide")` activa el estado CSS que lo vuelve invisible.

Fragmento de `styles.css`:

```css
#preloader.hide{opacity:0;visibility:hidden}
```

Explicacion:

- `opacity:0` lo hace transparente.
- `visibility:hidden` evita que siga siendo visible o interfiera.

## 9. Funcionalidad Backend

Actualmente el proyecto **si tiene backend real**.

El backend esta implementado en `server.js` y guarda los datos del formulario en `mensajes.json`.

### 9.1. Descripcion por escrito del comportamiento de la funcionalidad backend

La funcionalidad backend permite que el formulario:

- no recargue la pagina
- valide campos
- envie los datos al servidor
- guarde esos datos en un modelo de datos JSON
- muestre un resultado final de exito o error

### 9.2. Explicacion del funcionamiento de la funcionalidad backend

El flujo del backend es el siguiente:

1. El formulario usa `preventDefault()` para evitar el envio tradicional.
2. `script.js` recoge los datos del formulario.
3. `script.js` envia esos datos al servidor mediante `fetch("/api/contact")`.
4. `server.js` recibe la peticion `POST`.
5. El servidor convierte el contenido recibido en un objeto JavaScript.
6. El servidor valida nombre, email y mensaje.
7. Si los datos son correctos, los guarda en `mensajes.json`.
8. El servidor devuelve una respuesta JSON al navegador.
9. El front-end muestra el mensaje recibido y, si todo ha ido bien, limpia el formulario.

Por tanto, aqui si existe:

- un servidor real
- una peticion HTTP real
- un almacenamiento persistente en un archivo `.json`

### 9.3. Fragmentos de codigo mas relevantes de la funcionalidad backend

Fragmento de `script.js` para enviar datos al servidor:

```js
form.addEventListener("submit", async e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  formMsg.textContent = "Enviando mensaje al servidor...";

  const res = await fetch("/api/contact", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(data)
  });
```

Explicacion:

- `submit` detecta el envio del formulario.
- `preventDefault()` evita la recarga de la pagina.
- `new FormData(form)` recoge los campos del formulario.
- `Object.fromEntries(...)` convierte esos datos en un objeto JavaScript.
- `fetch("/api/contact")` hace una peticion HTTP al backend.
- `method: "POST"` indica que se estan enviando datos.
- `headers` indica que el cuerpo se manda en formato JSON.
- `JSON.stringify(data)` convierte el objeto JavaScript en texto JSON para enviarlo.

Fragmento de `server.js` para recibir y validar la peticion:

```js
if(req.method==="POST"&&req.url==="/api/contact"){
  let body="";
  req.on("data",chunk=>body+=chunk);
  req.on("end",()=>{
    const data=JSON.parse(body||"{}");
    const valid=data.name&&String(data.email||"").includes("@")&&String(data.message||"").trim().length>=5;
```

Explicacion:

- `req.method==="POST"` comprueba que la peticion sea de envio de datos.
- `req.url==="/api/contact"` comprueba que la ruta sea la del formulario.
- `req.on("data",...)` va acumulando los fragmentos recibidos en el cuerpo de la peticion.
- `req.on("end",...)` se ejecuta cuando ya se ha recibido todo el contenido.
- `JSON.parse(body||"{}")` transforma el texto JSON recibido en un objeto JavaScript.
- `valid` comprueba que nombre, email y mensaje cumplan las condiciones minimas.

Fragmento de `server.js` para guardar datos en el modelo JSON:

```js
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
```

Explicacion:

- `fs.readFileSync(dbPath,"utf8")` lee el contenido actual del archivo `mensajes.json`.
- `JSON.parse(...)` convierte ese contenido en un array de JavaScript.
- `current.push(...)` añade un nuevo objeto con los datos del formulario.
- `Date.now()` crea un identificador numerico sencillo.
- `new Date().toISOString()` guarda la fecha y hora del registro.
- `fs.writeFileSync(...)` vuelve a escribir el archivo JSON con el nuevo contenido.

Fragmento de `server.js` para responder al cliente:

```js
if(!valid){
  sendJson(res,400,{ok:false,message:"Datos no validos."});
  return;
}

saveMessage(data);
sendJson(res,200,{ok:true,message:`Mensaje guardado correctamente, ${data.name}.`});
```

Explicacion:

- `sendJson(...)` es una funcion auxiliar para responder en formato JSON.
- el codigo `400` indica error de validacion.
- el codigo `200` indica que la operacion ha sido correcta.
- si los datos son validos, primero se guardan y despues se responde al cliente.

## 10. Responsividad

### 10.1. Descripcion por escrito del comportamiento de la responsividad

La responsividad hace que la pagina se adapte a distintos tamaños de pantalla.

En escritorio:

- la cabecera se muestra en horizontal
- el hero y los bloques pueden tener varias columnas

En movil o pantallas pequeñas:

- las columnas se apilan
- la navegacion se reorganiza
- los bloques ocupan todo el ancho disponible

### 10.2. Explicacion del funcionamiento de la responsividad

La responsividad se consigue con:

- anchos fluidos mediante `width:min(...)`
- `grid` para distribuir columnas
- `media queries` para cambiar el diseño en pantallas pequeñas

La web usa un punto de ruptura principal en `820px`.

### 10.3. Fragmentos de codigo mas relevantes de la responsividad

Fragmento de `styles.css`:

```css
.container{width:min(1100px,calc(100% - 24px));margin:auto}
```

Explicacion:

- `min(1100px, calc(100% - 24px))` hace que el contenedor no supere `1100px`, pero que en pantallas pequeñas use casi todo el ancho disponible dejando un pequeño margen lateral.

Fragmento de `styles.css`:

```css
.hero{
  display:grid;
  grid-template-columns:1.2fr .8fr;
  gap:24px;
  align-items:center;
}
```

Explicacion:

- `display:grid` activa el sistema de rejilla.
- `grid-template-columns:1.2fr .8fr` crea dos columnas proporcionales.
- `gap:24px` separa visualmente ambas zonas.

Fragmento de `styles.css`:

```css
@media (max-width:820px){
  .hero,.grid,.demo,.form-grid{grid-template-columns:1fr}
  .nav__inner{flex-direction:column}
  .nav__links{justify-content:center}
}
```

Explicacion:

- `@media (max-width:820px)` significa “aplica estas reglas si la pantalla mide 820px o menos”.
- `grid-template-columns:1fr` convierte diseños de varias columnas en una sola columna.
- `flex-direction:column` apila verticalmente los elementos de la cabecera.
- `justify-content:center` centra la navegacion.
