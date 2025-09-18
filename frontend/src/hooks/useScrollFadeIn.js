"use client"

import { useEffect } from "react"

export default function useScrollFadeIn() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-up")
        }
      })
    }, observerOptions)

    // Observe all elements with fade-in classes
    const elementsToObserve = document.querySelectorAll(".fade-in-up, .slide-in-left, .slide-in-right")
    elementsToObserve.forEach((el) => observer.observe(el))

    return () => {
      elementsToObserve.forEach((el) => observer.unobserve(el))
    }
  }, [])
}
