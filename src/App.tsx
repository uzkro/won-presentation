import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Target, Zap, Users, Sword, Flame, ExternalLink, Copy, Check, Share2 } from 'lucide-react'
import wonHand from './assets/won-hand.png'

const TOPBLAST_LINK = "https://topblast.lol/?token=EQA6V2rlkDtIWooWLdaCOQ3iwylsMRkoYYtzZ01Jq9uSH8Or"
const TONVIEWER_LINK = "https://tonviewer.com/address/EQA6V2rlkDtIWooWLdaCOQ3iwylsMRkoYYtzZ01Jq9uSH8Or"
const DEXSCREENER_LINK = "https://dexscreener.com/ton/EQA6V2rlkDtIWooWLdaCOQ3iwylsMRkoYYtzZ01Jq9uSH8Or"
const TOKEN_ADDRESS = "EQA6V2rlkDtIWooWLdaCOQ3iwylsMRkoYYtzZ01Jq9uSH8Or"

const onChainData = {
  holders: 15,
  days: 1,
  bonding: 13,
  raised: 200,
  supply: 1000000000,
}

const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  return <span className="tabular-nums">{value}{suffix}</span>
}

function App() {
  const [activated, setActivated] = useState(false)
  const [showWarCry, setShowWarCry] = useState(false)
  const [copied, setCopied] = useState(false)
  const [shareCopied, setShareCopied] = useState(false)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleBuy = () => window.open(TOPBLAST_LINK, '_blank')
  const handleVerify = () => window.open(TONVIEWER_LINK, '_blank')
  const handleDexscreener = () => window.open(DEXSCREENER_LINK, '_blank')

  const copyAddress = async () => {
    await navigator.clipboard.writeText(TOKEN_ADDRESS)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const copyPageLink = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setShareCopied(true)
    setTimeout(() => setShareCopied(false), 2000)
  }

  const shareOnX = () => {
    const text = encodeURIComponent("$WON War On Nations is live. The middle finger to the old world.")
    const url = encodeURIComponent("https://waronnations.fun")
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
  }

  const handleHandClick = () => {
    setActivated(true)
    setShowWarCry(true)
    setTimeout(() => setActivated(false), 1800)
    setTimeout(() => setShowWarCry(false), 2400)
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden font-sans selection:bg-red-600 selection:text-white">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/95 backdrop-blur-2xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center">
              <span className="text-[#050505] font-black text-3xl tracking-[-3.5px]">W</span>
            </div>
            <div>
              <div className="font-black text-4xl tracking-[-4px] leading-none">$WON</div>
              <div className="text-[10px] text-white/40 -mt-1 tracking-[4px]">WAR ON NATIONS</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-10 text-sm uppercase tracking-[3px] font-medium">
            <button onClick={() => scrollTo('symbol')} className="hover:text-red-500 transition-colors">THE SYMBOL</button>
            <button onClick={() => scrollTo('live')} className="hover:text-red-500 transition-colors">ON-CHAIN DATA</button>
            <button onClick={() => scrollTo('war')} className="hover:text-red-500 transition-colors">THE WAR</button>
            <button onClick={() => scrollTo('mission')} className="hover:text-red-500 transition-colors">MISSION</button>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={handleVerify} className="hidden md:flex items-center gap-2 px-5 py-2 text-sm border border-white/20 hover:bg-white/5 rounded-2xl transition-all">
              VERIFY ON TON <ExternalLink size={16} />
            </button>
            <button onClick={handleBuy} className="flex items-center gap-2.5 px-8 py-2.5 bg-white text-[#050505] font-bold rounded-2xl hover:bg-red-600 hover:text-white active:scale-[0.985] transition-all text-sm tracking-wider">
              BUY $WON <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-[100dvh] flex items-center justify-center pt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] bg-[length:4px_4px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black" />

        <div className="max-w-6xl mx-auto px-6 text-center z-10 relative pb-16 lg:pb-20">
          {/* Advanced $WON SVG with letter-inside-letter effect */}
          <div className="mb-3 flex justify-center">
            <svg 
              viewBox="0 0 720 135" 
              className="w-full max-w-[680px] md:max-w-[720px] h-auto"
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <text 
                x="50%" y="92" textAnchor="middle" 
                fontSize="128" fontWeight="900" 
                fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
                fill="#ffffff" stroke="#111111" strokeWidth="24"
                strokeLinejoin="round" strokeLinecap="round"
              >
                $WON
              </text>
              
              <text 
                x="50%" y="92" textAnchor="middle" 
                fontSize="128" fontWeight="900" 
                fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
                fill="#ffffff"
              >
                $WON
              </text>

              <text 
                x="50%" y="92" textAnchor="middle" 
                fontSize="128" fontWeight="900" 
                fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
                fill="none" stroke="#0a0a0a" strokeWidth="9"
                strokeLinejoin="round" strokeLinecap="round"
              >
                $WON
              </text>

              <text 
                x="50%" y="92" textAnchor="middle" 
                fontSize="128" fontWeight="900" 
                fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
                fill="none" stroke="#ffffff" strokeWidth="2.5" opacity="0.9"
                strokeLinejoin="round" strokeLinecap="round"
              >
                $WON
              </text>
            </svg>
          </div>

          <div className="text-[50px] md:text-[70px] font-black tracking-[-3.5px] text-white/90 mb-4">
            WAR ON NATIONS
          </div>

          <div className="max-w-[620px] mx-auto mb-8">
            <p className="text-3xl md:text-[34px] font-medium tracking-[-1px] text-white/90 leading-tight">
              One symbol.<br />
              One nation.<br />
              <span className="text-red-500">Zero fucks given.</span>
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/5 border border-white/10 rounded-full text-sm tracking-[1.5px]">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              <span>{onChainData.holders} WARRIORS JOINED</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollTo('symbol')}
              className="group flex items-center justify-center gap-3 px-10 py-5 border-2 border-white/30 hover:bg-white hover:text-[#050505] transition-all rounded-3xl text-lg font-semibold tracking-[0.5px] active:scale-[0.985]"
            >
              DISCOVER THE SYMBOL
              <ArrowRight className="group-hover:translate-x-1 transition" />
            </button>

            <button
              onClick={handleBuy}
              className="flex items-center justify-center gap-3 px-10 py-5 bg-white text-[#050505] font-bold rounded-3xl hover:bg-red-600 hover:text-white active:bg-red-700 transition-all text-lg tracking-wider active:scale-[0.985]"
            >
              BUY $WON NOW <ArrowRight />
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-xs tracking-[4px] text-white/40">
          SCROLL TO BEGIN THE WAR
          <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent mt-3" />
        </div>
      </section>

      {/* THE SYMBOL */}
      <section id="symbol" className="max-w-5xl mx-auto px-6 pt-20 pb-24 border-t border-white/10">
        <div className="text-center mb-12">
          <div className="inline-block px-5 py-1.5 text-xs tracking-[4px] bg-white/5 border border-white/10 rounded-full mb-4">THE FLAG OF THE REVOLUTION</div>
          <h2 className="text-7xl md:text-8xl font-black tracking-[-4px]">The Symbol</h2>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative mb-10 cursor-pointer" onClick={handleHandClick}>
            <motion.img
              src={wonHand}
              alt="Click to activate"
              className="w-[280px] md:w-[380px] lg:w-[420px] select-none"
              style={{ filter: activated ? 'drop-shadow(0 0 100px rgba(239,68,68,0.7))' : 'drop-shadow(0 0 90px rgba(255,255,255,0.5))' }}
              animate={{ scale: activated ? 1.18 : 1 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
            />
            <AnimatePresence>
              {activated && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-red-600/20 blur-3xl rounded-full scale-[1.6]" />}
            </AnimatePresence>
          </div>

          <div className="max-w-2xl text-center">
            <p className="text-2xl md:text-3xl font-medium tracking-[-0.5px] text-white/90 mb-6">This is not just an emoji.<br />This is our flag.</p>
            <p className="text-xl text-white/70 max-w-lg mx-auto">Click it. Feel it. Then join the war.</p>
          </div>

          <button onClick={handleBuy} className="mt-10 flex items-center gap-3 px-9 py-4 bg-white text-[#050505] font-bold text-lg rounded-3xl hover:bg-red-600 hover:text-white active:scale-[0.985] transition-all">
            ACTIVATE YOUR STATUS — BUY $WON <ArrowRight />
          </button>
        </div>

        <AnimatePresence>
          {showWarCry && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none">
              <div className="text-[72px] md:text-[92px] font-black tracking-[-6px] text-red-600 drop-shadow-[0_0_60px_rgb(185,28,28)]">FUCK THE SYSTEM</div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ON-CHAIN DATA */}
      <section id="live" className="bg-[#0a0a0a] py-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/80 text-xs tracking-[3px] font-medium">
                  VERIFIED ON-CHAIN
                </div>
                <span className="text-white/40 text-sm">As of June 14, 2026</span>
              </div>
              <h2 className="text-7xl font-black tracking-[-3.5px]">Real Data. Real War.</h2>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={handleVerify} className="flex items-center gap-2 px-6 py-3 border border-white/20 hover:bg-white/5 rounded-2xl text-sm transition-all self-start md:self-auto">
                VERIFY ON TON <ExternalLink size={18} />
              </button>
              <button onClick={handleDexscreener} className="flex items-center gap-2 px-6 py-3 border border-white/20 hover:bg-white/5 hover:border-[#22c55e]/50 rounded-2xl text-sm transition-all self-start md:self-auto">
                VIEW CHART <ExternalLink size={18} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { label: "WARRIORS ACTIVATED", value: onChainData.holders, suffix: "", sub: "On-chain holders" },
              { label: "DAYS OF RESISTANCE", value: onChainData.days, suffix: "", sub: "Since launch" },
              { label: "BONDING CURVE", value: onChainData.bonding, suffix: "%", sub: "Mission progress" },
              { label: "RAISED", value: onChainData.raised, suffix: " TON", sub: "On Topblast" },
              { label: "TOTAL SUPPLY", value: onChainData.supply / 1000000000, suffix: "B", sub: "Fixed & fair" },
            ].map((stat, index) => (
              <div key={index} className="bg-[#050505] border border-white/10 rounded-3xl p-8 group hover:border-red-500/40 transition-all">
                <div className="text-red-500 text-xs tracking-[3px] mb-3">{stat.label}</div>
                <div className="font-black text-6xl md:text-7xl tracking-[-3px] mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-white/60 text-sm">{stat.sub}</div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <button 
              onClick={handleDexscreener}
              className="group w-full flex flex-col sm:flex-row items-center justify-center gap-4 px-10 py-5 bg-[#0a0a0a] border border-white/10 hover:border-[#22c55e] rounded-3xl transition-all active:scale-[0.985]"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 flex items-center justify-center rounded-2xl bg-[#111] group-hover:bg-[#22c55e]/10 transition-colors flex-shrink-0">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 3v18h18" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 16L11 11L15 14L21 7" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="21" cy="7" r="1.5" fill="#22c55e"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-bold text-xl tracking-[-0.5px]">VIEW LIVE CHART ON DEXSCREENER</div>
                  <div className="text-sm text-white/60">Real-time trades • Price action • Full analytics</div>
                </div>
              </div>
              <div className="hidden sm:block ml-auto">
                <ExternalLink size={22} className="text-white/60 group-hover:text-[#22c55e] group-hover:translate-x-0.5 transition-all" />
              </div>
            </button>
          </div>

          <div className="mt-10">
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-3">
                <div className="text-sm font-medium tracking-wider">BONDING CURVE PROGRESS</div>
                <div className="text-red-500 font-mono text-sm">{onChainData.bonding}%</div>
              </div>
              <div className="text-xs text-white/50">Target: Migration to DEX</div>
            </div>

            <div onClick={handleBuy} className="relative h-4 bg-white/10 rounded-full overflow-hidden cursor-pointer group">
              <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full shadow-[0_0_20px_rgb(185,28,28)]" style={{ width: `${onChainData.bonding}%` }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-[10px] font-mono tracking-[2px] text-white/70 group-hover:text-white transition-colors">CLICK TO BUY → TOPBLAST</div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#050505] border border-white/10 rounded-3xl px-6 py-5">
            <div className="font-mono text-sm text-white/70 break-all">{TOKEN_ADDRESS}</div>
            <button onClick={copyAddress} className="flex items-center gap-2 px-5 py-2.5 text-sm border border-white/20 hover:bg-white/5 rounded-2xl transition-all active:scale-[0.985]">
              {copied ? <>COPIED! <Check size={16} /></> : <>COPY ADDRESS <Copy size={16} /></>}
            </button>
          </div>
        </div>
      </section>

      {/* SPREAD THE WAR */}
      <section className="max-w-5xl mx-auto px-6 py-16 border-t border-white/10 text-center">
        <div className="mb-8">
          <div className="text-red-500 tracking-[4px] text-sm font-medium mb-2">SPREAD THE WAR</div>
          <h3 className="text-5xl font-black tracking-[-2px]">Help us grow the nation</h3>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={copyPageLink} className="flex items-center justify-center gap-3 px-8 py-4 border border-white/20 hover:bg-white/5 rounded-3xl text-lg font-semibold transition-all active:scale-[0.985]">
            {shareCopied ? <><Check size={20} /> LINK COPIED</> : <><Copy size={20} /> COPY PAGE LINK</>}
          </button>
          <button onClick={shareOnX} className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#050505] hover:bg-red-600 hover:text-white rounded-3xl text-lg font-bold transition-all active:scale-[0.985]">
            <Share2 size={20} /> SHARE ON X
          </button>
        </div>
      </section>

      {/* THE WAR */}
      <section id="war" className="max-w-6xl mx-auto px-6 py-20 border-t border-white/10">
        <div className="text-center mb-16">
          <div className="text-red-500 tracking-[4px] text-sm font-medium mb-3">WHY WE FIGHT</div>
          <h2 className="text-7xl font-black tracking-[-3.5px]">The War We Fight</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Sword, title: "Centralized Chains", desc: "We reject chains disguised as freedom." },
            { icon: Target, title: "Fake Narratives", desc: "Media and institutions that divide nations for profit." },
            { icon: Flame, title: "Weak Leadership", desc: "Leaders who serve themselves, not the people." },
            { icon: Users, title: "Division Tactics", desc: "They want us fighting each other. We fight together." },
          ].map((item, index) => (
            <div key={index} className="group bg-[#050505] border border-white/10 p-8 rounded-3xl hover:border-red-500/40 transition-all">
              <item.icon className="w-9 h-9 text-red-500 mb-8 group-hover:scale-110 transition" />
              <h3 className="font-bold text-3xl tracking-[-1px] mb-4">{item.title}</h3>
              <p className="text-white/70 text-[17px] leading-snug">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION */}
      <section id="mission" className="bg-[#0a0a0a] py-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-red-500 tracking-[4px] text-sm font-medium mb-3">OUR PURPOSE</div>
            <h2 className="text-7xl font-black tracking-[-3px]">The Mission</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Target, title: "Expose & Destroy", desc: "Shatter every lie built to keep nations weak and obedient." },
              { icon: Zap, title: "Unite the Warriors", desc: "Build the most powerful decentralized army in history." },
              { icon: Flame, title: "Build the New Nation", desc: "Create real value, real power, and real freedom with $WON." },
            ].map((item, index) => (
              <div key={index} className="bg-[#050505] border border-white/10 p-9 rounded-3xl group hover:border-red-500/50 transition-colors">
                <item.icon className="w-10 h-10 mb-8 text-red-500 group-hover:rotate-12 transition" />
                <h3 className="font-bold text-[34px] tracking-[-1.5px] mb-5 leading-none">{item.title}</h3>
                <p className="text-white/75 text-[17px] leading-snug">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL STRIKE */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center border-t border-white/10">
        <div className="max-w-2xl mx-auto">
          <div className="text-red-500 tracking-[4px] text-sm font-medium mb-4">THE WAR IS HERE</div>
          <h2 className="text-7xl md:text-[76px] font-black tracking-[-4px] leading-none mb-8">Ready to flip<br />the entire system?</h2>
          <p className="text-2xl text-white/70 mb-12">One click. One token. One nation.</p>

          <button onClick={handleBuy} className="group inline-flex items-center justify-center gap-4 px-16 py-6 text-2xl font-black bg-white text-[#050505] rounded-3xl hover:bg-red-600 hover:text-white active:scale-[0.985] transition-all shadow-2xl">
            BUY $WON ON TOPBLAST.LOL
            <ArrowRight className="group-hover:translate-x-1 transition" size={28} />
          </button>

          <div className="mt-6 text-xs tracking-widest text-white/40">DIRECT LINK • REAL BONDING CURVE • NO BULLSHIT</div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-9 text-center text-xs text-white/40 tracking-wider">
        © {new Date().getFullYear()} $WON — WAR ON NATIONS<br />
        waronnations.fun • REAL ON-CHAIN DATA • REAL MOVEMENT
      </footer>
    </div>
  )
}

export default App
