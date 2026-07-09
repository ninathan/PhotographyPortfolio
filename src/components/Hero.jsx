"use client"
import Link from "next/link"
import { ChevronDoubleDownIcon } from "@heroicons/react/24/outline"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gray-900 text-white">
      
      {/* Hero Section */}
      <div className="text-center max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Photography and short-form video, all in one portfolio.
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          I capture still moments, quick edits, and vertical reels that are built to stand out on mobile.
        </p>

        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/gallery"
            className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-full shadow-lg hover:bg-gray-200 transition"
          >
            View Photo Gallery
          </Link>
          <Link 
            href="#videos"
            className="px-6 py-3 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition"
          >
            Watch Reels
          </Link>
        </div>

        {/* Bouncing Down Arrow */}
        <div className="mt-12 flex justify-center">
           <Link href="#about" scroll={true}>
          <ChevronDoubleDownIcon 
            className="w-10 h-10 text-white animate-bounce"
          />
          </Link>
        </div>
      </div>
      
    </main>
  )
}
