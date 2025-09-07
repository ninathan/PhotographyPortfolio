// src/components/Navbar.jsx
"use client"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed w-full z-50 transition-colors duration-300 ${
        scrolled ? "bg-gray-900 bg-opacity-90 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/">
          <span className="text-white font-bold text-xl cursor-pointer">
            Nathan's Portfolio
          </span>
        </Link>

        <div className="space-x-6">
          <Link href="/#about" className="text-white hover:text-gray-300">
            About
          </Link>
          <Link href="/#equipment" className="text-white hover:text-gray-300">
            Equipment
          </Link>
          <Link href="/gallery" className="text-white hover:text-gray-300">
            Gallery
          </Link>
          <Link href="/#contact" className="text-white hover:text-gray-300">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  )
}
