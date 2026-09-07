export interface GraphicDesign {
  id: string
  title: string
  category: 'Branding' | 'Posters' | 'Social Media' | 'UI/UX Mockups' | 'Digital Art'
  image: string
  year: string
  clientOrContext: string
  description: string
  conceptStory: string
  tools: string[]
  colorPalette: { name: string; hex: string }[]
  tags: string[]
  featured?: boolean
}

export const GRAPHIC_CATEGORIES = [
  'All',
  'Branding',
  'Posters',
  'Social Media',
  'UI/UX Mockups',
  'Digital Art'
] as const

export type GraphicCategory = typeof GRAPHIC_CATEGORIES[number]

export const GRAPHIC_DESIGNS: GraphicDesign[] = [
  {
    id: 'nexus-branding',
    title: 'NEXUS AI Brand Identity',
    category: 'Branding',
    image: '/images/designs/nexus-branding.jpg',
    year: '2025',
    clientOrContext: 'Nexus Intelligent Technologies',
    description: 'Minimalist luxury corporate identity and stationery system engineered for an AI and quantum computing technology brand.',
    conceptStory: 'The design language embodies precision and intelligence. Utilizing a custom geometric interlocking "N" monogram embossed with vivid cyan foil over tactile matte obsidian cardstock, the system communicates security, innovation, and understated power across business collateral.',
    tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma'],
    colorPalette: [
      { name: 'Obsidian Black', hex: '#0a0d10' },
      { name: 'Cyan Neon', hex: '#00e5ff' },
      { name: 'Slate Gray', hex: '#2c3540' },
      { name: 'Pure White', hex: '#ffffff' }
    ],
    tags: ['Branding', 'Stationery', 'Logo Design', 'Luxury', 'Print Ready'],
    featured: true
  },
  {
    id: 'synapse-poster',
    title: 'SYNAPSE 2026 Festival Poster',
    category: 'Posters',
    image: '/images/designs/synapse-poster.jpg',
    year: '2026',
    clientOrContext: 'Electronic Music & Arts Collective',
    description: 'High-voltage editorial poster design featuring Swiss typography grids, glowing chromatic orbs, and cyberpunk data aesthetics.',
    conceptStory: 'SYNAPSE was conceived as an intersection of auditory discovery and synthetic intelligence. The design incorporates a central 3D wireframe vortex, glowing optical flares, and structured architectural typographic hierarchies inspired by modernist international typographic style.',
    tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Cinema 4D'],
    colorPalette: [
      { name: 'Cyber Cyan', hex: '#00f0ff' },
      { name: 'Ultra Violet', hex: '#7928ca' },
      { name: 'Deep Space', hex: '#080914' },
      { name: 'Electric Magenta', hex: '#ff007a' }
    ],
    tags: ['Poster', 'Typography', 'Cyberpunk', 'Event Design', 'Print'],
    featured: true
  },
  {
    id: 'velocity-streetwear',
    title: 'AERO-01 Sneaker Campaign',
    category: 'Social Media',
    image: '/images/designs/velocity-streetwear.jpg',
    year: '2025',
    clientOrContext: 'Velocity Systems Urban Exploration',
    description: 'Futuristic e-commerce social media promotional creative featuring dynamic floating product placement and bold technical typography.',
    conceptStory: 'Tailored for high-engagement Instagram and digital showcase feeds. The composition emphasizes aerodynamic velocity with speed streaks, subtle neon cyan edge-lighting, and architectural blueprint grid lines that highlight industrial sneaker ergonomics.',
    tools: ['Adobe Photoshop', 'Figma', 'Lightroom'],
    colorPalette: [
      { name: 'Carbon Black', hex: '#111315' },
      { name: 'Aero Cyan Glow', hex: '#00f7ff' },
      { name: 'Industrial Gray', hex: '#71767b' },
      { name: 'Ghost White', hex: '#f0f4f8' }
    ],
    tags: ['Social Media', 'Ad Campaign', 'Streetwear', 'Commercial', 'Digital Art'],
    featured: true
  },
  {
    id: 'crypto-dashboard',
    title: 'Crypto & Wealth Mobile Experience',
    category: 'UI/UX Mockups',
    image: '/images/designs/crypto-dashboard.jpg',
    year: '2025',
    clientOrContext: 'Behance Featured Concept',
    description: 'High-fidelity dark glassmorphic mobile UI mockup presenting real-time asset charts, biometric auth, and portfolio management.',
    conceptStory: 'Designed to elevate financial visualization with maximum clarity. Featuring luminous SVG line gradients, biometric feedback rings, and layered dark glassmorphism surfaces designed to enhance data digestion and reduce user cognitive strain.',
    tools: ['Figma', 'Adobe Photoshop', 'Spline 3D'],
    colorPalette: [
      { name: 'Onyx Surface', hex: '#0b0e14' },
      { name: 'Mint Bullish', hex: '#00e699' },
      { name: 'Cyan Glow', hex: '#00c2ff' },
      { name: 'Deep Amethyst', hex: '#1e1435' }
    ],
    tags: ['UI/UX', 'Mobile App', 'Fintech', 'Glassmorphism', 'Product Design'],
    featured: true
  },
  {
    id: 'creative-horizon',
    title: 'Creative Horizon 3D Typo Art',
    category: 'Digital Art',
    image: '/images/designs/creative-horizon.jpg',
    year: '2026',
    clientOrContext: 'Visual Arts Exhibition & Cover Art',
    description: 'Liquid chrome experimental lettering art with iridescent surface refractions and floating glass particles on cracked obsidian.',
    conceptStory: 'An exploration in digital tactile physics and lettering form. The fluid molten chrome letters are illuminated by multi-point specular lights, casting prismatic reflections onto floating glass spheres and cracked black volcanic stone.',
    tools: ['Blender', 'Adobe Photoshop', 'Procreate'],
    colorPalette: [
      { name: 'Liquid Chrome', hex: '#b0c4de' },
      { name: 'Prismatic Violet', hex: '#9932cc' },
      { name: 'Reflective Cyan', hex: '#00ced1' },
      { name: 'Void Black', hex: '#05070a' }
    ],
    tags: ['3D Art', 'Typography', 'Lettering', 'Chrome', 'Album Art'],
    featured: true
  },
  {
    id: 'portfolio-branding-banner',
    title: 'Tehan Hewage Brand Banner & Social Kit',
    category: 'Branding',
    image: '/images/designs/portfolio-banner.png',
    year: '2025',
    clientOrContext: 'Personal Brand & Social Presence',
    description: 'Panoramic personal branding banner and hero graphic showcasing personal brand positioning, typography, and dark aurora color scheme.',
    conceptStory: 'Created to maintain consistent visual identity across GitHub, LinkedIn, Twitter, and personal portfolio headers. Balances clean software engineering focus with an artistic visual sensibility.',
    tools: ['Adobe Photoshop', 'Figma', 'Illustrator'],
    colorPalette: [
      { name: 'Background Black', hex: '#000000' },
      { name: 'Teal Cyan', hex: '#06b6d4' },
      { name: 'Emerald Flare', hex: '#10b981' },
      { name: 'Zinc Slate', hex: '#71717a' }
    ],
    tags: ['Personal Brand', 'Banner', 'Social Kit', 'Vector'],
    featured: false
  }
]

export const DESIGN_TOOLS_DATA = [
  { name: 'Adobe Photoshop', icon: 'fas fa-image', level: 'Advanced', description: 'Photo manipulation, digital posters, social media banners, retouching' },
  { name: 'Adobe Illustrator', icon: 'fas fa-vector-square', level: 'Advanced', description: 'Vector logos, brand identity systems, typography, iconography' },
  { name: 'Figma', icon: 'fab fa-figma', level: 'Master', description: 'UI/UX mockups, wireframing, design systems, design prototypes' },
  { name: 'Canva', icon: 'fas fa-palette', level: 'Proficient', description: 'Rapid social creative turnaround, marketing collateral, pitch decks' },
  { name: 'Blender & 3D', icon: 'fas fa-cube', level: 'Intermediate', description: '3D typography, abstract visuals, product packaging mockups' },
  { name: 'Lightroom', icon: 'fas fa-sliders', level: 'Proficient', description: 'Color grading, lighting balancing, moody atmospheric adjustments' }
]

export const DESIGN_PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery & Moodboarding',
    description: 'Uncovering brand personality, target audience emotions, visual competitors, and compiling aesthetic palettes.'
  },
  {
    step: '02',
    title: 'Layout & Typography',
    description: 'Establishing strong grid hierarchies, font pairings, visual balance, and high-impact focal points.'
  },
  {
    step: '03',
    title: 'Visual Craft & Polish',
    description: 'Infusing color harmony, lighting, micro-textures, shadows, and subtle glassmorphic or neon accents.'
  },
  {
    step: '04',
    title: 'Deliver & Scale',
    description: 'Exporting optimized web & high-DPI print assets, design systems, and responsive variants.'
  }
]
