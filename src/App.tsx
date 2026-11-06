import { MotionConfig } from 'motion/react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Makes from './components/Makes'
import Flip from './components/Flip'
import Ordering from './components/Ordering'
import Custom from './components/Custom'
import About from './components/About'
import Footer from './components/Footer'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:font-semibold focus:text-on-accent"
      >
        Skip to content
      </a>
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <Makes />
        <Flip />
        <Ordering />
        <Custom />
        <About />
      </main>
      <Footer />
    </MotionConfig>
  )
}
