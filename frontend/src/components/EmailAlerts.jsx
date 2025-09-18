"use client"

import { useState } from "react"
import { Mail } from "lucide-react"

export default function EmailAlerts() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Email submitted:", email)
    setEmail("")
  }

  return (
    <section className="py-16 bg-blue-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Mail className="h-12 w-12 text-white mx-auto mb-6" />
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Stay Connected</h2>
        <p className="text-xl text-blue-100 mb-8">Get the latest news and updates delivered to your inbox</p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white"
              required
            />
            <button
              type="submit"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold 
                         hover:bg-gray-100 transition-colors duration-200"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
