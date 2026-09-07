import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

import virtualImages from 'virtual:design-images'
import staticDesignsList from '../data/designsList.json'

const DESIGN_IMAGES: string[] = (virtualImages && virtualImages.length > 0)
  ? virtualImages
  : (staticDesignsList as string[])

export function GraphicDesignPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Scroll progress listener
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      if (windowHeight > 0) {
        setScrollProgress((window.scrollY / windowHeight) * 100)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Keyboard navigation for lightbox (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return

      if (e.key === 'Escape') {
        setSelectedImageIndex(null)
      } else if (e.key === 'ArrowRight') {
        setSelectedImageIndex((prev) => (prev === null ? null : (prev + 1) % DESIGN_IMAGES.length))
      } else if (e.key === 'ArrowLeft') {
        setSelectedImageIndex((prev) => (prev === null ? null : (prev - 1 + DESIGN_IMAGES.length) % DESIGN_IMAGES.length))
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImageIndex])

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedImageIndex((prev) => (prev === null ? null : (prev + 1) % DESIGN_IMAGES.length))
  }

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedImageIndex((prev) => (prev === null ? null : (prev - 1 + DESIGN_IMAGES.length) % DESIGN_IMAGES.length))
  }

  return (
    <div className="bg-black text-white font-sans overflow-x-hidden min-h-screen relative selection:bg-cyan-500/30 selection:text-white">
      {/* Scroll Progress Bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Back to Top */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 bg-gradient-to-r from-cyan-500 to-cyan-600 text-black p-4 rounded-full shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-110 z-40 ${
          showBackToTop ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <i className="fas fa-arrow-up text-lg"></i>
      </button>

      {/* Header Navigation */}
      <header className="fixed top-0 w-full py-4 px-5 lg:px-20 bg-black/85 backdrop-blur-xl z-40 border-b border-cyan-500/15">
        <nav className="max-w-7xl mx-auto flex justify-between items-center h-10">
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/images/logo.png" alt="Tehan Hewage Logo" className="h-16 w-auto group-hover:opacity-85 transition-opacity" />
            <div className="hidden sm:flex flex-col">
              <span className="text-xs uppercase tracking-widest text-cyan-400 font-semibold">Graphic Designs</span>
              <span className="text-[11px] text-zinc-500">Tehan Hewage</span>
            </div>
          </Link>

          <div className="flex items-center gap-6">
            <Link 
              to="/" 
              className="text-zinc-400 hover:text-cyan-400 transition-colors text-sm font-medium flex items-center gap-2 group"
            >
              <i className="fas fa-arrow-left text-xs transition-transform group-hover:-translate-x-1"></i>
              Main Portfolio
            </Link>
            <a 
              href="/#contact" 
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 text-black text-xs font-bold shadow-md shadow-cyan-500/20 hover:scale-105 transition-all"
            >
              Contact Me
            </a>
          </div>
        </nav>
      </header>

      {/* Page Title & Intro */}
      <section className="pt-32 pb-12 px-5 lg:px-20 text-center relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4"
          >
            Visual Showcase
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
          >
            Graphic <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Designs</span>
          </motion.h1>
        </div>
      </section>

      {/* Image Gallery */}
      <main className="max-w-7xl mx-auto px-5 lg:px-20 pb-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DESIGN_IMAGES.map((imgSrc, index) => (
            <motion.div
              key={imgSrc}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              onClick={() => setSelectedImageIndex(index)}
              className="group relative rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-850 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-cyan-500/15"
            >
              <div className="w-full aspect-[4/3] overflow-hidden bg-zinc-900/50 flex items-center justify-center">
                <img 
                  src={imgSrc} 
                  alt={`Graphic design ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Hover overlay with expand icon */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                <div className="w-12 h-12 rounded-full bg-cyan-400 text-black flex items-center justify-center text-lg shadow-xl shadow-cyan-400/30 transform scale-75 group-hover:scale-100 transition-transform">
                  <i className="fas fa-expand"></i>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 px-5 border-t border-zinc-900 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img src="/images/logo.png" alt="Tehan Logo" className="h-14 w-auto" />
            <span className="text-zinc-500 text-sm font-medium">
              &copy; {new Date().getFullYear()} Tehan Hewage. Graphic Designs.
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

      {/* Fullscreen Clean Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImageIndex(null)}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-8"
          >
            {/* Top Toolbar */}
            <div className="absolute top-5 inset-x-5 lg:inset-x-20 flex justify-between items-center pointer-events-none z-50">
              <span className="text-zinc-400 text-sm font-medium px-3 py-1 rounded-full bg-black/60 border border-zinc-800 backdrop-blur-md pointer-events-auto">
                {selectedImageIndex + 1} / {DESIGN_IMAGES.length}
              </span>

              <button
                onClick={() => setSelectedImageIndex(null)}
                className="pointer-events-auto p-2.5 rounded-full bg-zinc-900/90 text-zinc-300 hover:text-cyan-400 hover:bg-zinc-800 border border-zinc-700 transition-colors"
                title="Close (Esc)"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Previous Button */}
            <button
              onClick={showPrev}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/70 hover:bg-zinc-900 text-zinc-300 hover:text-cyan-400 border border-zinc-800 hover:border-cyan-500/40 transition-all z-50"
              title="Previous (Left arrow)"
              aria-label="Previous image"
            >
              <i className="fas fa-chevron-left text-lg"></i>
            </button>

            {/* Next Button */}
            <button
              onClick={showNext}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/70 hover:bg-zinc-900 text-zinc-300 hover:text-cyan-400 border border-zinc-800 hover:border-cyan-500/40 transition-all z-50"
              title="Next (Right arrow)"
              aria-label="Next image"
            >
              <i className="fas fa-chevron-right text-lg"></i>
            </button>

            {/* Main Image */}
            <motion.div
              key={selectedImageIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-6xl max-h-[85vh] flex items-center justify-center p-2 select-none"
            >
              <img
                src={DESIGN_IMAGES[selectedImageIndex]}
                alt={`Design ${selectedImageIndex + 1}`}
                className="max-h-[82vh] max-w-full object-contain rounded-xl shadow-2xl border border-zinc-800"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default GraphicDesignPage
