import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import News from "./components/News"
import Stats from "./components/Stats"
import ESG from "./components/ESG"
import EmailAlerts from "./components/EmailAlerts"
import Footer from "./components/Footer"
import useScrollFadeIn from "./hooks/useScrollFadeIn"
import "./App.css"

function App() {
  useScrollFadeIn()

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <News />
      <Stats />
      <ESG />
      <EmailAlerts />
      <Footer />
    </div>
  )
}

export default App
