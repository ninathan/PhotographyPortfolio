"use client"
import Image from "next/image"
import { useEffect } from "react"

export default function GalleryGrid({ photos, lightboxIndex, setLightboxIndex }) {
  const currentIndex = lightboxIndex

  const closeLightbox = () => setLightboxIndex(null)
  const showPrev = () => setLightboxIndex((prev) => (prev - 1 + photos.length) % photos.length)
  const showNext = () => setLightboxIndex((prev) => (prev + 1) % photos.length)

  // Keyboard navigation
  useEffect(() => {
    if (currentIndex === null) return

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowLeft") showPrev()
      if (e.key === "ArrowRight") showNext()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentIndex])

  return (
    <div>
      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((src, idx) => (
          <div
            key={idx}
            className="relative w-full h-64 cursor-pointer overflow-hidden rounded-lg shadow-lg hover:scale-105 hover:brightness-110 transition-transform duration-300 ease-in-out"
            onClick={() => setLightboxIndex(idx)}
          >
            <Image
              src={src}
              alt={`Photo ${idx + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {currentIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 transition-opacity duration-500 ease-in-out"
          onClick={closeLightbox}
        >
          <div className="relative w-[90%] h-[90%] transform transition-transform duration-500 ease-in-out scale-100">
            <Image
              src={photos[currentIndex]}
              alt={`Photo ${currentIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>

          {/* Controls */}
          <button
            className="absolute top-6 right-6 text-white text-3xl font-bold"
            onClick={(e) => {
              e.stopPropagation()
              closeLightbox()
            }}
          >
            ✕
          </button>
          <button
            className="absolute left-6 text-white text-5xl font-bold"
            onClick={(e) => {
              e.stopPropagation()
              showPrev()
            }}
          >
            ‹
          </button>
          <button
            className="absolute right-6 text-white text-5xl font-bold"
            onClick={(e) => {
              e.stopPropagation()
              showNext()
            }}
          >
            ›
          </button>
        </div>
      )}
    </div>
  )
}
