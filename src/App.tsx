import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, Swords, Zap, Trophy, Flag, Users, Menu, X,
  ExternalLink, Copy, Check, Dices
} from 'lucide-react'
import wonHand from './assets/won-hand.png'
import catHand from './assets/cat-hand.png'

const WARDOG_CA = "EQAmjezmAjiXZ7XfoLGQbNIm4CIEcQwM9CNbpTZJgcN9LeVi"
const WARCAT_CA = "EQDMqYAfQ1FnMpvkm4aJstq2Gx2ebPLq9vcBfPSxoBNw1kqb"

const TOPBLAST_WARDOG = `https://topblast.lol/?token=${WARDOG_CA}`
const GAME_LINK = "https://t.me/waronnationsgamebot?startapp=WAR-Q73AC2"
const X_LINK = "https://x.com/waronnations"
const TG_LINK = "https://t.me/waronnations"
const TONVIEWER_ACCOUNT = `https://tonviewer.com/${WARDOG_CA}`

interface RecentTx {
  time: string
  hash: string
  link: string
}

interface OnChainData {
  holders: number
  supply: string
  latestTx: string
  recent: RecentTx[]
}

const ranks = [
  { name: "Private", glory: "0" },
  { name: "Corporal", glory: "1k" },
  { name: "Sergeant", glory: "5k" },
  { name: "Lieutenant", glory: "20k" },
  { name: "Captain", glory: "50k" },
  { name: "Major", glory: "120k" },
  { name: "Colonel", glory: "300k" },
  { name: "General", glory: "750k" },
  { name: "Warlord", glory: "2M+" },
]

const features = [
  { icon: Swords, title: "MERGE", desc: "Drag same faction & tier. Dogs fuse with dogs. Cats with cats. Higher tiers hit harder." },
  { icon: Zap, title: "ENERGY", desc: "Every merge costs energy. It regenerates. Or buy more with tokens in the Shop." },
  { icon: Dices, title: "NUKE", desc: "Strike countries. Massive glory + $WARDOG + $WARCAT drops." },
  { icon: Flag, title: "NATIONS", desc: "Claim empty countries. Lead the pack. Hostile takeovers available." },
  { icon: Trophy, title: "RANKS", desc: "Private → Warlord. Glory is the only ladder that matters." },
  { icon: Users, title: "RECRUIT", desc: "Invite soldiers. Instant glory + milestone token rewards." },
]

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [copiedDog, setCopiedDog] = useState(false)
  const [copiedCat, setCopiedCat] = useState(false)
  const [onChainData, setOnChainData] = useState<OnChainData>({
    holders: 0,
    supply: '1B',
    latestTx: '—',
    recent: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [activated, setActivated] = useState(false)

  const fetchRealData = async () => {
    try {
      setIsLoading(true)
      setHasError(false)

      // Jetton info
      const jettonRes = await fetch(`https://tonapi.io/v2/jettons/${WARDOG_CA}`)
      if (!jettonRes.ok) throw new Error(`Jetton API ${jettonRes.status}`)
      const jetton = await jettonRes.json()

      // Recent events
      const eventsRes = await fetch(
        `https://tonapi.io/v2/accounts/${WARDOG_CA}/events?limit=10`
      )
      if (!eventsRes.ok) throw new Error(`Events API ${eventsRes.status}`)
      const eventsData = await eventsRes.json()
      const events = eventsData.events || []

      const now = Math.floor(Date.now() / 1000)

      const formatTime = (ts: number) => {
        const diff = now - ts
        if (diff < 60) return 'just now'
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
        return `${Math.floor(diff / 86400)}d ago`
      }

      const recent: RecentTx[] = events.slice(0, 5).map((e: any) => {
        const txHash =
          e.actions?.[0]?.base_transactions?.[0] ||
          e.event_id ||
          ''

        return {
          time: formatTime(e.timestamp),
          hash: txHash ? `${txHash.slice(0, 8)}…${txHash.slice(-6)}` : '••••••••',
          link: txHash
            ? `https://tonviewer.com/transaction/${txHash}`
            : TONVIEWER_ACCOUNT,
        }
      })

      setOnChainData({
        holders: jetton.holders_count || 0,
        supply: '1B',
        latestTx: recent[0]?.time || '—',
        recent,
      })
    } catch (e) {
      console.error('On-chain fetch error:', e)
      setHasError(true)
      // Keep previous data — do not overwrite with zeros
    } finally {
      setIsLoading(false)
    }
  }

  // Automatic polling every 45 seconds
  useEffect(() => {
    fetchRealData()
    const id = setInterval(fetchRealData, 45000)
    return () => clearInterval(id)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  const copy = (addr: string, type: 'dog' | 'cat') => {
    navigator.clipboard.writeText(addr)
    if (type === 'dog') {
      setCopiedDog(true)
      setTimeout(() => setCopiedDog(false), 2000)
    } else {
      setCopiedCat(true)
      setTimeout(() => setCopiedCat(false), 2000)
    }
  }

  const handleHand = () => {
    setActivated(true)
    setTimeout(() => setActivated(false), 1600)
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#c8102e]">
      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-[#050505]/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src={wonHand} alt="WARDOG" className="w-10 h-10 rounded-xl object-contain" />
            <div>
              <div className="font-black text-2xl tracking-tighter leading-none">$WARDOG</div>
              <div className="text-[9px] text-white/40 tracking-[3px] -mt-0.5">WAR ON NATIONS</div>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-[2px]">
            <button onClick={() => scrollTo('game')} className="hover:text-[#c8102e] transition">Game</button>
            <button onClick={() => scrollTo('tokens')} className="hover:text-[#c8102e] transition">Tokens</button>
            <button onClick={() => scrollTo('factions')} className="hover:text-[#c8102e] transition">Factions</button>
            <button onClick={() => scrollTo('ranks')} className="hover:text-[#c8102e] transition">Ranks</button>
            <button onClick={() => scrollTo('manifesto')} className="hover:text-[#c8102e] transition">Manifesto</button>
          </div>

          <div className="flex items-center gap-3">
            <a href={GAME_LINK} target="_blank" rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#c8102e] text-white font-bold text-sm rounded-xl hover:bg-red-700 transition active:scale-95">
              PLAY NOW
            </a>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-white/10 bg-[#050505]"
            >
              <div className="flex flex-col px-6 py-6 gap-5 text-lg font-medium">
                {['game', 'tokens', 'factions', 'ranks', 'manifesto'].map(id => (
                  <button key={id} onClick={() => scrollTo(id)} className="text-left capitalize">{id}</button>
                ))}
                <a href={GAME_LINK} target="_blank" rel="noreferrer"
                  className="mt-2 w-full py-4 bg-[#c8102e] text-center font-bold rounded-xl">
                  PLAY NOW
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO */}
      <section className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#c8102e18,transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#05050500,#050505)]" />

        <div className="relative z-10 max-w-6xl mx-auto px-5 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 text-xs tracking-widest uppercase mb-8">
              <span className="w-2 h-2 rounded-full bg-[#c8102e] animate-pulse" />
              Live on Telegram + TON
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-6">
              WAR ON<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#c8102e]">NATIONS</span>
            </h1>

            <p className="text-xl sm:text-2xl text-white/70 font-medium tracking-wide mb-3">
              Merge. Build. Conquer. Feed the Pack.
            </p>
            <p className="text-base text-white/40 max-w-xl mx-auto mb-10">
              Fuse WARDOG & WARCAT units. Earn both tokens. Claim countries. Rise from Private to Warlord.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <a href={GAME_LINK} target="_blank" rel="noreferrer"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#c8102e] hover:bg-red-700 text-white font-black text-lg rounded-2xl transition-all active:scale-[0.98] shadow-[0_0_40px_#c8102e40]">
                OPEN IN TELEGRAM
                <ArrowRight className="group-hover:translate-x-1 transition" size={22} />
              </a>
              <a href={TOPBLAST_WARDOG} target="_blank" rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-[#050505] font-black text-lg rounded-2xl hover:bg-gray-100 transition active:scale-[0.98]">
                BUY $WARDOG
              </a>
            </div>

            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-[#9b2d8c]/40 bg-[#9b2d8c]/10 text-sm">
              <span className="text-[#e070d0] font-bold">$WARCAT</span>
              <span className="text-white/50">requires routing through</span>
              <span className="text-[#c8102e] font-bold">$WARDOG</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* GAME LOOP */}
      <section id="game" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4">THE WAR MACHINE</h2>
            <p className="text-white/50 max-w-2xl mx-auto">Every action feeds both tokens. Merge → earn → claim → conquer.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative p-6 rounded-3xl border border-white/10 bg-white/[0.03] hover:border-[#c8102e]/40 hover:bg-[#c8102e]/5 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#c8102e]/15 flex items-center justify-center mb-5 group-hover:scale-110 transition">
                  <f.icon className="text-[#c8102e]" size={24} />
                </div>
                <h3 className="text-xl font-black tracking-tight mb-2">{f.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TOKENS */}
      <section id="tokens" className="py-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#c8102e0c,transparent_70%)]" />
        <div className="relative max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4">TWO TOKENS. ONE PACK.</h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              $WARDOG is the gate. $WARCAT liquidity only exists paired with $WARDOG.
              You cannot cleanly buy $WARCAT with TON. You route through the dog.
            </p>
          </div>

          <div className="mb-12 p-6 rounded-3xl border border-[#9b2d8c]/40 bg-gradient-to-r from-[#9b2d8c]/10 to-[#c8102e]/10 text-center">
            <p className="text-lg sm:text-xl font-bold">
              <span className="text-[#e070d0]">$WARCAT LP</span> is only added with <span className="text-[#c8102e]">$WARDOG LP</span>.
              <br className="hidden sm:block" />
              <span className="text-white/70 text-base font-medium">To acquire $WARCAT you must first hold $WARDOG and route through it.</span>
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-12">
            {/* WARDOG Card */}
            <div className="p-8 rounded-3xl border border-[#c8102e]/40 bg-gradient-to-br from-[#c8102e]/10 to-black">
              <div className="flex items-center gap-3 mb-6">
                <img src={wonHand} alt="WARDOG" className="w-14 h-14 rounded-2xl object-contain" />
                <div>
                  <h3 className="text-2xl font-black text-[#c8102e]">$WARDOG</h3>
                  <p className="text-sm text-white/50">Primary • Entry Gate • Main Liquidity</p>
                </div>
              </div>
              <p className="text-white/60 text-sm mb-6 leading-relaxed">
                The frontline token. Buy this first. All meaningful liquidity starts here.
                Earned in-game from merges, nukes, ranks and claims.
              </p>
              <div className="font-mono text-xs text-white/40 break-all mb-4 bg-black/40 p-3 rounded-xl">
                {WARDOG_CA}
              </div>
              <div className="flex gap-3">
                <button onClick={() => copy(WARDOG_CA, 'dog')}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-sm font-bold transition">
                  {copiedDog ? <Check size={16} /> : <Copy size={16} />}
                  {copiedDog ? 'COPIED' : 'COPY'}
                </button>
                <a href={TOPBLAST_WARDOG} target="_blank" rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#c8102e] hover:bg-red-700 text-sm font-bold transition">
                  BUY <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* WARCAT Card */}
            <div className="p-8 rounded-3xl border border-[#9b2d8c]/40 bg-gradient-to-br from-[#9b2d8c]/10 to-black">
              <div className="flex items-center gap-3 mb-6">
                <img src={catHand} alt="WARCAT" className="w-14 h-14 rounded-2xl object-contain" />
                <div>
                  <h3 className="text-2xl font-black text-[#e070d0]">$WARCAT</h3>
                  <p className="text-sm text-white/50">Sister • Route-Only • Pack Synergy</p>
                </div>
              </div>
              <p className="text-white/60 text-sm mb-6 leading-relaxed">
                Liquidity is intentionally paired only with $WARDOG.
                No clean TON route. Hold the dog → swap into the cat.
                Earned alongside $WARDOG in every meaningful action.
              </p>
              <div className="font-mono text-xs text-white/40 break-all mb-4 bg-black/40 p-3 rounded-xl">
                {WARCAT_CA}
              </div>
              <div className="flex gap-3">
                <button onClick={() => copy(WARCAT_CA, 'cat')}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-sm font-bold transition">
                  {copiedCat ? <Check size={16} /> : <Copy size={16} />}
                  {copiedCat ? 'COPIED' : 'COPY'}
                </button>
                <a href={`https://tonviewer.com/${WARCAT_CA}`} target="_blank" rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-[#9b2d8c]/50 hover:bg-[#9b2d8c]/20 text-sm font-bold transition">
                  VIEW <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Live data */}
          <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-white/[0.03]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg sm:text-xl font-black">LIVE $WARDOG ON-CHAIN</h3>
              <div className="flex items-center gap-2 text-xs text-white/40">
                <span className={`w-2 h-2 rounded-full ${
                  hasError ? 'bg-red-500' : isLoading ? 'bg-yellow-500' : 'bg-green-500'
                } animate-pulse`} />
                {hasError ? 'Retrying…' : isLoading ? 'Syncing…' : 'Live • 45s'}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-8">
              <div>
                <div className="text-2xl sm:text-4xl font-black tabular-nums">
                  {isLoading && onChainData.holders === 0 ? '…' : onChainData.holders}
                </div>
                <div className="text-[10px] sm:text-xs text-white/40 mt-1 uppercase tracking-wider">
                  Holders
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-4xl font-black tabular-nums">
                  {onChainData.supply}
                </div>
                <div className="text-[10px] sm:text-xs text-white/40 mt-1 uppercase tracking-wider">
                  Supply
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-4xl font-black tabular-nums">
                  {isLoading && onChainData.latestTx === '—' ? '…' : onChainData.latestTx}
                </div>
                <div className="text-[10px] sm:text-xs text-white/40 mt-1 uppercase tracking-wider">
                  Latest
                </div>
              </div>
            </div>

            {/* Recent transactions with individual links */}
            {onChainData.recent.length > 0 ? (
              <div className="space-y-2.5 mb-6">
                {onChainData.recent.map((tx, i) => (
                  <a
                    key={tx.hash + i}
                    href={tx.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between text-sm px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#c8102e]/40 hover:bg-[#c8102e]/5 transition group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-white/40 font-mono text-xs">{tx.hash}</span>
                      <span className="text-white/70">{tx.time}</span>
                    </div>
                    <ExternalLink size={14} className="text-white/30 group-hover:text-[#c8102e] transition" />
                  </a>
                ))}
              </div>
            ) : hasError ? (
              <div className="mb-6 text-center text-sm text-white/40 py-4">
                Unable to load recent activity. Retrying automatically…
              </div>
            ) : null}

            {/* View all button */}
            <a
              href={TONVIEWER_ACCOUNT}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-sm font-bold transition"
            >
              View all activity on Tonviewer
              <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* FACTIONS */}
      <section id="factions" className="py-24 bg-gradient-to-b from-transparent via-[#c8102e08] to-transparent">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4">TWO FACTIONS. ONE WAR.</h2>
            <p className="text-white/50">Dogs and cats. Same battlefield. Different teeth. Same tokens.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-3xl border border-orange-500/30 bg-gradient-to-br from-orange-950/40 to-black p-8">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 blur-[80px] rounded-full" />
              <div className="relative">
                <img src={wonHand} alt="WARDOG" className="w-20 h-20 mb-4 rounded-2xl object-contain" />
                <h3 className="text-3xl font-black tracking-tighter text-orange-400 mb-2">WARDOG</h3>
                <p className="text-white/60 mb-6">Loyal. Relentless. Pack hunters. The original force that stayed.</p>
                <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
                  <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-300">Primary Token</span>
                  <span className="px-3 py-1 rounded-full bg-white/10">Frontline</span>
                </div>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-950/40 to-black p-8">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 blur-[80px] rounded-full" />
              <div className="relative">
                <img src={catHand} alt="WARCAT" className="w-20 h-20 mb-4 rounded-2xl object-contain" />
                <h3 className="text-3xl font-black tracking-tighter text-purple-400 mb-2">WARCAT</h3>
                <p className="text-white/60 mb-6">Silent. Precise. Independent killers. They appear when the night is darkest.</p>
                <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300">Sister Token</span>
                  <span className="px-3 py-1 rounded-full bg-white/10">Route-Only</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* RANKS */}
      <section id="ranks" className="py-24">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4">FROM PRIVATE TO WARLORD</h2>
            <p className="text-white/50">Glory is the only currency that matters.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {ranks.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`px-5 py-3 rounded-2xl border text-center min-w-[110px] ${
                  i === ranks.length - 1
                    ? 'border-[#ffd166]/50 bg-[#ffd166]/10 text-[#ffd166]'
                    : 'border-white/10 bg-white/[0.03]'
                }`}
              >
                <div className="text-xs text-white/40 mb-1">{r.glory}</div>
                <div className="font-black text-sm tracking-tight">{r.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section id="manifesto" className="py-24">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <motion.div onClick={handleHand} className="cursor-pointer inline-block mb-10" whileTap={{ scale: 0.95 }}>
            <img
              src={wonHand}
              alt="Respect the Pack"
              className={`w-28 h-28 mx-auto rounded-3xl object-contain transition-all duration-500 ${activated ? 'scale-125 rotate-12 brightness-125' : ''}`}
            />
          </motion.div>

          <h2 className="text-4xl sm:text-6xl font-black tracking-tighter mb-8 leading-none">
            RESPECT<br />THE PACK
          </h2>

          <div className="space-y-6 text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
            <p>We don’t ask permission.</p>
            <p>We don’t wait for rescue.</p>
            <p>We stayed when the others ran.</p>
            <p className="text-white font-medium">We merge. We claim. We feed both tokens. We feed the pack.</p>
          </div>

          <div className="mt-14 flex flex-col sm:flex-row gap-4 justify-center">
            <a href={GAME_LINK} target="_blank" rel="noreferrer"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#c8102e] font-black text-lg rounded-2xl hover:bg-red-700 transition">
              JOIN THE WAR
            </a>
            <a href={X_LINK} target="_blank" rel="noreferrer"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 border border-white/20 font-bold text-lg rounded-2xl hover:bg-white/5 transition">
              FOLLOW @WARONNATIONS
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={wonHand} alt="" className="w-8 h-8 rounded-lg" />
            <div>
              <div className="font-black text-lg tracking-tighter">$WARDOG + $WARCAT</div>
              <div className="text-[10px] text-white/40 tracking-widest">WAR ON NATIONS</div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-white/40">
            <a href={GAME_LINK} target="_blank" rel="noreferrer" className="hover:text-white transition">Play</a>
            <a href={X_LINK} target="_blank" rel="noreferrer" className="hover:text-white transition">X</a>
            <a href={TG_LINK} target="_blank" rel="noreferrer" className="hover:text-white transition">Telegram</a>
            <a href={TOPBLAST_WARDOG} target="_blank" rel="noreferrer" className="hover:text-white transition">Buy $WARDOG</a>
          </div>

          <div className="text-xs text-white/30 tracking-wider text-center md:text-right">
            © {new Date().getFullYear()} WAR ON NATIONS<br />
            REAL ON-CHAIN • REAL PACK • REAL ROUTING
          </div>
        </div>
      </footer>
    </div>
  )
}
