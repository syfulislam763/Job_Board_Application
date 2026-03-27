'use client'

import { useState } from 'react'
import Link from 'next/link'

interface LoginPageProps {
  onNavigate?: (page: 'home' | 'jobs' | 'login' | 'signup' | 'companies') => void
}

export default function LoginPage({ onNavigate }: LoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // handle login logic here
  }

  return (
    <main className="min-h-screen bg-[#F5F6FA] flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-105">

        <div className="flex items-center justify-center gap-2.5 mb-9">
          <img
            src="/img/icon.png"
            alt="QuickHire logo"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-['Sora',sans-serif] font-bold text-lg text-[#0F1B2D] tracking-tight">
            QuickHire
          </span>
        </div>


        <div className="bg-white border-[1.5px] border-[#E5E8F0] rounded-3xl px-8 py-9">

          <h1 className="font-['Sora',sans-serif] font-extrabold text-2xl text-[#0F1B2D] mb-1.5">
            Welcome back
          </h1>
          <p className="text-[13px] text-[#6B7589] mb-7">
            Sign in to continue your job search
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <div>
              <label className="block text-xs font-bold text-[#0F1B2D] mb-2">
                Email address
              </label>
              <div className="flex items-center gap-2.5 px-4 bg-white border-[1.5px] border-[#E5E8F0] rounded-[14px] transition-colors focus-within:border-[#4B6BF5]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
                  <rect x="2" y="4" width="20" height="16" rx="2" stroke="#6B7589" strokeWidth="2"/>
                  <path d="M2 7l10 7 10-7" stroke="#6B7589" strokeWidth="2"/>
                </svg>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full py-3.5 bg-transparent border-none outline-none text-[14px] font-medium text-[#0F1B2D] font-['Plus_Jakarta_Sans',sans-serif] placeholder:text-[#6B7589]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-[#0F1B2D]">Password</label>
                <a href="#" className="text-xs font-bold text-[#4B6BF5] no-underline hover:text-[#3451D1] transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="flex items-center gap-2.5 px-4 bg-white border-[1.5px] border-[#E5E8F0] rounded-[14px] transition-colors focus-within:border-[#4B6BF5]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
                  <rect x="3" y="11" width="18" height="11" rx="2" stroke="#6B7589" strokeWidth="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4" stroke="#6B7589" strokeWidth="2"/>
                </svg>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="flex-1 py-3.5 bg-transparent border-none outline-none text-[14px] font-medium text-[#0F1B2D] font-['Plus_Jakarta_Sans',sans-serif] placeholder:text-[#6B7589]"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="bg-transparent border-none cursor-pointer text-[#6B7589] flex items-center"
                >
                  {showPass ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M1 1l22 22" stroke="#6B7589" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#6B7589" strokeWidth="2"/>
                      <circle cx="12" cy="12" r="3" stroke="#6B7589" strokeWidth="2"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 mt-1 bg-[#4B6BF5] text-white text-[14px] font-bold rounded-xl border-none cursor-pointer font-['Plus_Jakarta_Sans',sans-serif] hover:bg-[#3451D1] active:scale-97 transition-all duration-150"
            >
              Sign In
            </button>
          </form>


          <div className="flex items-center gap-3 my-5.5">
            <div className="flex-1 h-px bg-[#E5E8F0]" />
            <span className="text-xs text-[#6B7589] font-medium whitespace-nowrap">or continue with</span>
            <div className="flex-1 h-px bg-[#E5E8F0]" />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {[
              {
                name: 'Google',
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                ),
              },
              {
                name: 'LinkedIn',
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                ),
              },
            ].map((btn) => (
              <button
                key={btn.name}
                className="py-2.75 flex items-center justify-center gap-2 text-[13px] font-bold text-[#0F1B2D] bg-transparent border-[1.5px] border-[#E5E8F0] rounded-xl cursor-pointer font-['Plus_Jakarta_Sans',sans-serif] hover:border-[#4B6BF5] hover:text-[#4B6BF5] transition-colors"
              >
                {btn.icon}
                {btn.name}
              </button>
            ))}
          </div>

 
          <p className="text-center text-[13px] text-[#6B7589] mt-5.5">
            Don&apos;t have an account?{' '}
            {onNavigate ? (
              <button
                onClick={() => onNavigate('signup')}
                className="font-bold text-[#4B6BF5] bg-transparent border-none cursor-pointer font-['Plus_Jakarta_Sans',sans-serif] text-[13px] hover:text-[#3451D1] transition-colors"
              >
                Sign up free
              </button>
            ) : (
              <Link href="/signup" className="font-bold text-[#4B6BF5] hover:text-[#3451D1] transition-colors">
                Sign up free
              </Link>
            )}
          </p>
        </div>
      </div>
    </main>
  )
}