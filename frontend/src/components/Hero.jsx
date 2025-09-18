"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause } from "lucide-react"

export default function Hero() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showFallback, setShowFallback] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isVideoLoaded) {
        setShowFallback(true)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [isVideoLoaded])

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        {!showFallback ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={() => setIsVideoLoaded(true)}
            onError={() => setShowFallback(true)}
          >
            <source src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" type="video/mp4" />
            <source
              src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
              type="video/mp4"
            />
          </video>
        ) : (
          <img
            src="/aerial-view-of-luxury-resort-with-pools-and-palm-t.jpg"
            alt="Luxury resort aerial view"
            className="w-full h-full object-cover"
          />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 fade-in-up">TRAVEL</h1>
          <p className="text-xl md:text-2xl mb-8 fade-in-up opacity-90">Extraordinary experiences await</p>

          {/* Video Controls */}
          {!showFallback && (
            <button
              onClick={toggleVideo}
              className="inline-flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 
                         backdrop-blur-sm rounded-full px-6 py-3 transition-all duration-300 
                         border border-white border-opacity-30"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              <span>{isPlaying ? "Pause" : "Play"}</span>
            </button>
          )}
        </div>
      </div>

      {/* Loading indicator */}
      {!isVideoLoaded && !showFallback && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="loading-spinner"></div>
        </div>
      )}
    </section>
  )
}
