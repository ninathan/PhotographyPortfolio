import "./globals.css"
import Navbar from "@/src/components/Navbar"
import Footer from "@/src/components/Footer"

export const metadata = {
  title: "Nathan's Photography Portfolio",
  description: "Showcasing my work with style.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
