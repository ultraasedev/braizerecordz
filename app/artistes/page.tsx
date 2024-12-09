import ArtistsPage from "../components/artist/ArtistsPage"
import type { Metadata } from 'next'
import Navbar from "../components/layout/navbar"
import Footer from "../components/layout/footer"

export const metadata: Metadata = {
  title: 'Nos Artistes - BraizeRecords',
  description: 'Découvrez tous les artistes du label BraizeRecords - Rap, Pop Urbaine, Shatta',
}

export default function Page() {
  return (
    <>
     <Navbar />
    <ArtistsPage />
  <Footer />
    </>
 
  )

}