"use client"
import { useState } from "react"
import Slideshow from "./Slideshow"
import GalleryGrid from "./GalleryGrid"

export default function GalleryWrapper({ photos }) {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  return (
    <div>
      {/* Slideshow */}
      <Slideshow photos={photos} onOpenLightbox={setLightboxIndex} />

      {/* Grid */}
      <div className="p-6">
        <GalleryGrid
          photos={photos}
          lightboxIndex={lightboxIndex}
          setLightboxIndex={setLightboxIndex}
        />
      </div>
    </div>
  )
}
