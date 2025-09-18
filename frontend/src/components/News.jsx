"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from "lucide-react"

export default function News() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const newsItems = [
    {
      id: 1,
      title: "Travel + Leisure Co. Reports Strong Q4 2024 Results",
      excerpt:
        "Company delivers record-breaking performance across all business segments with significant growth in vacation ownership and travel services.",
      date: "March 15, 2024",
      category: "Earnings",
      image: "/corporate-business-meeting.png",
    },
    {
      id: 2,
      title: "New Sustainable Tourism Initiative Launched",
      excerpt:
        "Travel + Leisure Co. announces comprehensive environmental program to reduce carbon footprint across all properties and operations.",
      date: "March 10, 2024",
      category: "ESG",
      image: "/placeholder-luaug.png",
    },
    {
      id: 3,
      title: "Strategic Partnership with Leading Hotel Chain",
      excerpt:
        "Expanding global presence through innovative collaboration that will bring new destinations and experiences to our members.",
      date: "March 5, 2024",
      category: "Business",
      image: "/luxury-hotel-partnership.jpg",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % newsItems.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + newsItems.length) % newsItems.length)
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 fade-in-up">Latest News</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto fade-in-up">
            Stay updated with the latest developments, achievements, and initiatives from Travel + Leisure Co.
          </p>
        </div>

        {/* News Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {newsItems.map((item) => (
                <div key={item.id} className="w-full flex-shrink-0">
                  <div className="grid md:grid-cols-2 gap-0 bg-white">
                    {/* Image */}
                    <div className="relative h-64 md:h-96">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                      <div className="flex items-center text-gray-500 mb-4">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-sm">{item.date}</span>
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">{item.title}</h3>

                      <p className="text-gray-600 mb-6 leading-relaxed">{item.excerpt}</p>

                      <button className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group">
                        Read More
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 
                       rounded-full p-3 shadow-lg transition-all duration-200 z-10"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 
                       rounded-full p-3 shadow-lg transition-all duration-200 z-10"
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {newsItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
