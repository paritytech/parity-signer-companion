import React from 'react'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Media } from '../components/Media'

export const Main: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => (
  <main className='flex flex-col h-full text-_text-500 text-base overflow-y-auto'>
    <Header />
    <Media />
    <div className='p-4'>{children}</div>
    <Footer />
  </main>
)
