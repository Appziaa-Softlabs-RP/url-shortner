'use client'

import CTA from '@/components/home/cta'
import Expertise from '@/components/home/expertise'
import Features from '@/components/home/features'
import GlobalPresence from '@/components/home/global-presence'
import Hero from '@/components/home/hero'
import Recognition from '@/components/home/recognition'
import Stats from '@/components/home/stats'
import SuccessStories from '@/components/home/success-stories'

export default function Page() {

  return (
    <main>
      <Hero />
      <Features />
      <Expertise />
      <Recognition />
      <SuccessStories />
      <Stats />
      <GlobalPresence />
      <CTA />
    </main>
  )
}