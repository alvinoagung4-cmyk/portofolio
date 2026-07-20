/* ===== PRELOADER ===== */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  preloader.classList.add('hidden');
});

/* ===== NAVBAR ===== */
const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

/* ===== ACTIVE NAV LINK ON SCROLL ===== */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 150;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

/* ===== THEME TOGGLE ===== */
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light');
  themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  if (document.body.classList.contains('light')) {
    themeIcon.classList.replace('fa-moon', 'fa-sun');
    localStorage.setItem('theme', 'light');
  } else {
    themeIcon.classList.replace('fa-sun', 'fa-moon');
    localStorage.setItem('theme', 'dark');
  }
});

/* ===== TYPING EFFECT ===== */
const typedText = document.getElementById('typed-text');
const words = ['Web Developer', 'Programmer', 'UI/UX Designer', ' siswa RPL yang haus belajar'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const current = words[wordIndex];
  if (!isDeleting) {
    typedText.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2000);
      return;
    }
    setTimeout(typeEffect, 100);
  } else {
    typedText.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(typeEffect, 500);
      return;
    }
    setTimeout(typeEffect, 50);
  }
}
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(typeEffect, 1000);
});



/* ===== SKILLS TABS ===== */
const skillTabs = document.querySelectorAll('.skill-tab');
const skillPanels = {
  frontend: document.getElementById('frontend'),
  backend: document.getElementById('backend'),
  tools: document.getElementById('tools')
};

skillTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    skillTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    Object.values(skillPanels).forEach(p => p.classList.remove('active'));
    const panel = skillPanels[tab.dataset.tab];
    if (panel) {
      panel.classList.add('active');
      animateSkillBars(panel);
    }
  });
});

/* ===== ANIMATE SKILL BARS ===== */
function animateSkillBars(container) {
  const bars = container.querySelectorAll('.skill-progress');
  bars.forEach(bar => {
    const width = bar.dataset.width;
    setTimeout(() => {
      bar.style.width = width + '%';
    }, 300);
  });
}

// Animate initial active panel
document.addEventListener('DOMContentLoaded', () => {
  const activePanel = document.querySelector('.skills-panel.active');
  if (activePanel) animateSkillBars(activePanel);
});

// Re-animate when scrolled into view
const skillsSection = document.getElementById('skills');
if (skillsSection) {
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.skills-panel.active .skill-progress').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
      }
    });
  }, { threshold: 0.3 });
  skillsObserver.observe(skillsSection);
}

/* ===== COUNTER ANIMATION ===== */
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.dataset.target);
      animateCounter(entry.target, target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

function animateCounter(el, target) {
  let current = 0;
  const increment = Math.ceil(target / 60);
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = current;
    }
  }, 30);
}

/* ===== PROJECTS FILTER ===== */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hide');
      } else {
        card.classList.add('hide');
      }
    });
  });
});

/* ===== PROJECT MODALS ===== */
const detailBtns = document.querySelectorAll('.project-detail-btn');
const modals = document.querySelectorAll('.modal-overlay');
const modalCloseBtns = document.querySelectorAll('.modal-close');

detailBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const modalId = btn.dataset.modal;
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});

modalCloseBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    modals.forEach(m => m.classList.remove('active'));
    document.body.style.overflow = '';
  });
});

modals.forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modals.forEach(m => m.classList.remove('active'));
    document.body.style.overflow = '';
  }
});

/* ===== TESTIMONIALS SLIDER ===== */
const track = document.getElementById('testimonialTrack');
const dots = document.querySelectorAll('#testimonialDots span');
const prevBtn = document.getElementById('prevTestimonial');
const nextBtn = document.getElementById('nextTestimonial');
const cards = track ? track.querySelectorAll('.testimonial-card') : [];
let currentSlide = 0;

function goToSlide(index) {
  if (!track) return;
  if (index < 0) index = cards.length - 1;
  if (index >= cards.length) index = 0;
  currentSlide = index;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goToSlide(i));
  });
  // Auto slide
  setInterval(() => goToSlide(currentSlide + 1), 5000);
}

/* ===== FAQ ACCORDION ===== */
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    const isActive = item.classList.contains('active');
    // Close all
    faqQuestions.forEach(q2 => q2.parentElement.classList.remove('active'));
    // Open clicked if it wasn't active
    if (!isActive) item.classList.add('active');
  });
});

/* ===== CONTACT FORM ===== */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-submit');
    const loader = btn.querySelector('.btn-loader');
    const btnText = btn.querySelector('i.fa-paper-plane');

    btnText.style.display = 'none';
    loader.style.display = 'inline-block';

    setTimeout(() => {
      loader.style.display = 'none';
      btnText.style.display = 'inline-block';
      contactForm.reset();
      alert('Terima kasih! Pesan Anda telah terkirim.');
    }, 2000);
  });
}

/* ===== BACK TO TOP ===== */
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 500);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== INIT AOS ===== */
AOS.init({
  duration: 800,
  once: true,
  offset: 100,
  easing: 'ease-out-cubic'
});

/* ===== DOWNLOAD CV ===== */
document.querySelectorAll('.about-cta .btn-outline').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Fitur download CV akan segera tersedia. Silakan hubungi saya langsung untuk mendapatkan CV.');
  });
});

console.log('%c Portofolio Alvino Agung Wijaya ',
  'background:#38bdf8;color:#0f172a;font-size:1.2rem;font-weight:bold;padding:10px 20px;border-radius:5px;');
console.log('%c Dibuat dengan ❤️ menggunakan HTML, CSS & JavaScript ',
  'color:#94a3b8;font-size:0.9rem;');
