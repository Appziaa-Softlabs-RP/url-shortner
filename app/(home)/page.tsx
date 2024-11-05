// "use client"

import Contact from "@/components/home/contact"
import FAQ from "@/components/home/faq"
import Features from "@/components/home/features"
import IntroBanner from "@/components/home/intro-banner"
import Sponsers from "@/components/home/sponsers"
import WhoWeHelp from "@/components/home/who-we-help"
import SolutionDesignedFor from "@/components/home/solution-designed-for"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default async function Home() {

  return (
    <main className="flex-1">
      <IntroBanner
        stagger={stagger}
        fadeIn={fadeIn}
      />


      <Features
        stagger={stagger}
        fadeIn={fadeIn}
      />

      <Sponsers />

      <SolutionDesignedFor
        stagger={stagger}
        fadeIn={fadeIn}
      />

      {/* <WhoWeHelp /> */}

      {/* <Contact
        stagger={stagger}
        fadeIn={fadeIn}
      />

      <FAQ
        stagger={stagger}
        fadeIn={fadeIn}
      /> */}
    </main>
  )
}