import type { NextPage } from "next"
import Head from "next/head"
import Navbar from "../components/layout/navbar"
import ContactSection from "../components/Contact/ContactSection"


import Footer from "../components/layout/footer"


const ContactPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Contact - BraizeRecords</title>
        <meta name="description" content="Contactez BraizeRecords pour vos projets musicaux, consulting et édition." />
      </Head>

      {/* Header fixe */}
      <Navbar  />

      <main className="pt-20"> {/* pt-20 pour compenser le header fixe */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}

export default ContactPage