"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"

export default function Slideshow({ photos, onOpenLightbox }) {
  const [current, setCurrent] = useState(1) // start from 1 because of cloned first slide
  const [transitioning, setTransitioning] = useState(true)
  const slideshowRef = useRef(null)

  // Clone slides: last + photos + first
  const slides = [photos[photos.length - 1], ...photos, photos[0]]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => prev + 1)
      setTransitioning(true)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Handle reset when reaching clone
  useEffect(() => {
    if (current === slides.length - 1) {
      const timeout = setTimeout(() => {
        setTransitioning(false)
        setCurrent(1)
      }, 700)
      return () => clearTimeout(timeout)
    }
    if (current === 0) {
      const timeout = setTimeout(() => {
        setTransitioning(false)
        setCurrent(slides.length - 2)
      }, 700)
      return () => clearTimeout(timeout)
    }
    setTransitioning(true)
  }, [current, slides.length])

  if (!photos || photos.length === 0) return null

  return (
    <div className="relative w-full h-[750px] md:h-[850px] overflow-hidden">
      {/* Slides container */}
      <div
        ref={slideshowRef}
        className={`flex h-full ${transitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((src, idx) => (
          <div
            key={idx}
            className="relative flex-shrink-0 w-full h-full cursor-pointer"
            onClick={() => onOpenLightbox((current - 1 + photos.length) % photos.length)}
          >
            <Image
              src={src}
              alt={`Slideshow photo ${idx}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Overlay Title */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
        <h1 className="text-4xl md:text-6xl text-white font-bold drop-shadow-lg">
          My Gallery
        </h1>
      </div>

      {/* Prev / Next */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl font-bold z-10"
        onClick={(e) => {
          e.stopPropagation()
          setCurrent((prev) => prev - 1)
        }}
      >
        ‹
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl font-bold z-10"
        onClick={(e) => {
          e.stopPropagation()
          setCurrent((prev) => prev + 1)
        }}
      >
        ›
      </button>
    </div>
  )
}
