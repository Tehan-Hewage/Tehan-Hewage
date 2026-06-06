import React, { useState, useEffect, useRef } from 'react'
import { Hero } from '@/components/Hero'

// Type definition for projects
interface Project {
  id: string
  title: string
  category: string
  image: string
  description: string
  demo?: string
  code?: string
  features: string[]
  technologies: string[]
}

const PROJECTS_DATA: Project[] = [
  {
    id: "gexacanvas",
    title: "GexaCanvas AI",
    category: "Full Stack AI",
    image: "images/gexacanvas-logo.png",
    description: "Full-stack AI chat and image-generation application with Supabase authentication, saved conversations, pinned chats, Gemini replies, Hugging Face image generation, markdown responses, and a premium dark Gexa Aurora interface.",
    code: "https://github.com/Tehan-Hewage/GexaCanvas-AI",
    features: [
      "Supabase authentication for signup and login",
      "Saved conversations persisted with Supabase",
      "Pinned and deleted chat management",
      "Gemini AI replies with markdown rendering",
      "Text-to-image generation through Hugging Face",
      "Generated image storage with Supabase Storage",
      "Dark glassmorphism Gexa Aurora UI",
      "Responsive layout for mobile, tablet, and desktop"
    ],
    technologies: ["React", "Vite", "Node.js", "Express", "Supabase", "Gemini", "Hugging Face"]
  },
  {
    id: "linknook",
    title: "LinkNook",
    category: "Live SaaS",
    image: "images/linknook-logo.png",
    description: "Live Linktree-style mini-profile and link-page builder with customizable public pages, themes, dashboard controls, design editor, hero layouts, wallpapers, text controls, button styles, color controls, and preview cards.",
    demo: "https://linknook.online/",
    features: [
      "Custom public mini-profile pages",
      "Theme, layout, wallpaper, and hero controls",
      "Design editor with text and color controls",
      "Button style customization",
      "Dashboard for managing public pages",
      "Preview cards for faster editing",
      "Responsive modern UI",
      "Supabase-backed app architecture"
    ],
    technologies: ["React", "Next.js", "Tailwind CSS", "Supabase", "UI/UX"]
  },
  {
    id: "whatsappbot",
    title: "Multi-Agent WhatsApp Bot Assistant",
    category: "Ongoing Project",
    image: "images/whatsapp-bot.svg",
    description: "Ongoing research and development project for SLIIT City University to automate student support through a multi-agent WhatsApp assistant. The system detects user intent and routes each query to the most relevant specialist agent.",
    features: [
      "Purpose classification and routing to expert agents",
      "Specialist support for Finance, Academic, and Student Affairs",
      "English-only question and answer knowledge base",
      "Semantic retrieval with a lightweight NLP pipeline",
      "WhatsApp Cloud API integration (developer test mode)",
      "Minimal admin tools for Q&A updates and log review",
      "Evaluation on routing accuracy, answer accuracy, latency, and student satisfaction",
      "Target metrics: 85%+ routing accuracy, 90%+ answer accuracy, under 2s average response time"
    ],
    technologies: ["Node.js", "Express", "Python", "NLP", "Firebase Firestore", "WhatsApp Cloud API", "Postman"]
  },
  {
    id: "gsmarena",
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
  {
    id: "opsel",
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
  {
    id: "bananamath",
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
  {
    id: "rainforest",
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
  {
    id: "quiz",
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
]

export function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [contactStatus, setContactStatus] = useState({ text: 'Send Message', sent: false, error: false })

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cursorTrailRef = useRef<HTMLDivElement>(null)

  // Particle System & Mouse Cursor Tracking
  useEffect(() => {
    // 1. Cursor Trail Follower
    let mouseX = 0
    let mouseY = 0
    let trailX = 0
    let trailY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)

    const animateTrail = () => {
      trailX += (mouseX - trailX) * 0.1
      trailY += (mouseY - trailY) * 0.1
      if (cursorTrailRef.current) {
        cursorTrailRef.current.style.left = `${trailX}px`
        cursorTrailRef.current.style.top = `${trailY}px`
      }
      requestAnimationFrame(animateTrail)
    }
    const trailAnimId = requestAnimationFrame(animateTrail)

    // 2. Canvas Particles
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        const resizeCanvas = () => {
          canvas.width = window.innerWidth
          canvas.height = window.innerHeight
        }
        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        const particles: any[] = []
        const particleCount = 50

        class Particle {
          x: number
          y: number
          size: number
          speedX: number
          speedY: number
          opacity: number

          constructor() {
            this.x = Math.random() * canvas!.width
            this.y = Math.random() * canvas!.height
            this.size = Math.random() * 2 + 1
            this.speedX = Math.random() * 0.5 - 0.25
            this.speedY = Math.random() * 0.5 - 0.25
            this.opacity = Math.random() * 0.5 + 0.2
          }

          update() {
            this.x += this.speedX
            this.y += this.speedY

            if (this.x > canvas!.width) this.x = 0
            if (this.x < 0) this.x = canvas!.width
            if (this.y > canvas!.height) this.y = 0
            if (this.y < 0) this.y = canvas!.height
          }

          draw() {
            ctx!.beginPath()
            ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2)
            ctx!.fillStyle = `rgba(6, 182, 212, ${this.opacity})`
            ctx!.fill()
          }
        }

        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle())
        }

        const animateParticles = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height)

          particles.forEach(p => {
            p.update()
            p.draw()
          })

          // Draw connecting lines
          for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
              const dx = particles[i].x - particles[j].x
              const dy = particles[i].y - particles[j].y
              const distance = Math.sqrt(dx * dx + dy * dy)

              if (distance < 120) {
                ctx.beginPath()
                ctx.strokeStyle = `rgba(6, 182, 212, ${0.1 * (1 - distance / 120)})`
                ctx.lineWidth = 0.5
                ctx.moveTo(particles[i].x, particles[i].y)
                ctx.lineTo(particles[j].x, particles[j].y)
                ctx.stroke()
              }
            }
          }
          requestAnimationFrame(animateParticles)
        }
        animateParticles()
      }
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(trailAnimId)
    }
  }, [])

  // Scroll logic (Scroll progress & Section highlights & Back-to-top show)
  useEffect(() => {
    const handleScroll = () => {
      // 1. Back to top button
      if (window.scrollY > 300) {
        setShowBackToTop(true)
      } else {
        setShowBackToTop(false)
      }

      // 2. Scroll progress bar
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      if (windowHeight > 0) {
        setScrollProgress((window.scrollY / windowHeight) * 100)
      }

      // 3. Highlight navigation link
      const scrollY = window.scrollY
      const sections = ['home', 'about', 'skills', 'portfolio', 'contact']
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId)
        if (el) {
          const top = el.offsetTop - 120
          const height = el.offsetHeight
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Modal key hook for ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setContactStatus({ text: 'Sending...', sent: false, error: false })

    // Simulate sending email
    setTimeout(() => {
      setContactStatus({ text: 'Message Sent!', sent: true, error: false })
      const form = e.target as HTMLFormElement
      form.reset()

      setTimeout(() => {
        setContactStatus({ text: 'Send Message', sent: false, error: false })
      }, 3000)
    }, 1200)
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <div className="bg-black text-white font-sans overflow-x-hidden min-h-screen relative selection:bg-cyan-500/30 selection:text-white">
      {/* Scroll Progress Bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Particle Canvas */}
      <canvas id="particles-canvas" ref={canvasRef} />

      {/* Interactive Cursor Trail */}
      <div id="cursor-trail" ref={cursorTrailRef} />

      {/* Back to Top */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 bg-gradient-to-r from-cyan-500 to-cyan-600 text-black p-4 rounded-full shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-110 z-50 ${
          showBackToTop ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
        }`}
      >
        <i className="fas fa-arrow-up text-lg"></i>
      </button>

      {/* Header */}
      <header className="fixed top-0 w-full py-4 px-5 lg:px-20 bg-black/80 backdrop-blur-lg z-50 border-b border-cyan-500/10">
        <nav className="max-w-7xl mx-auto flex justify-between items-center h-10">
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home') }} className="flex items-center h-full">
            <img src="images/logo.png" alt="Tehan Hewage Logo" className="h-20 w-auto hover:opacity-80 transition-opacity" />
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-8 list-none">
            {['home', 'about', 'skills', 'portfolio', 'contact'].map(section => (
              <li key={section}>
                <a 
                  href={`#${section}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection(section) }}
                  className={`nav-link text-sm capitalize font-medium transition-colors ${
                    activeSection === section ? 'text-cyan-400 font-semibold' : 'text-zinc-400 hover:text-cyan-400'
                  }`}
                >
                  {section}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Nav Button */}
          <button 
            className="md:hidden text-cyan-400 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Dropdown Menu */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-black/95 border-b border-cyan-500/20 transition-all duration-300 ${
          mobileMenuOpen ? 'block opacity-100' : 'hidden opacity-0'
        }`}>
          <ul className="flex flex-col p-5 gap-4">
            {['home', 'about', 'skills', 'portfolio', 'contact'].map(section => (
              <li key={section}>
                <a 
                  href={`#${section}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection(section) }}
                  className={`text-base capitalize transition-colors ${
                    activeSection === section ? 'text-cyan-400 font-semibold' : 'text-zinc-400 hover:text-cyan-400'
                  }`}
                >
                  {section}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* Redesigned 3D Spline Scene Hero Section */}
      <Hero />

      {/* About Section */}
      <section id="about" className="py-24 px-5 lg:px-20 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm uppercase tracking-widest font-semibold">About Me</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Who I Am
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-zinc-300 leading-relaxed">
                I'm <span className="text-cyan-400 font-semibold">Tehan Hewage</span>, a Software Engineering student passionate about creating smooth and meaningful digital experiences. I enjoy learning how software works, experimenting with different tools, and continuously improving my thinking and problem-solving skills.
              </p>
              <p className="text-lg text-zinc-300 leading-relaxed">
                I have a strong interest in <span className="text-cyan-400 font-semibold">Artificial Intelligence</span> and love exploring how AI can be used to build smarter, more helpful applications. My focus is on writing clean code, understanding concepts properly, and always staying curious.
              </p>
              <div className="flex gap-6 pt-4">
                <div className="text-center stat-item group">
                  <div className="text-3xl font-extrabold text-cyan-400">Student</div>
                  <div className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">Software Engineering</div>
                </div>
                <div className="text-center stat-item group">
                  <div className="text-3xl font-extrabold text-cyan-400">AI</div>
                  <div className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">Enthusiast</div>
                </div>
                <div className="text-center stat-item group">
                  <div className="text-3xl font-extrabold text-cyan-400">100%</div>
                  <div className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">Dedicated</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-2xl blur-xl animate-pulse-slow" />
              <div className="relative bg-gradient-to-br from-zinc-950 to-black border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-500/40 transition-all duration-300">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center border border-cyan-500/20">
                      <i className="fas fa-robot text-cyan-400 text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">AI Enthusiast</h3>
                      <p className="text-sm text-zinc-400">Exploring intelligent applications</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center border border-cyan-500/20">
                      <i className="fas fa-laptop-code text-cyan-400 text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Software Designer</h3>
                      <p className="text-sm text-zinc-400">Building clean, user-friendly software</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center border border-cyan-500/20">
                      <i className="fas fa-bullseye text-cyan-400 text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Continuous Learner</h3>
                      <p className="text-sm text-zinc-400">Always improving and exploring</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-5 lg:px-20 relative bg-gradient-to-b from-transparent via-cyan-950/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm uppercase tracking-widest font-semibold">Services</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              What I Do
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="service-card group">
              <div className="service-icon">
                <i className="fas fa-code text-3xl text-cyan-400"></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 mt-6">Web Development</h3>
              <p className="text-zinc-400 leading-relaxed">
                Building responsive and interactive web applications using modern technologies like HTML, CSS, JavaScript, and frameworks.
              </p>
            </div>
            
            <div className="service-card group">
              <div className="service-icon">
                <i className="fas fa-mobile-alt text-3xl text-cyan-400"></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 mt-6">Mobile Development</h3>
              <p className="text-zinc-400 leading-relaxed">
                Creating native Android applications with clean UI/UX, API integration, and Firebase backend services.
              </p>
            </div>
            
            <div className="service-card group">
              <div className="service-icon">
                <i className="fas fa-robot text-3xl text-cyan-400"></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 mt-6">AI Integration</h3>
              <p className="text-zinc-400 leading-relaxed">
                Exploring and implementing AI solutions to create smarter, more intuitive applications and user experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-5 lg:px-20 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm uppercase tracking-widest font-semibold">My Skills</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Technologies & Tools
            </h2>
          </div>

          {/* Technical Skills */}
          <div className="mb-16">
            <h3 className="text-xl font-bold text-cyan-400 mb-8 text-center uppercase tracking-wider">Technical Skills</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                { name: 'Java', icon: 'fab fa-java' },
                { name: 'Python', icon: 'fab fa-python' },
                { name: 'JavaScript', icon: 'fab fa-js-square' },
                { name: 'C++', icon: 'fas fa-code' },
                { name: 'C#', icon: 'fas fa-hashtag' },
                { name: 'HTML', icon: 'fab fa-html5' },
                { name: 'CSS', icon: 'fab fa-css3-alt' },
                { name: 'React', icon: 'fab fa-react' },
                { name: 'Vite', icon: 'fas fa-bolt' },
                { name: 'Node.js', icon: 'fab fa-node-js' },
                { name: 'Express', icon: 'fas fa-server' },
                { name: 'Supabase', icon: 'fas fa-database' },
                { name: 'Gemini AI', icon: 'fas fa-wand-magic-sparkles' },
                { name: 'AI Image APIs', icon: 'fas fa-image' },
                { name: 'Android Studio', icon: 'fab fa-android' },
                { name: 'SQL', icon: 'fas fa-database' },
                { name: 'Firebase', icon: 'fas fa-fire' }
              ].map(skill => (
                <div key={skill.name} className="skill-card group">
                  <i className={`${skill.icon} text-4xl mb-3 text-cyan-400`}></i>
                  <div className="text-xs font-semibold text-zinc-300 tracking-wide">{skill.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Soft Skills */}
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-cyan-400 mb-8 text-center uppercase tracking-wider">Tools & Practices</h3>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { name: 'Agile', icon: 'fas fa-project-diagram' },
                  { name: 'SDLC', icon: 'fas fa-sync-alt' },
                  { name: 'GitHub', icon: 'fab fa-github' }
                ].map(tool => (
                  <div key={tool.name} className="skill-card group">
                    <i className={`${tool.icon} text-4xl mb-3 text-cyan-400`}></i>
                    <div className="text-xs font-semibold text-zinc-300 tracking-wide">{tool.name}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-cyan-400 mb-8 text-center uppercase tracking-wider">Soft Skills</h3>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { name: 'Problem Solving', icon: 'fas fa-puzzle-piece' },
                  { name: 'Logical Thinking', icon: 'fas fa-brain' },
                  { name: 'Communication', icon: 'fas fa-comments' },
                  { name: 'Collaboration', icon: 'fas fa-users' }
                ].map(soft => (
                  <div key={soft.name} className="skill-card group">
                    <i className={`${soft.icon} text-3xl mb-3 text-cyan-400`}></i>
                    <div className="text-xs font-semibold text-zinc-300 tracking-wide">{soft.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Projects Section */}
      <section id="portfolio" className="py-24 px-5 lg:px-20 relative bg-gradient-to-b from-transparent via-cyan-950/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm uppercase tracking-widest font-semibold">Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              My Projects
            </h2>
            <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">
              Check out my latest work and click on any card to see project specifications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {PROJECTS_DATA.map(project => (
              <div 
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="project-card-modern group cursor-pointer"
              >
                <div className="project-image-container">
                  <div className="image-wrapper">
                    <img src={project.image} alt={project.title} className="project-image-main" />
                    <div className="image-overlay"></div>
                    <div className="neon-border"></div>
                  </div>
                  <div className="floating-badge">
                    <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider">{project.category}</span>
                  </div>
                </div>
                <div className="project-info-modern">
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <h3 className="text-2xl font-bold text-cyan-400 leading-tight">{project.title}</h3>
                  </div>
                  <p className="text-zinc-350 mb-6 leading-relaxed text-sm">
                    {project.description.length > 130 ? `${project.description.slice(0, 130)}...` : project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.technologies.slice(0, 4).map(tech => (
                      <span key={tech} className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-cyan-400 rounded text-xs">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-5 lg:px-20 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm uppercase tracking-widest font-semibold">Get In Touch</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Contact Me
            </h2>
          </div>

          <div className="bg-gradient-to-br from-zinc-950 to-black border border-cyan-500/20 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent pointer-events-none" />
            
            <form onSubmit={handleContactSubmit} className="space-y-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-zinc-400 mb-2">Name</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-black border border-zinc-850 focus:border-cyan-500/60 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-zinc-400 mb-2">Email</label>
                  <input 
                    type="email" 
                    required
                    className="w-full bg-black border border-zinc-850 focus:border-cyan-500/60 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-400 mb-2">Subject</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-black border border-zinc-850 focus:border-cyan-500/60 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none transition-colors"
                  placeholder="Inquiry about software services"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-400 mb-2">Message</label>
                <textarea 
                  rows={5}
                  required
                  className="w-full bg-black border border-zinc-850 focus:border-cyan-500/60 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none transition-colors resize-none"
                  placeholder="Hey Tehan, I would love to collaborate..."
                />
              </div>

              <button 
                type="submit"
                className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${
                  contactStatus.sent 
                    ? 'bg-green-500 text-white cursor-default' 
                    : 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-black hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-[1.01]'
                }`}
              >
                {contactStatus.text}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-5 border-t border-zinc-900 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img src="images/logo.png" alt="Tehan Logo" className="h-14 w-auto" />
            <span className="text-zinc-500 text-sm font-medium">
              &copy; {new Date().getFullYear()} Tehan Hewage. All rights reserved.
            </span>
          </div>

          <div className="flex gap-4">
            <a href="https://www.linkedin.com/in/tehan-hewage-677563373" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in text-lg"></i>
            </a>
            <a href="https://instagram.com/_.tehnz._/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
              <i className="fab fa-instagram text-lg"></i>
            </a>
            <a href="https://github.com/Tehan-Hewage" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
              <i className="fab fa-github text-lg"></i>
            </a>
            <a href="https://www.facebook.com/tehan.hewage/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
              <i className="fab fa-facebook-f text-lg"></i>
            </a>
          </div>
        </div>
      </footer>

      {/* Project Details Modal Popup */}
      {selectedProject && (
        <div 
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-5 animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-zinc-950 to-black border border-cyan-500/20 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
          >
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-cyan-400 transition-colors z-10 bg-black/50 rounded-full p-2 hover:bg-black/70 border border-zinc-800"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="p-6 md:p-10">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <h2 className="text-3xl md:text-4xl font-extrabold text-cyan-400 leading-tight">{selectedProject.title}</h2>
                <span className="px-4 py-1.5 bg-cyan-500/10 text-cyan-400 rounded-full text-xs font-bold border border-cyan-500/20 tracking-wider uppercase">
                  {selectedProject.category}
                </span>
              </div>

              <div className="modal-image-container mb-8">
                <img src={selectedProject.image} alt={selectedProject.title} className="modal-image" />
                <div className="modal-image-overlay" />
              </div>

              <div className="space-y-6">
                <p className="text-zinc-300 leading-relaxed text-base">
                  {selectedProject.description}
                </p>

                <div>
                  <h3 className="text-lg font-bold text-cyan-400 mb-3 uppercase tracking-wider">Key Features</h3>
                  <ul className="list-disc list-inside space-y-2 text-zinc-300 pl-2">
                    {selectedProject.features.map((feature, idx) => (
                      <li key={idx} className="leading-relaxed">{feature}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-cyan-400 mb-3 uppercase tracking-wider">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2.5">
                    {selectedProject.technologies.map(tech => (
                      <span key={tech} className="px-3.5 py-1.5 bg-zinc-900 border border-zinc-850 text-zinc-350 rounded-lg text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4 border-t border-zinc-900">
                  {selectedProject.demo && (
                    <a 
                      href={selectedProject.demo} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-6 py-3 text-sm font-bold text-black bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-xl shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/30 transition-all flex items-center gap-2"
                    >
                      Live Demo <i className="fas fa-external-link-alt text-xs" />
                    </a>
                  )}
                  {selectedProject.code && (
                    <a 
                      href={selectedProject.code} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-6 py-3 text-sm font-bold text-cyan-400 border border-cyan-500/20 bg-cyan-500/5 rounded-xl hover:bg-cyan-500/10 transition-all flex items-center gap-2"
                    >
                      Source Code <i className="fas fa-code text-xs" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
