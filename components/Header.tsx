'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

type Page = 'home' | 'jobs' | 'signin' | 'signup' | 'companies'

interface HeaderProps {
  activePage?: Page
  onNavigate?: (page: Page) => void
}

export default function Header({ activePage = 'home', onNavigate }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [activePage])

  const navLinks: { label: string; page: Page; href: string }[] = [
    { label: 'Find Jobs', page: 'jobs', href: '/jobs' },
    { label: 'Browse Companies', page: 'companies', href: '/companies' },
  ]

  const handleNav = (page: Page) => {
    onNavigate?.(page)
    setMobileMenuOpen(false)
  }

  // ── Shared logo classes — hover applied to the wrapper, children react via group-hover
  const logoWrapperClass = 'flex items-center gap-2.5 group'
  const Logo = () => (
    <>
      <img
        src="/img/icon.png"
        alt="QuickHire logo"
        className="w-8 h-8 rounded-full object-cover transition-transform duration-200 group-hover:scale-105"
      />
      <span className="font-['Sora',sans-serif] font-bold text-lg text-[#0F1B2D] tracking-tight transition-colors duration-200 group-hover:text-[#4B6BF5]">
        QuickHire
      </span>
    </>
  )

  return (
    <>
      {/* ── NAVBAR ── */}
      <header
        className={`sticky top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white backdrop-blur-md '
            : 'bg-white backdrop-blur-md '
        }`}
      >
        <div className="w-full max-w-300 mx-auto px-6 h-16 flex items-center justify-between">

          {/* ── LEFT: Logo + Nav ── */}
          <div className="flex items-center gap-10">

            {/* Logo — rendered as component so group context is live */}
            {onNavigate ? (
              <button
                onClick={() => handleNav('home')}
                className={`${logoWrapperClass} bg-transparent border-none cursor-pointer`}
              >
                <Logo />
              </button>
            ) : (
              <Link href="/" className={logoWrapperClass}>
                <Logo />
              </Link>
            )}

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map(({ label, page, href }) => (
                onNavigate ? (
                  <button
                    key={page}
                    onClick={() => handleNav(page)}
                    className={`text-sm font-semibold bg-transparent border-none cursor-pointer font-['Plus_Jakarta_Sans',sans-serif] transition-colors duration-150 ${
                      activePage === page ? 'text-[#4B6BF5]' : 'text-[#0F1B2D] hover:text-[#4B6BF5]'
                    }`}
                  >
                    {label}
                  </button>
                ) : (
                  <Link
                    key={page}
                    href={href}
                    className={`text-sm font-semibold transition-colors duration-150 ${
                      activePage === page ? 'text-[#4B6BF5]' : 'text-[#0F1B2D] hover:text-[#4B6BF5]'
                    }`}
                  >
                    {label}
                  </Link>
                )
              ))}
            </nav>
          </div>

          {/* ── RIGHT: Auth Buttons ── */}
          <div className="hidden md:flex items-center gap-3">
            {onNavigate ? (
              <button
                onClick={() => handleNav('signin')}
                className="text-sm font-bold text-[#0F1B2D] bg-transparent border-none cursor-pointer font-['Plus_Jakarta_Sans',sans-serif] hover:text-[#4B6BF5] transition-colors"
              >
                Login
              </button>
            ) : (
              <Link href="/signin" className="text-sm font-bold text-[#0F1B2D] hover:text-[#4B6BF5] transition-colors">
                Login
              </Link>
            )}

            {onNavigate ? (
              <button
                onClick={() => handleNav('signup')}
                className="bg-[#4B6BF5] text-white text-sm font-bold px-5 py-2.5 rounded-xl border-none cursor-pointer font-['Plus_Jakarta_Sans',sans-serif] hover:bg-[#3451D1] active:scale-95 transition-all duration-150"
              >
                Sign Up
              </button>
            ) : (
              <Link
                href="/signup"
                className="bg-[#4B6BF5] text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-[#3451D1] active:scale-95 transition-all duration-150 inline-block"
              >
                Sign Up
              </Link>
            )}
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            className="md:hidden flex flex-col gap-1.25 p-2 bg-transparent border-none cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-5.5 bg-[#0F1B2D] rounded-sm transition-all duration-200 origin-center ${mobileMenuOpen ? 'rotate-45 translate-y-1.75' : ''}`} />
            <span className={`block h-0.5 bg-[#0F1B2D] rounded-sm transition-all duration-200 ml-auto ${mobileMenuOpen ? 'w-0 opacity-0' : 'w-3.75'}`} />
            <span className={`block h-0.5 w-5.5 bg-[#0F1B2D] rounded-sm transition-all duration-200 origin-center ${mobileMenuOpen ? '-rotate-45 -translate-y-1.75' : ''}`} />
          </button>
        </div>
      </header>

      {/* ── Mobile Overlay ── */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-[#0F1B2D]/25 backdrop-blur-[3px] z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* ── Mobile Drawer ── */}
      <div
        className={`sticky top-16 left-0 right-0 w-full z-40 md:hidden bg-white border-b border-[#E5E8F0] rounded-b-3xl shadow-2xl transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-5 py-5 flex flex-col gap-1">
          {navLinks.map(({ label, page, href }) => (
            onNavigate ? (
              <button
                key={page}
                onClick={() => handleNav(page)}
                className={`text-left text-[15px] font-semibold py-3.5 border-b border-[#F0F0F0] last:border-0 bg-transparent cursor-pointer font-['Plus_Jakarta_Sans',sans-serif] transition-colors ${
                  activePage === page ? 'text-[#4B6BF5]' : 'text-[#0F1B2D] hover:text-[#4B6BF5]'
                }`}
              >
                {label}
              </button>
            ) : (
              <Link
                key={page}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-[15px] font-semibold py-3.5 border-b border-[#F0F0F0] last:border-0 transition-colors ${
                  activePage === page ? 'text-[#4B6BF5]' : 'text-[#0F1B2D] hover:text-[#4B6BF5]'
                }`}
              >
                {label}
              </Link>
            )
          ))}

          {/* Mobile Auth */}
          <div className="flex flex-col gap-2.5 pt-4">
            {onNavigate ? (
              <>
                <button
                  onClick={() => handleNav('signin')}
                  className="w-full py-3 text-sm font-bold rounded-xl border-[1.5px] border-[#E5E8F0] bg-transparent text-[#0F1B2D] cursor-pointer font-['Plus_Jakarta_Sans',sans-serif] hover:border-[#4B6BF5] hover:text-[#4B6BF5] transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNav('signup')}
                  className="w-full py-3 text-sm font-bold rounded-xl bg-[#4B6BF5] text-white border-none cursor-pointer font-['Plus_Jakarta_Sans',sans-serif] hover:bg-[#3451D1] transition-colors"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-3 text-sm font-bold text-center rounded-xl border-[1.5px] border-[#E5E8F0] text-[#0F1B2D] hover:border-[#4B6BF5] hover:text-[#4B6BF5] transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-3 text-sm font-bold text-center rounded-xl bg-[#4B6BF5] text-white hover:bg-[#3451D1] transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}