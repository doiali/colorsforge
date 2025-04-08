'use client'

import ThemeToggle from './theme-toggle'
import { FaXTwitter, FaGithub } from 'react-icons/fa6'
import { Button } from './ui/button'


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {children}
      < Footer />
    </>
  )
}

const Footer = () => {
  return (
    <footer className="pb-4 text-sm gap-2 flex flex-col items-center mx-auto max-w-2xl px-2">
      <hr className="w-full mb-2" />
      <p className="flex items-center gap-4">Created with love by <a className="inline-flex items-center gap-1" href='https://x.com/doiali' target='_blank'>
        <FaXTwitter className="inline-flex" />
        <span>Doiali</span>
      </a></p>
      <p className="flex items-center justify-center gap-2">
        <span>Colorsforge © 2025</span>
        <span className="mx-2">|</span>
        <Button asChild variant="ghost" size="icon">
          <a href='https://github.com/doiali/colorsforge' target='_blank'>
            <span className="sr-only">GitHub</span>
            <FaGithub className="inline-flex" />
          </a>
        </Button>
        <ThemeToggle />
      </p>
    </footer>
  )
}
