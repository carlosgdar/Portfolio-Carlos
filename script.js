/* =========================
   FIREBASE IMPORTS
========================= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  getAnalytics
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

/* =========================
   FIREBASE CONFIG
========================= */

const firebaseConfig = {

  apiKey: "AIzaSyAspiOuHgAgDVZn1dPVTqIVHgpVoRfblW4",

  authDomain: "portfolio-carlos-40420.firebaseapp.com",

  projectId: "portfolio-carlos-40420",

  storageBucket: "portfolio-carlos-40420.appspot.com",

  messagingSenderId: "431968596335",

  appId: "1:431968596335:web:8b6d4a5d061aa12050789a",

  measurementId: "G-ZN60M2FK86"

};

/* =========================
   INITIALIZE FIREBASE
========================= */

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const db = getFirestore(app);

/* =========================
   THEME TOGGLE + SPARKS
========================= */

const themeToggle = document.getElementById('themeToggle');

const body = document.body;

const sparksContainer = document.getElementById('themeSparks');

themeToggle.addEventListener('click', () => {

  const isDark = body.getAttribute('data-theme') === 'dark';

  if (isDark) {

    body.setAttribute('data-theme', 'light');

    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';

    createSparks(18, true);

  } else {

    body.setAttribute('data-theme', 'dark');

    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';

    createSparks(24, false);

  }

  sparksContainer.classList.add('active');

  setTimeout(() => {

    sparksContainer.classList.remove('active');

  }, 3000);

});

/* =========================
   CREATE SPARKS
========================= */

function createSparks(count, isLight) {

  for (let i = 0; i < count; i++) {

    const spark = document.createElement('div');

    spark.className = 'spark';

    const x = Math.random() * 100;

    const y = Math.random() * 100;

    spark.style.left = x + '%';

    spark.style.top = y + '%';

    const size = 4 + Math.random() * 8;

    spark.style.width = size + 'px';

    spark.style.height = size + 'px';

    spark.style.animationDelay = Math.random() * 0.8 + 's';

    if (isLight) {

      spark.style.background = '#ffeb3b';

      spark.style.boxShadow =
        '0 0 12px 5px rgba(255,235,59,0.7)';

    }

    sparksContainer.appendChild(spark);

    setTimeout(() => {

      spark.remove();

    }, 3500);

  }

}

/* =========================
   BRAND CLICK PARTICLES
========================= */

const brandClick = document.getElementById('brandClick');

if (brandClick) {

  brandClick.addEventListener('click', () => {

    if (typeof createParticles === 'function') {

      createParticles(25, '#6366f1');

    }

  });

}

/* =========================
   MOBILE MENU
========================= */

const hamburger = document.getElementById('hamburger');

const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {

  hamburger.classList.toggle('active');

  navMenu.classList.toggle('active');

});

document.querySelectorAll('.nav-menu a').forEach(link => {

  link.addEventListener('click', () => {

    hamburger.classList.remove('active');

    navMenu.classList.remove('active');

  });

});

/* =========================
   SMOOTH SCROLL
========================= */

function scrollToSection(id) {

  document.getElementById(id)
    .scrollIntoView({
      behavior: 'smooth'
    });

}

/* =========================
   TYPEWRITER
========================= */

const typewriter = document.querySelector('.typewriter');

const nameText = "Carlos Andrés";

let charIndex = 0;

function typeWriter() {

  if (charIndex < nameText.length) {

    typewriter.textContent +=
      nameText.charAt(charIndex);

    charIndex++;

    setTimeout(typeWriter, 110);

  }

}

window.addEventListener('load', typeWriter);

/* =========================
   SCROLL PROGRESS
========================= */

window.addEventListener('scroll', () => {

  const progress =
    document.querySelector('.scroll-progress');

  const scrolled =
    (window.scrollY /
    (document.documentElement.scrollHeight -
    window.innerHeight)) * 100;

  progress.style.width = scrolled + '%';

});

/* =========================
   FADE OBSERVER
========================= */

const observerOptions = {

  threshold: 0.15

};

const fadeObserver =
new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      entry.target.classList.add('visible');

      if (entry.target.querySelector('.skill-bar')) {

        const fills =
          entry.target.querySelectorAll('.fill');

        fills.forEach(fill => {

          const targetWidth =
            fill.getAttribute('data-width');

          fill.style.width = targetWidth + '%';

        });

      }

    }

  });

}, observerOptions);

document.querySelectorAll('.fade-in')
.forEach(section => {

  fadeObserver.observe(section);

});

/* =========================
   PROJECT MODAL
========================= */

const projectsData = {

  project1: {

    title: "TaskFlow - Gestor de Tareas",

    desc:
    "Aplicación para gestionar tareas con drag & drop, persistencia local y animaciones suaves.",

    tech: [
      "HTML",
      "CSS",
      "JavaScript",
      "LocalStorage"
    ]

  },

  project2: {

    title: "E-Shop Minimal",

    desc:
    "Tienda online responsive con carrito funcional, filtros y diseño limpio.",

    tech: [
      "HTML",
      "CSS",
      "JavaScript"
    ]

  },

  project3: {

    title: "Weather Dashboard",

    desc:
    "Panel del clima con datos en tiempo real, gráficos y soporte dark/light mode.",

    tech: [
      "HTML",
      "CSS",
      "JavaScript",
      "API"
    ]

  }

};

function openModal(id) {

  const data = projectsData[id];

  document.getElementById('modalBody').innerHTML = `

    <h2>${data.title}</h2>

    <p>${data.desc}</p>

    <h3>Tecnologías usadas:</h3>

    <ul style="
      display:flex;
      flex-wrap:wrap;
      gap:0.8rem;
      margin-top:1.2rem;
    ">

      ${data.tech.map(tech => `

        <li style="
          background:var(--accent);
          color:white;
          padding:0.5rem 1.1rem;
          border-radius:999px;
          font-size:0.92rem;
        ">
          ${tech}
        </li>

      `).join('')}

    </ul>

  `;

  document.getElementById('projectModal')
    .style.display = 'flex';

}

function closeModal() {

  document.getElementById('projectModal')
    .style.display = 'none';

}

window.onclick = function(event) {

  if (event.target.classList.contains('modal')) {

    closeModal();

  }

};

/* =========================
   CAROUSEL
========================= */

let currentSlide = 0;

const slides =
document.querySelectorAll('.carousel-slide');

const totalSlides = slides.length;

function updateCarousel() {

  slides.forEach((slide, idx) => {

    slide.classList.toggle(
      'active',
      idx === currentSlide
    );

  });

  updateDots();

}

function changeSlide(direction) {

  currentSlide =
    (currentSlide + direction + totalSlides)
    % totalSlides;

  updateCarousel();

}

function updateDots() {

  const dotsContainer =
    document.getElementById('carouselDots');

  if (!dotsContainer) return;

  dotsContainer.innerHTML = '';

  for (let i = 0; i < totalSlides; i++) {

    const dot = document.createElement('span');

    dot.className =
      `dot ${i === currentSlide ? 'active' : ''}`;

    dot.addEventListener('click', () => {

      currentSlide = i;

      updateCarousel();

    });

    dotsContainer.appendChild(dot);

  }

}

let autoPlay =
setInterval(() => changeSlide(1), 5000);

const carouselContainer =
document.querySelector('.carousel-container');

if (carouselContainer) {

  carouselContainer.addEventListener('mouseenter', () => {

    clearInterval(autoPlay);

  });

  carouselContainer.addEventListener('mouseleave', () => {

    autoPlay =
    setInterval(() => changeSlide(1), 5000);

  });

}

window.addEventListener('load', updateCarousel);

/* =========================
   PIXEL BARS OBSERVER
========================= */

const observer =
new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      entry.target.classList.add('visible');

      if (entry.target.querySelector('.pixel-bar')) {

        document.querySelectorAll('.pixel-bar')
        .forEach(bar => {

          const percent =
            bar.dataset.percent;

          const fill =
            bar.querySelector('.pixel-fill');

          if (fill) {

            fill.style.width =
              percent + '%';

          }

        });

      }

    }

  });

}, {

  threshold: 0.2

});

const aboutSection =
document.querySelector('#about');

if (aboutSection) {

  observer.observe(aboutSection);

}

/* =========================
   PROJECT CARD CLICK
========================= */

document.querySelectorAll('.project-card')
.forEach(card => {

  card.addEventListener('click', function(e) {

    if (e.target.closest('.github-btn')) return;

    const projectId =
      card.getAttribute('data-project-id');

    if (projectId) {

      openModal(projectId);

    }

  });

});

/* =========================
   FIREBASE CONTACT FORM
========================= */

const form =
document.getElementById("contactForm");

if (form) {

  form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name =
      document.getElementById("name").value;

    const email =
      document.getElementById("email").value;

    const message =
      document.getElementById("message").value;

    try {

      await addDoc(
        collection(db, "messages"),
        {

          name: name,

          email: email,

          message: message,

          createdAt: new Date()

        }
      );

     showToast("Mensaje enviado correctamente 🚀");

      form.reset();

    } catch (error) {

      console.error("Error:", error);

      showToast("Error al enviar el mensaje");

    }

  });

}

function showToast(message){

  const toast =
    document.getElementById("toast");

  toast.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {

    toast.classList.remove("show");

  }, 3000);

}

/* =========================
   CURSOR GLOW
========================= */

const cursorGlow =
document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {

  cursorGlow.style.left = e.clientX + 'px';

  cursorGlow.style.top = e.clientY + 'px';

});

/* =========================
   LOADER
========================= */

window.addEventListener('load', () => {

  const loader =
    document.getElementById('loader');

  setTimeout(() => {

    loader.style.opacity = '0';

    loader.style.visibility = 'hidden';

  }, 1200);

});

/* =========================
   MAGNETIC BUTTONS
========================= */

const magneticButtons =
document.querySelectorAll('.magnetic');

magneticButtons.forEach(btn => {

  btn.addEventListener('mousemove', (e) => {

    const rect =
      btn.getBoundingClientRect();

    const x =
      e.clientX - rect.left - rect.width / 2;

    const y =
      e.clientY - rect.top - rect.height / 2;

    btn.style.transform =
      `translate(${x * 0.18}px,
                 ${y * 0.18}px)`;

  });

  btn.addEventListener('mouseleave', () => {

    btn.style.transform =
      'translate(0px,0px)';

  });

});

/* =========================
   HERO PARALLAX
========================= */

const hero =
document.querySelector('.hero');

window.addEventListener('mousemove', (e) => {

  const x =
    (window.innerWidth / 2 - e.clientX) / 40;

  const y =
    (window.innerHeight / 2 - e.clientY) / 40;

  hero.style.transform =
    `translate(${x}px, ${y}px)`;

});

/* =========================
   GLOBAL FUNCTIONS
========================= */

window.changeSlide = changeSlide;

window.openModal = openModal;

window.closeModal = closeModal;

window.scrollToSection = scrollToSection;