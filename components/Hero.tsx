'use client'

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { SplineScene } from "@/components/ui/splite"

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Connect scroll position to parallax and fade-out of content
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 500], [1, 0])
  const yContent = useTransform(scrollY, [0, 500], [0, -80])
  const ySpline = useTransform(scrollY, [0, 500], [0, 50])
  const scaleSpline = useTransform(scrollY, [0, 500], [1, 0.95])

  // Variants for staggered entrance animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] // Custom easeOutExpo
      }
    }
  }

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="min-h-screen w-full flex items-center justify-center bg-black overflow-hidden relative pt-20 px-4 md:px-8 lg:px-16"
    >
      {/* Hero container */}
      <div className="w-full max-w-7xl mx-auto z-10">
        <div className="w-full bg-transparent relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[650px] items-center">
            {/* Left Content Column */}
            <motion.div 
              style={{ opacity, y: yContent }}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 flex flex-col justify-center p-4 md:p-8 relative z-20"
            >
              <motion.h1 
                variants={itemVariants}
                className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]"
              >
                <span className="block text-white">Tehan Hewage</span>
                <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-500 bg-clip-text text-transparent animated-gradient">
                  Software Engineer
                </span>
              </motion.h1>

              <motion.p 
                variants={itemVariants}
                className="mt-8 text-lg md:text-xl text-zinc-400 max-w-xl leading-relaxed"
              >
                Software Engineering Student &bull; AI Enthusiast &bull; Problem Solver.
                I specialize in crafting high-fidelity user experiences and building robust, 
                intelligent application backends.
              </motion.p>

              <motion.div 
                variants={itemVariants}
                className="mt-10 flex flex-wrap gap-4 items-center"
              >
                <motion.a 
                  href="#portfolio" 
                  whileHover={{ scale: 1.03, boxShadow: "0 10px 30px rgba(6, 182, 212, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-cyan-500 text-black font-extrabold rounded-xl shadow-lg shadow-cyan-500/20"
                >
                  View My Work
                </motion.a>
                <motion.a 
                  href="#contact" 
                  whileHover={{ scale: 1.03, borderColor: "rgba(6, 182, 212, 0.5)", backgroundColor: "rgba(9, 9, 11, 0.6)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="px-8 py-4 border border-zinc-800 bg-zinc-950/30 text-zinc-350 font-semibold rounded-xl"
                >
                  Get In Touch
                </motion.a>
                <motion.a 
                  href="Curriculum Vitae.pdf" 
                  download 
                  whileHover={{ scale: 1.03, x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-4 text-zinc-400 hover:text-cyan-400 font-bold inline-flex items-center gap-2 group cursor-pointer"
                >
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Resume
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Right Interactive 3D Column */}
            <motion.div 
              style={{ y: ySpline, scale: scaleSpline }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block lg:col-span-5 relative lg:min-h-[600px] w-full overflow-hidden bg-transparent"
            >
              <div className="absolute inset-0 z-0">
                <SplineScene 
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                />
              </div>
              
              {/* Radial overlay to shade and anchor the 3D scene */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />
              
              {/* Fade masks */}
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent pointer-events-none hidden lg:block" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-700 pointer-events-none"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold">Scroll Down</span>
        <div className="w-6 h-10 border-2 border-zinc-800 rounded-full flex justify-center p-1">
          <div className="w-1.5 h-3 bg-cyan-400 rounded-full animate-bounce" />
        </div>
      </motion.div>
    </section>
  )
}
