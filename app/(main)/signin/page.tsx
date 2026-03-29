'use client'

import { useState } from 'react'
import Link from 'next/link';
import { authApi } from '@/services/auth';
import { useJobBoardStore } from '@/hooks/useJobBoardStore';
import { useRouter } from 'next/navigation';

interface LoginPageProps {
  onNavigate?: (page: 'home' | 'jobs' | 'login' | 'signup' | 'companies') => void
}

export default function LoginPage({ onNavigate }: LoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false);
  const router = useRouter()

  const setLogin = useJobBoardStore((s) => s.login);
  const auth = useJobBoardStore((s) => s.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) return

    try {
      const res = await authApi.login({ email, password })
      setLogin(res.data.user, res.data.access_token)
      console.log("success →", res.data);
      router.push("/")
 
    } catch (err: any) {
      console.log("error →", err.response?.data)

    }
  }


  return (
    <main className="min-h-screen bg-[#F5F6FA] flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-105">

        {/* <div className="flex items-center justify-center gap-2.5 mb-9">
          <img
            src="/img/icon.png"
            alt="QuickHire logo"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-['Sora',sans-serif] font-bold text-lg text-[#0F1B2D] tracking-tight">
            QuickHire
          </span>
        </div> */}


        <div className="bg-white border-[#E5E8F0] px-8 py-9">

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
              <div className="flex items-center gap-2.5 px-4 bg-white border-[1.5px] border-[#E5E8F0] rounded-[5px] transition-colors focus-within:border-[#4B6BF5]">
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
              <div className="flex items-center gap-2.5 px-4 bg-white border-[1.5px] border-[#E5E8F0] rounded-[5px] transition-colors focus-within:border-[#4B6BF5]">
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
              className="w-full py-3.5 mt-1 bg-[#4B6BF5] text-white text-[14px] font-bold rounded-[5px] border-none cursor-pointer font-['Plus_Jakarta_Sans',sans-serif] hover:bg-[#3451D1] active:scale-97 transition-all duration-150"
            >
              Sign In
            </button>
          </form>


          {/* <div className="flex items-center gap-3 my-5.5">
            <div className="flex-1 h-px bg-[#E5E8F0]" />
            <span className="text-xs text-[#6B7589] font-medium whitespace-nowrap">or continue with</span>
            <div className="flex-1 h-px bg-[#E5E8F0]" />
          </div> */}

 
          <p className="text-center text-[13px] text-[#6B7589] mt-5.5">
            Don&apos;t have an account?{' '}
            {onNavigate ? (
              <button
                onClick={() => onNavigate('signup')}
                className="font-bold text-[#4B6BF5] bg-transparent border-none cursor-pointer font-['Plus_Jakarta_Sans',sans-serif] text-[13px] hover:text-[#3451D1] transition-colors"
              >
                Sign up
              </button>
            ) : (
              <Link href="/signup" className="font-bold text-[#4B6BF5] hover:text-[#3451D1] transition-colors">
                Sign up
              </Link>
            )}
          </p>
        </div>
      </div>
    </main>
  )
}