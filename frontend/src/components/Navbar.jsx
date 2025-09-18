"use client"

import { useState, useEffect } from "react"
import { Search, Menu, X } from "lucide-react"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = ["Our Company", "Our Brands", "Investors", "Careers", "News", "ESG"]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src="/travel-leisure-co-logo.jpg" alt="Travel + Leisure Co." className="h-8 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-200"
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button
              className={`p-2 rounded-md transition-colors duration-200 ${
                isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-200"
              }`}
            >
              <Search className="h-5 w-5" />
            </button>

            <button
              className={`md:hidden p-2 rounded-md transition-colors duration-200 ${
                isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-200"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-lg mt-2 py-2">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
