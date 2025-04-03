'use client'

import ThemeToggle from './theme-toggle'

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
    <footer className="flex justify-center items-center py-4 text-sm">
      <p>Colorsforge © 2025</p>
      <ThemeToggle />
    </footer>
  )
}
