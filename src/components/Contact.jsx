"use client"

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Contact Me</h2>
        <p className="text-lg text-gray-700 mb-8">
          Have a project or just want to say hi? I’d love to hear from you!
        </p>

        {/* Contact Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <a
            href="mailto:cedrabanal01@gmail.com"
            className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-full shadow-lg hover:bg-gray-800 transition"
          >
            Email Me
          </a>
          <a
            href="https://www.facebook.com/nat3tan"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-full shadow-lg hover:bg-gray-800 transition"
          >
            Facebook
          </a>
          <a
            href="https://www.instagram.com/nathanrabanal"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-full shadow-lg hover:bg-gray-800 transition"
          >
            Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
