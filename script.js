// ========== TYPING NAME EFFECT ==========
const typingNameElement = document.getElementById('typing-name');
if (typingNameElement) {
  const name = 'Tehan Hewage';
  let currentIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  let deletingSpeed = 50;
  let pauseTime = 2000; // Pause before deleting

  function typeName() {
    const currentText = typingNameElement.textContent;
    
    if (!isDeleting && currentIndex < name.length) {
      // Typing forward
      typingNameElement.textContent = name.substring(0, currentIndex + 1);
      currentIndex++;
      typingSpeed = 100;
    } else if (!isDeleting && currentIndex === name.length) {
      // Finished typing, wait then start deleting
      setTimeout(() => {
        isDeleting = true;
        typeName();
      }, pauseTime);
      return;
    } else if (isDeleting && currentIndex > 0) {
      // Deleting
      typingNameElement.textContent = name.substring(0, currentIndex - 1);
      currentIndex--;
      typingSpeed = deletingSpeed;
    } else if (isDeleting && currentIndex === 0) {
      // Finished deleting, wait then start typing again
      isDeleting = false;
      setTimeout(() => {
        typeName();
      }, 500);
      return;
    }
    
    setTimeout(typeName, typingSpeed);
  }
  
  // Start typing after a short delay
  setTimeout(() => {
    typeName();
  }, 1000);
}

// ========== CURSOR TRAIL EFFECT ==========
const cursorTrail = document.getElementById('cursor-trail');
let mouseX = 0;
let mouseY = 0;
let trailX = 0;
let trailY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateTrail() {
  trailX += (mouseX - trailX) * 0.1;
  trailY += (mouseY - trailY) * 0.1;
  
  if (cursorTrail) {
    cursorTrail.style.left = trailX + 'px';
    cursorTrail.style.top = trailY + 'px';
  }
  
  requestAnimationFrame(animateTrail);
}
animateTrail();

// ========== SCROLL PROGRESS BAR ==========
const scrollProgress = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (window.pageYOffset / windowHeight) * 100;
  
  if (scrollProgress) {
    scrollProgress.style.width = scrolled + '%';
  }
});

// ========== PARTICLE SYSTEM ==========
const canvas = document.getElementById('particles-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = 50;

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(6, 182, 212, ${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    // Connect nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(6, 182, 212, ${0.1 * (1 - distance / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animateParticles);
  }

  animateParticles();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ========== SEASONAL SNOW EFFECT (Dec + early Jan) ==========
let snowInitialized = false;

function isHolidaySeason(date = new Date()) {
  const month = date.getMonth(); // 0 = Jan, 11 = Dec
  const day = date.getDate();
  return month === 11 || (month === 0 && day <= 7);
}

function initSnowEffect() {
  if (snowInitialized || !document.body) return;
  snowInitialized = true;

  const snowContainer = document.createElement('div');
  snowContainer.id = 'snow-container';
  document.body.appendChild(snowContainer);

  const flakeCount = window.innerWidth < 768 ? 40 : 80;
  for (let i = 0; i < flakeCount; i++) {
    const flake = document.createElement('span');
    flake.className = 'snowflake';

    const size = (Math.random() * 8 + 8).toFixed(2); // Larger for photo flakes
    const left = Math.random() * 100;
    const duration = (Math.random() * 6 + 8).toFixed(2);
    const delay = (Math.random() * -duration).toFixed(2);
    const sway = (Math.random() * 40 + 10).toFixed(0);

    flake.style.width = `${size}px`;
    flake.style.height = `${size}px`;
    flake.style.left = `${left}vw`;
    flake.style.setProperty('--sway', `${Math.random() > 0.5 ? '' : '-'}${sway}px`);
    flake.style.animation = `snow-fall ${duration}s linear ${delay}s infinite`;
    flake.style.opacity = (Math.random() * 0.3 + 0.6).toFixed(2);

    snowContainer.appendChild(flake);
  }
}

if (isHolidaySeason()) {
  initSnowEffect();
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu if open
      const mobileMenu = document.getElementById('mobile-menu');
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
      }
    }
  });
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// Image zoom effect on hover for project image
document.querySelectorAll('.project-image-main').forEach((img) => {
  img.addEventListener('load', function() {
    // Image is ready, smooth transitions will work
    this.style.willChange = 'transform';
  });
});

// Project card click handler - handles multiple project cards
const projectCards = document.querySelectorAll('.project-card-modern[data-project]');
const projectModal = document.getElementById('project-modal');
const closeModal = document.getElementById('close-modal');
const modalContent = document.getElementById('modal-content');

// Project data mapping
const projectData = {
  gsmarena: {
    title: "GSMArena Explorer",
    category: "Full Stack",
    image: "images/gsmarena.png",
    description: "React/Tailwind interface for browsing GSMArena brands, devices, specs, and comparisons backed by a lightweight Express scraper API that fetches GSMArena HTML directly.",
    demo: "https://gsamarena-data-scrapper.netlify.app/",
    features: [
      "Vite + React UI with Tailwind styling",
      "Express scraper API using Cheerio (no third-party APIs)",
      "Brands listing with GSMArena pagination",
      "Device catalog per brand with paging",
      "Device detail pages with specs and gallery",
      "Device comparison support",
      "In-memory caching with configurable TTL",
      "Configurable API base via VITE_API_BASE"
    ],
    technologies: ["React", "Vite", "Tailwind CSS", "Node.js", "Express", "Cheerio", "Scraper API"]
  },
  opsel: {
    title: "Opsel Mobile City",
    category: "Frontend Prototype",
    image: "images/opsel.png",
    description: "High-fidelity e-commerce prototype for a premium mobile phone retail store with glassmorphism UI, micro-interactions, and a complete page set.",
    demo: "https://opselmobilecity.netlify.app/",
    features: [
      "Filterable, sortable product grid with load-more pagination",
      "Product detail pages with galleries, specs tabs, and pricing/discounts",
      "Home, Shop, Product, Services, About, and Contact pages",
      "Brand carousel and category navigation",
      "Scroll-triggered reveals and hover/press micro-interactions",
      "Glassmorphism styling with custom scrollbar and theme variables",
      "TypeScript + React Router 7 + Headless UI components",
      "Lazy loading and Vite-powered performance"
    ],
    technologies: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "React Router 7", "Headless UI", "Lucide Icons"]
  },
  bananamath: {
    title: "BananaMath Adventure",
    category: "Web Game",
    image: "images/bananamath.png",
    description: "Browser-based math puzzle/adventure game with progressive levels, boss stages, and multiple game modes. Features daily puzzles, coins currency with power-up shop, 20 achievement badges, level goals, and retry mechanics. Includes global leaderboards and user profiles backed by Firebase.",
    demo: "https://bananamath-adventure.netlify.app/",
    features: [
      "Progressive levels & boss stages",
      "Normal/Quick Play/Practice modes",
      "Daily puzzles & coins currency",
      "20 achievement badges",
      "Global leaderboards",
      "Firebase Auth & Firestore integration",
      "Themed UI (Jungle/Ocean/Candy)",
      "Dark mode support",
      "Responsive design with smooth animations"
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Tailwind", "Firebase Auth", "Firestore"]
  },
  rainforest: {
    title: "RainForest Tea",
    category: "Desktop App",
    image: "images/rainforest.jpeg",
    description: "All-in-one tea management system for products, orders, inventory, suppliers, customers, and equipment maintenance with full CRUD operations. Features MySQL data model with validation, JavaFX UI with styled tables/forms, and email notifications for low stock and maintenance reminders.",
    features: [
      "Full CRUD operations",
      "Products, orders & inventory management",
      "Supplier & customer management",
      "Equipment maintenance tracking",
      "MySQL data validation",
      "Email notifications for low stock",
      "Maintenance reminders",
      "JavaFX styled UI with tables/forms"
    ],
    technologies: ["Java", "JavaFX", "MySQL", "CSS", "IntelliJ IDEA"]
  },
  quiz: {
    title: "Quiz App",
    category: "Android App",
    image: "images/quiz app.jpg",
    description: "Trivia app that fetches questions from a remote API and renders them in a clean Android UI. Features scoring/answer validation, end-of-quiz summary, and Firebase integration for authentication and score storage.",
    features: [
      "REST API integration",
      "Question fetching from remote API",
      "Scoring & answer validation",
      "End-of-quiz summary",
      "Firebase authentication",
      "Score storage",
      "Clean Android UI"
    ],
    technologies: ["Java", "REST APIs", "Firebase", "Android Studio"]
  }
};

// Function to open modal with project data
function openProjectModal(projectId) {
  const project = projectData[projectId];
  if (!project) return;
  
  projectModal.classList.remove('hidden');
  projectModal.classList.add('flex');

  const actionButtons = [
    project.demo ? `<a href="${project.demo}" target="_blank" class="px-4 py-2 text-sm font-semibold text-black bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-lg shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all inline-flex items-center gap-2">Live Demo <i class="fas fa-external-link-alt text-xs"></i></a>` : "",
    project.code ? `<a href="${project.code}" target="_blank" class="px-4 py-2 text-sm font-semibold text-cyan-400 border border-cyan-500/40 rounded-lg hover:bg-cyan-500/10 transition-all inline-flex items-center gap-2">Source Code <i class="fas fa-code text-xs"></i></a>` : ""
  ].filter(Boolean).join("");
  
  // Populate modal content
  const featuresList = project.features.map(feature => 
    `<li>${feature}</li>`
  ).join('');
  
  const techTags = project.technologies.map(tech => 
    `<span class="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg">${tech}</span>`
  ).join('');
  
  modalContent.innerHTML = `
    <div class="space-y-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-4xl font-bold text-cyan-400">${project.title}</h2>
        <span class="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm border border-cyan-500/30">${project.category}</span>
      </div>
      <div class="modal-image-container mb-6">
        <img src="${project.image}" alt="${project.title}" class="modal-image" />
        <div class="modal-image-overlay"></div>
      </div>
      <div class="space-y-4">
        <p class="text-gray-300 leading-relaxed">
          ${project.description}
        </p>
        <div>
          <h3 class="text-xl font-semibold text-cyan-400 mb-3">Key Features</h3>
          <ul class="list-disc list-inside space-y-2 text-gray-300">
            ${featuresList}
          </ul>
        </div>
        <div>
          <h3 class="text-xl font-semibold text-cyan-400 mb-3">Technologies Used</h3>
          <div class="flex flex-wrap gap-3">
            ${techTags}
          </div>
        </div>
        ${actionButtons ? `<div class="flex flex-wrap gap-3 pt-2">${actionButtons}</div>` : ""}
      </div>
    </div>
  `;
  
  document.body.style.overflow = 'hidden';
}

// Add click handlers to all project cards
projectCards.forEach(card => {
  card.addEventListener('click', (e) => {
    // Don't trigger if clicking on links
    if (e.target.tagName === 'A' || e.target.closest('a')) return;
    
    const projectId = card.getAttribute('data-project');
    if (projectId) {
      openProjectModal(projectId);
    }
  });
});

if (closeModal && projectModal) {
  closeModal.addEventListener('click', () => {
    projectModal.classList.add('hidden');
    projectModal.classList.remove('flex');
    document.body.style.overflow = 'auto';
  });
  
  // Close on outside click
  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      projectModal.classList.add('hidden');
      projectModal.classList.remove('flex');
      document.body.style.overflow = 'auto';
    }
  });
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !projectModal.classList.contains('hidden')) {
      projectModal.classList.add('hidden');
      projectModal.classList.remove('flex');
      document.body.style.overflow = 'auto';
    }
  });
}

// ========== LOADING SCREEN ==========
// Prevent scrolling during loading
document.body.style.overflow = 'hidden';

window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }, 1000);
  }
});

// ========== BACK TO TOP BUTTON ==========
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (backToTopBtn) {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible');
      backToTopBtn.classList.remove('opacity-0', 'invisible');
    } else {
      backToTopBtn.classList.remove('visible');
      backToTopBtn.classList.add('opacity-0', 'invisible');
    }
  }
});

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ========== CONTACT FORM INTEGRATION (EmailJS) ==========
// Initialize EmailJS (you'll need to get your public key from emailjs.com)
// Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
// Replace 'YOUR_SERVICE_ID' with your EmailJS service ID
// Replace 'YOUR_TEMPLATE_ID' with your EmailJS template ID

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  // Initialize EmailJS (uncomment and add your keys after setting up EmailJS account)
  // emailjs.init('YOUR_PUBLIC_KEY');
  
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Get form data
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
    const message = contactForm.querySelector('textarea').value;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
      // EmailJS integration (uncomment after setting up)
      /*
      await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
      });
      */
      
      // For now, show success message (replace with EmailJS code above)
      setTimeout(() => {
        submitBtn.textContent = 'Message Sent!';
        submitBtn.classList.add('bg-green-500');
        
        // Show success notification
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 2 seconds
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.classList.remove('bg-green-500');
        }, 2000);
      }, 1000);
      
    } catch (error) {
      console.error('Error sending email:', error);
      submitBtn.textContent = 'Error - Try Again';
      submitBtn.classList.add('bg-red-500');
      showNotification('Failed to send message. Please try again or contact me directly.', 'error');
      
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.classList.remove('bg-red-500');
      }, 3000);
    }
  });
}

// Notification function
function showNotification(message, type) {
  const notification = document.createElement('div');
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  notification.className = `fixed top-20 right-5 ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300`;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.remove('translate-x-full');
  }, 100);
  
  setTimeout(() => {
    notification.classList.add('translate-x-full');
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// ========== REVEAL ON SCROLL ==========
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.reveal-on-scroll').forEach(el => {
  revealObserver.observe(el);
});


// Add parallax effect to hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.getElementById('home');
  if (hero) {
    const heroContent = hero.querySelector('.relative.z-10');
    if (heroContent) {
      heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
      heroContent.style.opacity = 1 - scrolled / 500;
    }
  }
});

// ========== ANIMATED COUNTERS ==========
function animateCounter(element, target, duration = 2000) {
  if (typeof target === 'string') {
    // For text values, just set them directly with a fade-in effect
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    setTimeout(() => {
      element.textContent = target;
      element.style.transition = 'all 0.5s ease';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, 100);
    return;
  }
  
  const start = 0;
  const increment = target / (duration / 16); // 60fps
  let current = start;
  
  const updateCounter = () => {
    current += increment;
    if (current < target) {
      const displayValue = Math.floor(current);
      element.textContent = displayValue + '%';
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + '%';
    }
  };
  
  updateCounter();
}

// Observe stats for animation
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statElement = entry.target.querySelector('[data-target]');
      if (statElement && !statElement.classList.contains('animated')) {
        statElement.classList.add('animated');
        const target = statElement.getAttribute('data-target');
        if (target === 'Student' || target === 'AI') {
          animateCounter(statElement, target, 1500);
        } else {
          animateCounter(statElement, parseInt(target), 2000);
        }
      }
    }
  });
}, {
  threshold: 0.5
});

// Observe all stat items
document.querySelectorAll('.stat-item').forEach(stat => {
  statsObserver.observe(stat);
});

// ========== ACTIVE NAVIGATION LINK HIGHLIGHTING ==========
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function highlightActiveNav() {
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('text-cyan-400');
        link.classList.add('text-gray-400');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.remove('text-gray-400');
          link.classList.add('text-cyan-400');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightActiveNav);
highlightActiveNav(); // Initial call

