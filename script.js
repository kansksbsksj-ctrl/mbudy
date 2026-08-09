// القائمة للموبايل
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("#navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });
}

// الكتابة المتحركة
const typingText = document.querySelector("#typingText");
const words = [
  "مبرمج مواقع",
  "مصمم جرافيك",
  "مونتير فيديو",
  "صانع تجارب رقمية"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  if (!typingText) return;

  const current = words[wordIndex];

  if (!deleting) {
    typingText.textContent = current.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeEffect, 1500);
      return;
    }
  } else {
    typingText.textContent = current.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeEffect, deleting ? 55 : 90);
}

typeEffect();

// ظهور العناصر أثناء النزول
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach(el => revealObserver.observe(el));

// شريط تقدم الصفحة
const progress = document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const percentage = height > 0 ? (scrollTop / height) * 100 : 0;

  if (progress) progress.style.width = `${percentage}%`;
});

// زر العودة للأعلى
const backToTop = document.querySelector("#backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTop?.classList.add("show");
  } else {
    backToTop?.classList.remove("show");
  }
});

backToTop?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// السنة الحالية تلقائياً
const year = document.querySelector("#year");
if (year) {
  year.textContent = new Date().getFullYear();
}
