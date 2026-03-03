'use client'

import { useState, useRef, useEffect } from 'react'

const LOCATIONS = ['Florence, Italy', 'New York, USA', 'San Francisco, USA', 'London, UK', 'Berlin, Germany', 'Remote']

interface HeroSectionProps {
  onNavigate?: (page: 'home' | 'jobs' | 'login' | 'signup') => void
  keyword?: string
  setKeyword?: (k: string) => void
}

export default function HeroSection({ onNavigate, keyword: extKw, setKeyword: extSetKw }: HeroSectionProps) {
  const [kw, setKwLocal] = useState('')
  const [location, setLocation] = useState('Florence, Italy')
  const [locationOpen, setLocationOpen] = useState(false)
  const dropRef = useRef<HTMLDivElement>(null)

  const keyword = extKw !== undefined ? extKw : kw
  const setKeyword = extSetKw ?? setKwLocal

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setLocationOpen(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .hero-section {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: #F2F2F7;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        /* ── fade-up ── */
        .fu   { animation: fu 0.65s ease-out both; }
        .fu-1 { animation: fu 0.65s ease-out 0.10s both; }
        .fu-2 { animation: fu 0.65s ease-out 0.22s both; }
        .fu-3 { animation: fu 0.65s ease-out 0.34s both; }
        .fu-4 { animation: fu 0.65s ease-out 0.46s both; }
        @keyframes fu {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── image slide ── */
        .img-in { animation: imgIn 0.8s ease-out 0.05s both; }
        @keyframes imgIn {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* ── scribble underline ── */
        .scribble-svg { overflow: visible; display: block; }
        .scribble-path {
          stroke-dasharray: 700;
          stroke-dashoffset: 700;
          animation: scribbleDraw 1s ease-out 0.55s forwards;
        }
        .scribble-path-2 {
          stroke-dasharray: 700;
          stroke-dashoffset: 700;
          animation: scribbleDraw 1s ease-out 0.72s forwards;
        }
        @keyframes scribbleDraw { to { stroke-dashoffset: 0; } }

        /* ── search bar ── */
        .search-bar {
          display: flex;
          align-items: stretch;
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 6px 30px rgba(0,0,0,0.10);
          position: relative;
          z-index: 20;
        }
        .sb-input-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 22px;
          flex: 1.1;
          border-right: 1.5px solid #EBEBF0;
        }
        .sb-input-wrap input {
          border: none;
          outline: none;
          background: transparent;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #0F1B2D;
          width: 100%;
          padding: 18px 0;
        }
        .sb-input-wrap input::placeholder { color: #B0B8C8; }

        .sb-loc-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 22px;
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Plus Jakarta Sans', sans-serif;
          flex: 1;
        }
        .sb-loc-btn span {
          font-size: 14px;
          font-weight: 500;
          color: #0F1B2D;
          flex: 1;
          text-align: left;
          white-space: nowrap;
        }

        .loc-dropdown {
          position: absolute;
          top: calc(100% + 6px);
          left: 0;
          right: 0;
          background: #fff;
          border: 1px solid #E5E8F0;
          border-radius: 12px;
          box-shadow: 0 12px 36px rgba(0,0,0,0.10);
          overflow: hidden;
          z-index: 200;
        }
        .loc-opt {
          width: 100%;
          text-align: left;
          border: none;
          background: transparent;
          padding: 11px 20px;
          font-size: 14px;
          font-weight: 500;
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: #0F1B2D;
          cursor: pointer;
          transition: background 0.12s;
        }
        .loc-opt:hover, .loc-opt.active { background: #EEF1FF; color: #4B6BF5; }

        .sb-cta {
          background: #4B6BF5;
          color: #fff;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          font-size: 15px;
          border: none;
          border-radius: 8px;
          padding: 0 38px;
          margin: 6px;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.18s;
        }
        .sb-cta:hover { background: #3451D1; }
      `}</style>

      <section className="hero-section">

        {/* ══════════════════════════════════════════
            SCRATCHING RECTANGLES
            Nested, same rotation ~13deg, shrinking inward
            Positioned in upper-right, behind the person (z:3)
        ══════════════════════════════════════════ */}
        <div style={{ position:'absolute', width:420, height:320, top:'6%',  right:'3%',  border:'1.8px solid rgba(110,100,220,0.18)', borderRadius:8, transform:'rotate(13deg)', zIndex:3, pointerEvents:'none' }} />
        <div style={{ position:'absolute', width:330, height:252, top:'14%', right:'9%',  border:'1.8px solid rgba(110,100,220,0.18)', borderRadius:8, transform:'rotate(13deg)', zIndex:3, pointerEvents:'none' }} />
        <div style={{ position:'absolute', width:245, height:188, top:'22%', right:'16%', border:'1.8px solid rgba(110,100,220,0.18)', borderRadius:8, transform:'rotate(13deg)', zIndex:3, pointerEvents:'none' }} />
        <div style={{ position:'absolute', width:165, height:126, top:'30%', right:'23%', border:'1.8px solid rgba(110,100,220,0.18)', borderRadius:8, transform:'rotate(13deg)', zIndex:3, pointerEvents:'none' }} />

        {/* ══════════════════════════════════════════
            PERSON IMAGE
            — Full right half, full height, no border-radius, no clipping
            — Use a studio/cutout photo (white or transparent bg)
              so the person blends into the page background
            — mixBlendMode: multiply removes any white bg from the photo
            — z-index 4: above scratches, below search bar (z:20)
        ══════════════════════════════════════════ */}
        <div
          className="img-in"
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '52%',
            zIndex: 4,
          }}
        >
          {/*
            ⚠️  REPLACE THIS URL with your own studio/cutout photo.
            The photo MUST have a white or transparent background
            so the person blends into the #F2F2F7 page background.
            mixBlendMode="multiply" below handles the blending automatically.
          */}
          <img
            src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=1000&fit=crop&crop=top&q=90"
            alt="Professional"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top center',
              display: 'block',
              mixBlendMode: 'multiply',  /* blends white photo bg → page bg color */
            }}
          />
        </div>

        {/* ══════════════════════════════════════════
            LEFT CONTENT  z-index:10
        ══════════════════════════════════════════ */}
        <div style={{ position:'relative', zIndex:10, width:'100%', maxWidth:1200, margin:'0 auto', padding:'80px 64px' }}>
          <div style={{ maxWidth: 560 }}>

            {/* Headline */}
            <div className="fu">
              <h1 style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: 'clamp(2.8rem, 5vw, 4rem)',
                fontWeight: 800,
                lineHeight: 1.08,
                color: '#131B2E',
                letterSpacing: '-0.025em',
                margin: 0,
              }}>
                Discover
                <br />
                more than
                <br />
                <span style={{ position:'relative', display:'inline-block', color:'#4B6BF5' }}>
                  5000+ Jobs
                  {/* ── Scribble underline SVG ── */}
                  <svg
                    className="scribble-svg"
                    style={{ position:'absolute', left:'-1%', bottom:'-20px', width:'102%', height:'22px' }}
                    viewBox="0 0 420 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Line 1 — main sweep */}
                    <path
                      className="scribble-path"
                      d="M4 14 C60 4, 120 18, 180 10 C240 3, 300 17, 360 9 C385 5, 405 12, 416 11"
                      stroke="#2EC4F0"
                      strokeWidth="5"
                      strokeLinecap="round"
                      fill="none"
                    />
                    {/* Line 2 — second pass slightly lower */}
                    <path
                      className="scribble-path-2"
                      d="M6 17 C65 9, 128 20, 188 14 C248 7, 308 19, 365 13 C388 9, 407 15, 416 14"
                      stroke="#2EC4F0"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      fill="none"
                      opacity="0.65"
                    />
                  </svg>
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="fu-2" style={{ marginTop:44, fontSize:15, lineHeight:1.8, color:'#6B7589', maxWidth:420 }}>
              Great platform for the job seeker that searching for
              <br />
              new career heights and passionate about startups.
            </p>

            {/* Search bar
                — width extends past the left text column (min 700px)
                  so the right edge naturally overlaps the person image  */}
            <div className="fu-3" style={{ marginTop:32, position:'relative' }}>
              <div className="search-bar" style={{ width:'min(700px, 90vw)' }}>

                {/* Keyword input */}
                <div className="sb-input-wrap">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" style={{ flexShrink:0 }}>
                    <circle cx="11" cy="11" r="8" stroke="#B0B8C8" strokeWidth="2"/>
                    <path d="M21 21l-4.35-4.35" stroke="#B0B8C8" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <input
                    type="text"
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && onNavigate?.('jobs')}
                    placeholder="Job title or keyword"
                  />
                </div>

                {/* Location picker */}
                <div ref={dropRef} style={{ position:'relative' }}>
                  <button className="sb-loc-btn" onClick={() => setLocationOpen(!locationOpen)}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" style={{ flexShrink:0 }}>
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#B0B8C8" strokeWidth="2"/>
                      <circle cx="12" cy="9" r="2.5" stroke="#B0B8C8" strokeWidth="2"/>
                    </svg>
                    <span>{location}</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                      style={{ flexShrink:0, transition:'transform 0.2s', transform: locationOpen ? 'rotate(180deg)' : 'none' }}>
                      <path d="M6 9l6 6 6-6" stroke="#B0B8C8" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>

                  {locationOpen && (
                    <div className="loc-dropdown">
                      {LOCATIONS.map(loc => (
                        <button key={loc} className={`loc-opt ${location===loc?'active':''}`}
                          onClick={() => { setLocation(loc); setLocationOpen(false) }}>
                          {loc}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Search CTA */}
                <button className="sb-cta" onClick={() => onNavigate?.('jobs')}>
                  Search my job
                </button>
              </div>
            </div>

            {/* Popular */}
            <div className="fu-4" style={{ marginTop:18, display:'flex', flexWrap:'wrap', alignItems:'center', gap:4 }}>
              <span style={{ fontSize:13, color:'#6B7589', fontWeight:500 }}>Popular :</span>
              {['UI Designer','UX Researcher','Android','Admin'].map((term, i, arr) => (
                <span key={term} style={{ display:'inline-flex', alignItems:'center', gap:2 }}>
                  <button
                    onClick={() => { setKeyword(term); onNavigate?.('jobs') }}
                    style={{ fontSize:13, fontWeight:600, color:'#0F1B2D', background:'none', border:'none', cursor:'pointer', fontFamily:'Plus Jakarta Sans, sans-serif', padding:0, transition:'color 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.color='#4B6BF5')}
                    onMouseLeave={e => (e.currentTarget.style.color='#0F1B2D')}
                  >
                    {term}
                  </button>
                  {i < arr.length-1 && <span style={{ color:'#C8CDD8', fontSize:12 }}>,</span>}
                </span>
              ))}
            </div>

          </div>
        </div>

      </section>
    </>
  )
}