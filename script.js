const body = document.body;
const preloader = document.getElementById("preloader");
const revealItems = document.querySelectorAll(".reveal");
const themeToggle = document.getElementById("theme-toggle");
const themeToggleText = themeToggle.querySelector(".theme-toggle__text");
const generateButton = document.getElementById("generate-btn");
const topicInput = document.getElementById("topic-input");
const demoLoading = document.getElementById("demo-loading");
const demoResult = document.getElementById("demo-result");
const contactForm = document.getElementById("contact-form");
const formFeedback = document.getElementById("form-feedback");
const floatingCards = document.querySelectorAll(".float-card");

const generatedExercises = {
  algebra: {
    title: "Práctica de álgebra",
    prompt: "Resuelve las ecuaciones y explica tu razonamiento.",
    tasks: [
      "Resuelve: 3x + 5 = 20",
      "Simplifica: 4a + 2a - 3",
      "Crea un problema verbal que pueda resolverse con y - 7 = 15"
    ]
  },
  photosynthesis: {
    title: "Repaso de fotosíntesis",
    prompt: "Lee las consignas y responde con oraciones completas.",
    tasks: [
      "Define la fotosíntesis con tus propias palabras",
      "Enumera las entradas y salidas del proceso",
      "Explica por qué la luz solar es esencial para las plantas"
    ]
  },
  "english verbs": {
    title: "Ejercicio de verbos en inglés",
    prompt: "Completa las tareas centrándote en los tiempos verbales y su uso.",
    tasks: [
      "Escribe tres oraciones usando el present perfect",
      "Corrige esta frase: She go to school yesterday",
      "Convierte el verbo 'to learn' en pasado, presente y futuro"
    ]
  }
};

applySavedTheme();
setupRevealObserver();
setupFloatingAnimation();

body.classList.add("is-loading");

window.addEventListener("load", () => {
  window.setTimeout(() => {
    preloader.classList.add("is-hidden");
    body.classList.remove("is-loading");
  }, 700);
});

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  const mode = body.classList.contains("light-mode") ? "light" : "dark";
  localStorage.setItem("preferred-theme", mode);
  updateThemeLabel();
});

generateButton.addEventListener("click", async () => {
  const topic = topicInput.value.trim();

  if (!topic) {
    demoResult.innerHTML = "<p>Escribe un tema para generar un ejercicio.</p>";
    return;
  }

  demoLoading.hidden = false;
  demoResult.innerHTML = "<p>Preparando tu ejercicio personalizado...</p>";

  const generated = await simulateExerciseGeneration(topic);
  demoLoading.hidden = true;
  demoResult.innerHTML = generated;
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();

  formFeedback.className = "form-feedback";
  formFeedback.textContent = "Enviando tu mensaje...";

  window.setTimeout(() => {
    if (!name || !email.includes("@") || message.length < 10) {
      formFeedback.textContent = "Completa correctamente todos los campos antes de enviar.";
      return;
    }

    formFeedback.textContent = `Gracias, ${name}. Tu mensaje se ha enviado correctamente.`;
    formFeedback.classList.add("is-success");
    contactForm.reset();
  }, 1000);
});

function applySavedTheme() {
  const savedTheme = localStorage.getItem("preferred-theme");

  if (savedTheme === "light") {
    body.classList.add("light-mode");
  }

  updateThemeLabel();
}

function updateThemeLabel() {
  const isLight = body.classList.contains("light-mode");
  themeToggleText.textContent = isLight ? "Modo oscuro" : "Modo claro";
}

function setupRevealObserver() {
  // Activa la animación solo una vez cuando cada bloque entra en pantalla.
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function setupFloatingAnimation() {
  // Movimiento suave continuo para las tarjetas decorativas del hero.
  floatingCards.forEach((card, index) => {
    function animate(now) {
      const offset = Math.sin(now / 900 + index) * 10;
      card.style.transform = `translateY(${offset}px)`;
      window.requestAnimationFrame(animate);
    }

    window.requestAnimationFrame(animate);
  });
}

function simulateExerciseGeneration(topic) {
  // Simula una petición a IA devolviendo contenido dinámico tras un pequeño delay.
  return new Promise((resolve) => {
    window.setTimeout(() => {
      const normalizedTopic = topic.toLowerCase();
      const data = generatedExercises[normalizedTopic] || buildCustomExercise(topic);

      resolve(`
        <h3>${data.title}</h3>
        <p>${data.prompt}</p>
        <ul>
          <li>${data.tasks[0]}</li>
          <li>${data.tasks[1]}</li>
          <li>${data.tasks[2]}</li>
        </ul>
      `);
    }, 1500);
  });
}

function buildCustomExercise(topic) {
  return {
    title: `Pack de ejercicios: ${capitalize(topic)}`,
    prompt: "Aquí tienes una actividad simulada generada por IA a partir de tu tema.",
    tasks: [
      `Escribe una explicación breve sobre ${topic}`,
      `Crea dos preguntas de práctica sobre ${topic}`,
      `Resume la idea principal de ${topic} en un párrafo`
    ]
  };
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
