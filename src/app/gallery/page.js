import fs from "fs"
import path from "path"
import GalleryWrapper from "../../components/GalleryWrapper"

// Server component (no "use client")
export default function GalleryPage() {
  const galleryDir = path.join(process.cwd(), "public/gallery")
  const files = fs.readdirSync(galleryDir)
  const photos = files.map((file) => `/gallery/${file}`)

  return <GalleryWrapper photos={photos} />
}
