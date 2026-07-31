import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowRight, Target, Users, Sword, Flame, Menu, X 
} from 'lucide-react'
import wonHand from './assets/won-hand.png'

const TOKEN_ADDRESS = "EQAmjezmAjiXZ7XfoLGQbNIm4CIEcQwM9CNbpTZJgcN9LeVi"

const TOPBLAST_LINK = `https://topblast.lol/?token=${TOKEN_ADDRESS}`
const X_LINK = "https://x.com/waronnations"
const TELEGRAM_LINK = "https://t.me/waronnations"

interface OnChainData {
  holders: number
  supply: number
  transactions: number
}

function App() {
  const [activated, setActivated] = useState(false)
  const [showWarCry, setShowWarCry] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const [onChainData, setOnChainData] = useState<OnChainData>({
    holders: 0,
    supply: 1,
    transactions: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  const fetchRealData = async () => {
    try {
      setIsLoading(true)
      const jettonRes = await fetch(`https://tonapi.io/v2/jettons/${TOKEN_ADDRESS}`)
      const jetton = await jettonRes.json()
      const holdersRes = await fetch(`https://tonapi.io/v2/jettons/${TOKEN_ADDRESS}/holders?limit=50`)
      const holdersData = await holdersRes.json()
      const txRes = await fetch(`https://tonapi.io/v2/blockchain/accounts/${TOKEN_ADDRESS}/transactions?limit=200`)
      const txData = await txRes.json()

      const rawSupply = parseFloat(jetton.total_supply || "0")
      const supplyInBillions = Math.floor(rawSupply / 1_000_000_000)

      setOnChainData({
        holders: holdersData.total || 0,
        supply: supplyInBillions,
        transactions: txData.transactions?.length || 0,
      })
    } catch (error) {
      console.error("Failed to fetch on-chain data")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchRealData()
    const interval = setInterval(fetchRealData, 60000)
    return () => clearInterval(interval)
  }, [])

  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const bodyRect = document.body.getBoundingClientRect().top
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition - bodyRect - offset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  const handleBuy = () => window.open(TOPBLAST_LINK, '_blank')
  const handleX = () => window.open(X_LINK, '_blank')
  const handleTelegram = () => window.open(TELEGRAM_LINK, '_blank')

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
            <img src={wonHand} alt="Wardog" className="w-11 h-11 rounded-2xl object-contain" />
            <div>
              <div className="font-black text-4xl tracking-[-4px] leading-none">$WARDOG</div>
              <div className="text-[10px] text-white/40 -mt-1 tracking-[4px]">WAR ON NATIONS</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-10 text-sm uppercase tracking-[3px] font-medium">
            <button onClick={() => scrollTo('symbol')} className="hover:text-red-500 transition-colors">THE SYMBOL</button>
            <button onClick={() => scrollTo('live')} className="hover:text-red-500 transition-colors">ON-CHAIN</button>
            <button onClick={() => scrollTo('manifesto')} className="hover:text-red-500 transition-colors">MANIFESTO</button>
            <button onClick={() => scrollTo('war')} className="hover:text-red-500 transition-colors">THE WAR</button>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={handleBuy} className="hidden md:flex items-center gap-2.5 px-8 py-2.5 bg-white text-[#050505] font-bold rounded-2xl hover:bg-red-600 hover:text-white transition-all text-sm tracking-wider">
              BUY $WARDOG
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden border-t border-white/10 bg-[#050505]">
              <div className="flex flex-col px-6 py-6 gap-6 text-lg">
                <button onClick={() => scrollTo('symbol')}>THE SYMBOL</button>
                <button onClick={() => scrollTo('live')}>ON-CHAIN</button>
                <button onClick={() => scrollTo('manifesto')}>MANIFESTO</button>
                <button onClick={() => scrollTo('war')}>THE WAR</button>
                <button onClick={handleBuy} className="mt-4 w-full py-4 bg-white text-[#050505] font-bold rounded-2xl">BUY $WARDOG</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO */}
      <section className="min-h-[100dvh] flex items-center justify-center pt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] bg-[length:4px_4px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/70 to-black" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-red-600/10 blur-[140px] rounded-full" />

        <div className="max-w-6xl mx-auto px-6 text-center z-10 relative">
          <div className="mb-1 flex justify-center">
            <svg viewBox="0 0 820 145" className="w-full max-w-[740px] h-auto">
              <text x="50%" y="98" textAnchor="middle" fontSize="135" fontWeight="900" fill="#111111" stroke="#111111" strokeWidth="30">$WARDOG</text>
              <text x="50%" y="98" textAnchor="middle" fontSize="135" fontWeight="900" fill="#ffffff">$WARDOG</text>
              <text x="50%" y="98" textAnchor="middle" fontSize="135" fontWeight="900" fill="none" stroke="#ef4444" strokeWidth="4" opacity="0.5">$WARDOG</text>
              <text x="50%" y="98" textAnchor="middle" fontSize="135" fontWeight="900" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.35">$WARDOG</text>
            </svg>
          </div>

          <h1 className="text-[60px] md:text-[84px] font-black tracking-[-5.5px] leading-none mb-2">WAR ON NATIONS</h1>
          <div className="h-[5px] w-28 mx-auto bg-gradient-to-r from-red-600 to-red-500 rounded-full mb-8" />

          <p className="max-w-lg mx-auto text-2xl md:text-[32px] font-medium tracking-[-1.2px] text-white/90 mb-10 leading-tight">
            One symbol.<br />One nation.<br />
            <span className="text-red-500">Zero tolerance.</span>
          </p>

          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-white/5 border border-white/10 rounded-full text-sm tracking-[1.5px]">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span>{onChainData.holders} WARDOGS JOINED</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => scrollTo('symbol')} className="px-10 py-5 border-2 border-white/30 hover:bg-white hover:text-[#050505] rounded-3xl text-lg font-semibold tracking-wider transition-all active:scale-[0.985]">
              DISCOVER THE SYMBOL
            </button>
            <button onClick={handleBuy} className="px-10 py-5 bg-white text-[#050505] font-bold rounded-3xl hover:bg-red-600 hover:text-white text-lg tracking-wider active:scale-[0.985] transition-all flex items-center justify-center gap-2">
              BUY $WARDOG NOW <ArrowRight />
            </button>
          </div>
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
              alt="Wardog Symbol"
              className="w-[280px] md:w-[400px] select-none"
              style={{
                filter: activated 
                  ? 'drop-shadow(0 0 120px rgba(239,68,68,0.8))' 
                  : 'drop-shadow(0 0 90px rgba(255,255,255,0.6))'
              }}
              animate={{ scale: activated ? 1.22 : 1 }}
              transition={{ type: "spring", stiffness: 180, damping: 14 }}
            />
            
            <AnimatePresence>
              {activated && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }} 
                  animate={{ opacity: 1, scale: 1.6 }} 
                  exit={{ opacity: 0 }} 
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 bg-red-600/25 blur-3xl rounded-full pointer-events-none" 
                />
              )}
            </AnimatePresence>
          </div>

          <div className="max-w-xl text-center">
            <p className="text-2xl md:text-3xl font-medium tracking-[-0.5px] mb-6">This is not just an emoji.<br />This is the mark of those who stayed.</p>
            <p className="text-xl text-white/70">Click it. Feel it. Then decide if you’re built for this.</p>
          </div>

          <button onClick={handleBuy} className="mt-12 px-10 py-4 bg-white text-[#050505] font-bold text-lg rounded-3xl hover:bg-red-600 hover:text-white active:scale-[0.985] transition-all">
            JOIN THE WAR — BUY $WARDOG
          </button>
        </div>
      </section>

      {/* ON-CHAIN DATA */}
      <section id="live" className="bg-[#0a0a0a] py-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-red-500 tracking-[4px] text-sm font-medium mb-3">LIVE FROM TON BLOCKCHAIN</div>
            <h2 className="text-6xl font-black tracking-[-3px]">Real Data. Real War.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "WARDOGS ACTIVATED", value: onChainData.holders, sub: "Unique holders on-chain" },
              { label: "TOTAL SUPPLY", value: "1B", sub: "Fixed. Fair. Forever." },
              { label: "ON-CHAIN ACTIVITY", value: onChainData.transactions, sub: "Total transactions" },
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                whileHover={{ y: -6 }}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#050505] border border-white/10 rounded-3xl p-8 hover:border-red-500/30 transition-all"
              >
                <div className="text-red-500 text-xs tracking-[3px] mb-4">{stat.label}</div>
                <div className="font-black text-6xl md:text-7xl tracking-[-3px] mb-2">{isLoading ? "..." : stat.value}</div>
                <div className="text-white/60 text-sm">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section id="manifesto" className="max-w-4xl mx-auto px-6 py-24 border-t border-white/10 text-center">
        <div className="text-red-500 tracking-[4px] text-sm font-medium mb-4">THE WARDOG CODE</div>
        <h2 className="text-6xl md:text-7xl font-black tracking-[-3.5px] mb-12">Manifesto</h2>
        <div className="max-w-2xl mx-auto space-y-8 text-2xl md:text-3xl font-medium tracking-[-0.5px] text-white/90">
          <p>We don’t ask for permission.</p>
          <p>We don’t wait for rescue.</p>
          <p>We stayed when others ran.</p>
          <p className="text-red-500">This is our war.<br />This is our nation.</p>
        </div>
      </section>

      {/* JOIN THE PACK */}
      <section className="max-w-5xl mx-auto px-6 py-20 border-t border-white/10">
        <div className="text-center mb-12">
          <div className="text-red-500 tracking-[4px] text-sm font-medium mb-3">BUILD THE PACK</div>
          <h2 className="text-6xl font-black tracking-[-3px]">Join The Movement</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <button onClick={handleX} className="group flex items-center justify-between px-8 py-7 bg-[#0a0a0a] border border-white/10 hover:border-white hover:bg-white/5 rounded-3xl transition-all active:scale-[0.985]">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-black">𝕏</div>
              <div className="text-left">
                <div className="font-bold text-2xl tracking-[-0.5px]">Follow on X</div>
                <div className="text-white/60">@waronnations</div>
              </div>
            </div>
            <ArrowRight className="group-hover:translate-x-1 transition text-white/60" />
          </button>

          <button onClick={handleTelegram} className="group flex items-center justify-between px-8 py-7 bg-[#0a0a0a] border border-white/10 hover:border-white hover:bg-white/5 rounded-3xl transition-all active:scale-[0.985]">
            <div className="flex items-center gap-4">
              <div className="text-3xl">📱</div>
              <div className="text-left">
                <div className="font-bold text-2xl tracking-[-0.5px]">Join on Telegram</div>
                <div className="text-white/60">t.me/waronnations</div>
              </div>
            </div>
            <ArrowRight className="group-hover:translate-x-1 transition text-white/60" />
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
            { icon: Target, title: "Fake Narratives", desc: "They divide nations for profit." },
            { icon: Flame, title: "Weak Leadership", desc: "They serve themselves, not the people." },
            { icon: Users, title: "Division Tactics", desc: "They want us fighting each other." },
          ].map((item, index) => (
            <motion.div 
              key={index} 
              whileHover={{ y: -6 }}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 40 }}
              transition={{ delay: index * 0.08 }}
              viewport={{ once: true }}
              className="group bg-[#050505] border border-white/10 p-8 rounded-3xl hover:border-red-500/40 transition-all"
            >
              <item.icon className="w-9 h-9 text-red-500 mb-8 group-hover:scale-110 transition" />
              <h3 className="font-bold text-3xl tracking-[-1px] mb-4">{item.title}</h3>
              <p className="text-white/70 text-[17px] leading-snug">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FINAL STRIKE */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center border-t border-white/10">
        <div className="max-w-2xl mx-auto">
          <div className="text-red-500 tracking-[4px] text-sm font-medium mb-4">THE WAR IS HERE</div>
          <h2 className="text-7xl md:text-[76px] font-black tracking-[-4px] leading-none mb-8">Ready to become<br />a Wardog?</h2>
          <p className="text-2xl text-white/70 mb-4">One click. One token. One nation.</p>
          <p className="text-lg text-white/60 mb-12">Respect for those who stayed.</p>

          <button onClick={handleBuy} className="group inline-flex items-center justify-center gap-4 px-16 py-6 text-2xl font-black bg-white text-[#050505] rounded-3xl hover:bg-red-600 hover:text-white active:scale-[0.985] transition-all shadow-2xl">
            BUY $WARDOG ON TOPBLAST
            <ArrowRight className="group-hover:translate-x-1 transition" size={28} />
          </button>
        </div>
      </section>

      <footer className="border-t border-white/10 py-9 text-center text-xs text-white/40 tracking-wider">
        © {new Date().getFullYear()} $WARDOG — WAR ON NATIONS<br />
        REAL ON-CHAIN • REAL PACK • REAL MOVEMENT
      </footer>

      {/* War Cry Overlay */}
      <AnimatePresence>
        {showWarCry && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none bg-black/70">
            <div className="text-[72px] md:text-[92px] font-black tracking-[-6px] text-red-600 drop-shadow-[0_0_100px_rgb(185,28,28)]">
              RESPECT THE PACK
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
