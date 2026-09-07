import fs from "fs"
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, Plugin } from "vite"

function designImagesPlugin(): Plugin {
  const virtualModuleId = 'virtual:design-images'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  const getDesignImages = () => {
    const dir = path.resolve(__dirname, 'public/images/designs')
    if (!fs.existsSync(dir)) return []
    const files = fs.readdirSync(dir).filter((f) => /\.(png|jpg|jpeg|webp|svg)$/i.test(f))
    // Return web-accessible paths with proper URL encoding
    return files.map((f) => `/images/designs/${encodeURIComponent(f)}`)
  }

  const syncJsonFile = () => {
    try {
      const images = getDesignImages()
      const jsonPath = path.resolve(__dirname, 'src/data/designsList.json')
      fs.mkdirSync(path.dirname(jsonPath), { recursive: true })
      fs.writeFileSync(jsonPath, JSON.stringify(images, null, 2), 'utf-8')
    } catch (err) {
      console.error('Failed to sync designsList.json:', err)
    }
  }

  return {
    name: 'design-images-plugin',
    buildStart() {
      syncJsonFile()
    },
    configureServer(server) {
      syncJsonFile()
      const designsDir = path.resolve(__dirname, 'public/images/designs')
      server.watcher.add(designsDir)
      server.watcher.on('all', (_event, filePath) => {
        if (filePath.replace(/\\/g, '/').includes('public/images/designs')) {
          syncJsonFile()
          const mod = server.moduleGraph.getModuleById(resolvedVirtualModuleId)
          if (mod) {
            server.moduleGraph.invalidateModule(mod)
          }
          server.ws.send({ type: 'full-reload' })
        }
      })
    },
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id: string) {
      if (id === resolvedVirtualModuleId) {
        const images = getDesignImages()
        return `export default ${JSON.stringify(images)};`
      }
    }
  }
}

export default defineConfig({
  plugins: [react(), designImagesPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
})
