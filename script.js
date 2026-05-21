/* ===== EMAILJS INIT ===== */
emailjs.init("SZSCM_-vAGeSv6BWn");

/* ===== CURSOR ===== */
const cursor = document.getElementById("cursor");
const cursorFollower = document.getElementById("cursor-follower");

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";
});

function animateCursor() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + "px";
  cursorFollower.style.top = followerY + "px";
  requestAnimationFrame(animateCursor);
}
animateCursor();

/* ===== PARTICLES ===== */
function createParticles() {
  const container = document.getElementById("particles");
  const count = 30;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      animation-duration: ${Math.random() * 15 + 10}s;
      animation-delay: ${Math.random() * 10}s;
      opacity: ${Math.random() * 0.5 + 0.1};
      background: ${Math.random() > 0.5 ? "#8b5cf6" : "#3b82f6"};
    `;
    container.appendChild(p);
  }
}
createParticles();

/* ===== HEADER SCROLL EFFECT ===== */
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
  updateActiveNav();
  toggleBackToTop();
});

/* ===== MOBILE MENU ===== */
const menuBtn = document.getElementById("menu-btn");
const navMenu = document.getElementById("nav-menu");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("open");
  navMenu.classList.toggle("open");
});

// Close menu on nav link click
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    menuBtn.classList.remove("open");
    navMenu.classList.remove("open");
  });
});

/* ===== ACTIVE NAV LINK ===== */
function updateActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  let currentSection = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("data-section") === currentSection) {
      link.classList.add("active");
    }
  });
}

/* ===== SCROLL REVEAL ===== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("visible");
      }, index * 100);
      animateSkillBars(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

document.querySelectorAll(".reveal").forEach(el => {
  revealObserver.observe(el);
});

/* ===== ANIMATE SKILL BARS ===== */
function animateSkillBars(el) {
  const bars = el.querySelectorAll ? el.querySelectorAll(".skill-bar-fill") : [];
  bars.forEach(bar => {
    setTimeout(() => {
      bar.classList.add("animated");
    }, 300);
  });
}

// Also observe skill bars independently
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bars = entry.target.querySelectorAll(".skill-bar-fill");
      bars.forEach((bar, i) => {
        setTimeout(() => {
          bar.classList.add("animated");
        }, i * 150);
      });
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll(".skills-category").forEach(cat => {
  skillObserver.observe(cat);
});

/* ===== TYPEWRITER EFFECT ===== */
const titles = [
  "Web Full Stack",
  "Mobile (React Native)",
  "Desktop (Electron.js)",
  "Firebase Developer",
  "Junior"
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const dynamicTitle = document.getElementById("dynamic-title");

function typeWriter() {
  if (!dynamicTitle) return;
  const currentTitle = titles[titleIndex];

  if (isDeleting) {
    dynamicTitle.textContent = currentTitle.substring(0, charIndex - 1);
    charIndex--;
  } else {
    dynamicTitle.textContent = currentTitle.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === currentTitle.length) {
    speed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    titleIndex = (titleIndex + 1) % titles.length;
    speed = 400;
  }

  setTimeout(typeWriter, speed);
}
typeWriter();

/* ===== BACK TO TOP ===== */
const backToTop = document.getElementById("back-to-top");

function toggleBackToTop() {
  if (window.scrollY > 400) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
}

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ===== EMAILJS FORM ===== */
const form = document.getElementById("contact-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const btn = form.querySelector("button[type='submit']");
  btn.textContent = "Envoi en cours...";
  btn.disabled = true;

  emailjs.sendForm("service_pe5le1b", "template_lnkqs6p", this)
    .then(() => {
      btn.textContent = "✅ Message envoyé !";
      btn.style.background = "linear-gradient(135deg, #22c55e, #16a34a)";
      form.reset();
      setTimeout(() => {
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Envoyer le message`;
        btn.style.background = "";
        btn.disabled = false;
      }, 3000);
    }, (error) => {
      console.error("FAILED...", error);
      btn.textContent = "❌ Erreur, réessayez";
      btn.style.background = "linear-gradient(135deg, #ef4444, #dc2626)";
      setTimeout(() => {
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Envoyer le message`;
        btn.style.background = "";
        btn.disabled = false;
      }, 3000);
    });
});

/* ===== CONFIRM FUNCTIONS ===== */
function confirmSend() {
  return confirm("Êtes-vous sûr d'envoyer le message ?");
}
function downloadCV() {
  return confirm("Voulez-vous télécharger le CV ?");
}
function openlinkdin() {
  return confirm("Voulez-vous ouvrir mon profil LinkedIn ?");
}
function opengithub() {
  return confirm("Voulez-vous ouvrir mon profil GitHub ?");
}
function opengit() {
  return confirm("Voulez-vous ouvrir mon profil Git ?");
}
function openfacebook() {
  return confirm("Voulez-vous ouvrir mon profil Facebook ?");
}
function openintagram() {
  return confirm("Voulez-vous ouvrir mon profil Instagram ?");
}
function ovriresite() {
  return confirm("Voulez-vous ouvrir mon site web Pepsi ?");
}

/* ===== SMOOTH HOVER TILT ON CARDS ===== */
document.querySelectorAll(".glass-card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) translateY(-4px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});