// app/page.tsx
import dynamic from 'next/dynamic'
import Footer from "./components/layout/footer"
import Artists from './components/home/Artiste'
import Realisations from './components/home/Realisation'
import News from './components/home/News'

const Navbar = dynamic(
  () => import('./components/layout/navbar'),
  { ssr: false }
)

// HeroSlider sans utilisation de window
const HeroSlider = dynamic(
  () => import('./components/home/HeroSlider'),
  { loading: () => <div className="h-screen bg-black" /> }
)

const Services = dynamic(
  () => import('./components/home/Service'),
  { loading: () => <div className="py-16" /> }
)

export default function HomePage() {
  return (
    <div className="bg-black">
      <Navbar />
      <main>
        <HeroSlider />
        <Services />
        <Artists/>
        <Realisations/>
        <News/>
      </main>
      <Footer />
    </div>
  )
}