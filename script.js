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

// Project card click handler
const projectCard = document.getElementById('project-card');
const projectModal = document.getElementById('project-modal');
const closeModal = document.getElementById('close-modal');
const modalContent = document.getElementById('modal-content');

if (projectCard && projectModal) {
  projectCard.addEventListener('click', (e) => {
    // Don't trigger if clicking on links
    if (e.target.tagName === 'A') return;
    
    projectModal.classList.remove('hidden');
    projectModal.classList.add('flex');
    
    // Populate modal content
    modalContent.innerHTML = `
      <div class="space-y-6">
        <h2 class="text-4xl font-bold text-cyan-400 mb-4">Featured Project</h2>
        <div class="modal-image-container mb-6">
          <img src="images/1.png" alt="Project Screenshot" class="modal-image" />
          <div class="modal-image-overlay"></div>
        </div>
        <div class="space-y-4">
          <p class="text-gray-300 leading-relaxed">
            A clean and user-friendly software application built with modern technologies. This project 
            demonstrates my passion for creating meaningful digital experiences, focusing on clean code, 
            intuitive design, and reliable functionality.
          </p>
          <div>
            <h3 class="text-xl font-semibold text-cyan-400 mb-3">Key Features</h3>
            <ul class="list-disc list-inside space-y-2 text-gray-300">
              <li>Clean and intuitive user interface</li>
              <li>User-friendly design and experience</li>
              <li>Reliable and efficient functionality</li>
              <li>Well-structured and maintainable code</li>
              <li>Modern software design principles</li>
            </ul>
          </div>
          <div>
            <h3 class="text-xl font-semibold text-cyan-400 mb-3">Technologies Used</h3>
            <div class="flex flex-wrap gap-3">
              <span class="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg">Java</span>
              <span class="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg">JavaScript</span>
              <span class="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg">HTML/CSS</span>
              <span class="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg">UI/UX Design</span>
              <span class="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg">SQL</span>
            </div>
          </div>
          <div class="flex gap-4 pt-4">
            <a href="#" class="px-6 py-2 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition-all">
              View Live Demo
            </a>
            <a href="#" class="px-6 py-2 border border-cyan-500 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-500/10 transition-all">
              View Source Code
            </a>
          </div>
        </div>
      </div>
    `;
    
    document.body.style.overflow = 'hidden';
  });
}

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

