import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useInView } from 'framer-motion'
import { ChevronRight, MessageSquare, X, Menu, ArrowUp, ArrowRight, Shield, Headphones, Cpu } from 'lucide-react'

// ⚠️ Atualize com seu número real (código do país + DDD + número, sem espaços)
const WHATSAPP_NUMBER = '5500000000000'

const navItems = [
  { label: 'INÍCIO', href: '#inicio' },
  { label: 'SOLUÇÕES', href: '#solucoes' },
  { label: 'SOBRE NÓS', href: '#sobre-nos' },
]

const statsData = [
  { value: 50, suffix: '+', label: 'Projetos Concluídos' },
  { value: 5, suffix: '+', label: 'Anos de Experiência' },
  { value: 100, suffix: '%', label: 'Clientes Satisfeitos' },
  { value: 24, suffix: '/7', label: 'Suporte Técnico' },
]

const testimonialsData = [
  {
    name: 'Ricardo Almeida',
    role: 'Empresário',
    text: 'A Maxiimus Tech transformou completamente a experiência de morar na minha casa. O sistema de segurança e iluminação integrados são impressionantes.',
  },
  {
    name: 'Camila Santos',
    role: 'Arquiteta',
    text: 'Indico a Maxiimus para todos os meus projetos. A integração dos sistemas é impecável e o suporte técnico é excepcional.',
  },
  {
    name: 'Fernando Costa',
    role: 'Médico',
    text: 'Chegar em casa e ter tudo funcionando automaticamente na temperatura e iluminação ideais não tem preço. Melhor investimento que fiz.',
  },
]

const benefitsData = [
  {
    id: 'seguranca',
    img: '/assets/câmera.gif',
    title: 'Segurança Máxima',
    desc: 'Monitoramento 24h e controle de acesso integrado na palma da sua mão.',
    large: true,
    fullDesc: 'A segurança do seu lar em um novo patamar. Monitoramento contínuo em ultra-resolução, integração com inteligência artificial para detecção de rostos conhecidos e fechaduras biométricas. Tudo projetado para oferecer a máxima tranquilidade, acessível em tempo real pelo seu smartphone.',
    gallery: ['/assets/fechadura.png', '/assets/câmera.gif'],
    features: ['Câmeras com IA e Visão Noturna', 'Fechaduras Biométricas e Faciais', 'Notificações de Invasão em Tempo Real', 'Sistema de Alarmes Inteligente']
  },
  {
    id: 'controle',
    img: '/assets/poder nas mãos.gif',
    title: 'O Controle Nas Suas Mãos',
    desc: 'Ter o poder em suas mãos significa utilizar ferramentas que traduzem complexidade em simplicidade.',
    large: false,
    fullDesc: 'A automação residencial deve ser invisível, trabalhando para você. Com o nosso sistema, você integra todos os dispositivos smart num único aplicativo de uso intuitivo. Assuma o controle total da sua casa por voz ou por um toque, de qualquer cômodo ou até mesmo de outro país.',
    gallery: ['/assets/poder nas mãos.gif'],
    features: ['Aplicativo Único Intuitivo', 'Comandos de Voz (Alexa, Google, Siri)', 'Criação de Rotinas e Cenários Personalizados', 'Acesso e Controle Remoto Global']
  },
  {
    id: 'conforto',
    img: '/assets/cinema animação.gif',
    title: 'Conforto Absoluto',
    desc: 'Modo Cinema. Cenários perfeitamente ajustados a sua rotina.',
    large: true,
    fullDesc: 'O sistema entende e se adapta a você. Com o modo "Cinema", luzes dimerizam lentamente, o projetor é acionado, cortinas se fecham e a climatização se ajusta. Cada momento na sua casa, desde o despertar ao dormir, é amplificado por um conforto sem precedentes.',
    gallery: ['/assets/cinema animação.gif', '/assets/receiver.png', '/assets/ar-condicionado.gif', '/assets/iluminação diimer.gif'],
    features: ['Áudio Alta Fidelidade Integrado', 'Termostatos e Climatização Inteligente', 'Iluminação Dimerizável e Cenográfica', 'Integração de Cortinas e Persianas']
  }
]

// ─── Scroll Progress Bar ───────────────────────────────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[200] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: 'linear-gradient(90deg, rgba(94,234,212,0.4), #5eead4, rgba(94,234,212,0.4))'
      }}
    />
  )
}

// ─── Animated Counter ──────────────────────────────────────────────────────────
function AnimatedCounter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let current = 0
    const increment = to / (2000 / 16)
    const timer = setInterval(() => {
      current += increment
      if (current >= to) {
        setCount(to)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, to])

  return <span ref={ref}>{count}{suffix}</span>
}

// ─── Video Hero (boomerang) ────────────────────────────────────────────────────
function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let direction = 1
    let frameId: number

    const animate = () => {
      if (!video.duration) {
        frameId = requestAnimationFrame(animate)
        return
      }
      if (direction === 1) {
        if (video.currentTime >= video.duration - 0.05) {
          direction = -1
          video.pause()
        }
      } else {
        video.currentTime -= 0.033
        if (video.currentTime <= 0.05) {
          direction = 1
          video.play().catch(() => {})
        }
      }
      frameId = requestAnimationFrame(animate)
    }

    frameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameId)
  }, [])

  return (
    <video ref={videoRef} className="hero-video" autoPlay muted playsInline preload="auto">
      <source src="/assets/casa animação.mp4" type="video/mp4" />
    </video>
  )
}

// ─── Mobile Menu ───────────────────────────────────────────────────────────────
function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] bg-black/70 backdrop-blur-sm md:hidden"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="absolute right-0 top-0 h-full w-72 bg-[#050B14]/98 border-l border-white/10 p-8 flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="self-end mb-8 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
          aria-label="Fechar menu"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-10 pb-6 border-b border-white/5">
          <img src="/assets/logo.png" alt="Logo" className="w-8 h-8" />
          <div>
            <div className="font-semibold tracking-wider text-sm">MAXIIMUS TECH</div>
            <div className="text-[0.5rem] text-accent tracking-[2px] uppercase">TECNOLOGIA RESIDENCIAL</div>
          </div>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 + 0.1 }}
              className="py-3 px-4 rounded-xl text-sm font-medium tracking-wider hover:bg-accent/10 hover:text-accent transition-colors"
              onClick={onClose}
            >
              {item.label}
            </motion.a>
          ))}
          <motion.a
            href="#contato"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: navItems.length * 0.06 + 0.1 }}
            className="py-3 px-4 rounded-xl text-sm font-medium tracking-wider hover:bg-accent/10 hover:text-accent transition-colors"
            onClick={onClose}
          >
            CONTATO
          </motion.a>
        </nav>

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-accent/10 border border-accent/30 text-accent font-bold py-3 px-6 rounded-full hover:bg-accent/20 transition-colors text-sm mt-6"
          onClick={onClose}
        >
          <MessageSquare size={16} />
          Agendar Orçamento
        </a>
      </motion.div>
    </motion.div>
  )
}

// ─── Benefit Card ──────────────────────────────────────────────────────────────
function BenefitCard({ img, title, desc, large, onClick }: {
  img: string; title: string; desc: string; large?: boolean; onClick?: () => void
}) {
  return (
    <div className="benefit-card group cursor-pointer" onClick={onClick}>
      <div className={`mx-auto mb-6 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 ${large ? 'w-[300px] h-[200px] -mt-10' : 'w-24 h-24'}`}>
        <img src={img} alt={title} loading="lazy" className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(94,234,212,0.3)]" />
      </div>
      <h3 className="text-xl font-['Rajdhani'] font-bold mb-3 tracking-wider group-hover:text-accent transition-colors duration-300 flex items-center justify-center gap-2">
        {title}
        <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity text-accent -ml-1" />
      </h3>
      <p className="text-text-secondary text-sm leading-relaxed">{desc}</p>
      <div className="mt-6 text-xs text-accent/40 group-hover:text-accent/80 transition-colors flex items-center justify-center gap-1">
        <span>Saiba mais</span>
        <ChevronRight size={12} />
      </div>
    </div>
  )
}

// ─── Feature Row ───────────────────────────────────────────────────────────────
function FeatureRow({ tag, title, desc, list, visual, reverse }: {
  tag: string; title: string; desc: string; list: string[]; visual: React.ReactNode; reverse?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8 }}
      className={`flex flex-col md:flex-row items-center gap-12 md:gap-20 ${reverse ? 'md:flex-row-reverse' : ''}`}
    >
      <div className="flex-1 space-y-6">
        <span className="feature-tag">{tag}</span>
        <h2 className="text-4xl font-bold leading-tight">{title}</h2>
        <p className="text-text-secondary text-lg leading-relaxed">{desc}</p>
        <ul className="space-y-3">
          {list.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: reverse ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 + 0.3 }}
              className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border-l-[3px] border-accent"
            >
              <ChevronRight size={16} className="text-accent shrink-0" />
              <span className="text-sm font-medium">{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>
      <div className="flex-1 flex justify-center items-center w-full">
        <div className="relative bg-teal-500/5 rounded-[2.5rem] p-2 border border-teal-500/10 shadow-[0_0_50px_rgba(20,184,166,0.1)] transition-all duration-500 hover:shadow-[0_0_70px_rgba(20,184,166,0.2)] hover:scale-[1.02]">
          {visual}
        </div>
      </div>
    </motion.div>
  )
}

// ─── App ───────────────────────────────────────────────────────────────────────
function App() {
  const [selectedBenefit, setSelectedBenefit] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const benefitsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      setShowScrollTop(window.scrollY > 600)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const grid = benefitsRef.current
    if (!grid) return
    const handleMouseMove = (e: MouseEvent) => {
      const cards = grid.getElementsByClassName('benefit-card')
      for (const card of cards as HTMLCollectionOf<HTMLElement>) {
        const rect = card.getBoundingClientRect()
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
      }
    }
    grid.addEventListener('mousemove', handleMouseMove)
    return () => grid.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen text-white font-sans selection:bg-accent/30">
      <a href="#inicio" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:bg-accent focus:text-black focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold">
        Pular para o conteúdo
      </a>
      <ScrollProgress />

      <AnimatePresence>
        {mobileMenuOpen && <MobileMenu key="mobile-menu" onClose={() => setMobileMenuOpen(false)} />}
      </AnimatePresence>

      {/* Abstract Background */}
      <div className="bg-abstract overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path d="M-100,600 C200,400 600,800 1200,200" fill="none" stroke="var(--accent)" strokeWidth="0.5" strokeDasharray="10 5" opacity="0.1" />
          <path d="M1500,100 C1200,400 800,0 400,600" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.05" />
          <circle cx="20%" cy="30%" r="400" fill="none" stroke="var(--accent)" strokeWidth="2" opacity="0.03" />
          <circle cx="85%" cy="75%" r="300" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.05" />
          <circle cx="10%" cy="20%" r="300" fill="url(#glow)" />
          <circle cx="90%" cy="80%" r="250" fill="url(#glow)" />
          <circle cx="50%" cy="50%" r="400" fill="url(#glow)" opacity="0.5" />
        </svg>
      </div>

      <div className="absolute top-0 right-0 w-full h-full pointer-events-none z-0">
        <svg width="100%" height="100%" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="60%" cy="40%" rx="600" ry="400" fill="none" stroke="var(--accent)" strokeWidth="0.8" opacity="0.08" />
          <ellipse cx="65%" cy="38%" rx="580" ry="380" fill="none" stroke="var(--accent)" strokeWidth="0.5" opacity="0.04" />
        </svg>
      </div>

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <header className={`px-[4vw] fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-3 bg-[#020406]/88 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.4)]' : 'py-6'}`}>
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <a href="#inicio" className="flex items-center gap-3">
            <img src="/assets/logo.png" alt="Maxiimus Tech Logo" className="w-9 h-9" />
            <div className="flex flex-col">
              <span className="font-semibold text-lg tracking-wider leading-none">MAXIIMUS TECH</span>
              <span className="text-[0.55rem] text-accent tracking-[2px] uppercase mt-1">TECNOLOGIA RESIDENCIAL</span>
            </div>
          </a>

          <ul className="hidden md:flex gap-10 items-center text-sm font-light tracking-wide">
            {navItems.map(item => (
              <li key={item.label}>
                <a href={item.href} className="hover:text-accent transition-colors duration-200">{item.label}</a>
              </li>
            ))}
            <li>
              <a href="#contato" className="bg-white text-black font-semibold py-2 px-5 rounded-full hover:bg-gray-200 transition-colors">CONTATO</a>
            </li>
          </ul>

          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu size={20} />
          </button>
        </nav>
      </header>

      <main>
        {/* ── HERO ───────────────────────────────────────────────────────────── */}
        <section id="inicio" className="relative min-h-screen flex items-start px-[4vw] overflow-hidden">
          <VideoHero />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020406]/60 via-transparent to-[#020406]/60 z-[1] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020406] via-[#020406]/60 to-transparent z-[2] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-start pt-36 md:pt-52 pb-24 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="space-y-6"
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="inline-block bg-accent/10 border border-accent/20 text-accent text-xs font-bold tracking-[3px] uppercase px-4 py-2 rounded-full"
              >
                Automação Residencial Premium
              </motion.span>

              <h1 className="font-['Rajdhani'] text-5xl md:text-6xl lg:text-7xl leading-tight uppercase tracking-wider">
                <span className="font-medium text-accent">O FUTURO JÁ ESTÁ</span><br />
                <span className="font-bold">NO PRESENTE</span>
              </h1>

              <p className="text-text-secondary text-sm md:text-base leading-relaxed max-w-lg">
                Transforme sua casa em um ecossistema inteligente que trabalha para você. Controle iluminação, segurança e climatização com um toque ou por comando de voz.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 pt-2"
              >
                <a
                  href="#solucoes"
                  className="inline-flex items-center justify-center gap-2 bg-accent text-black font-bold py-3 px-8 rounded-full hover:bg-accent/90 hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(94,234,212,0.25)]"
                >
                  Ver Soluções
                  <ArrowRight size={18} />
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 bg-white/5 backdrop-blur-md text-white font-medium py-3 px-8 rounded-full hover:bg-white/10 hover:scale-105 transition-all duration-300"
                >
                  <MessageSquare size={18} className="text-accent" />
                  Falar no WhatsApp
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── BENEFITS ───────────────────────────────────────────────────────── */}
        <section className="py-20 px-[4vw] relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <h2 className="text-4xl font-bold mb-2">O Poder da Casa Conectada</h2>
            <p className="text-accent tracking-wider">Por que investir em automação residencial?</p>
          </motion.div>

          <div ref={benefitsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {benefitsData.map((data, i) => (
              <motion.div
                key={data.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <BenefitCard
                  img={data.img}
                  title={data.title}
                  desc={data.desc}
                  large={data.large}
                  onClick={() => setSelectedBenefit(data.id)}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── STATS ──────────────────────────────────────────────────────────── */}
        <section className="py-16 px-[4vw] relative z-20">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {statsData.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-accent/20 hover:bg-accent/[0.04] transition-all duration-500"
              >
                <div className="text-4xl md:text-5xl font-['Rajdhani'] font-bold text-accent mb-2">
                  <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-text-secondary text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── DEPOIMENTOS ─────────────────────────────────────────────────── */}
        <section className="py-20 px-[4vw] relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <span className="feature-tag">Depoimentos</span>
            <h2 className="text-4xl font-bold mt-4 mb-2">O Que Nossos Clientes Dizem</h2>
            <p className="text-text-secondary">Experiências reais de quem confia na Maxiimus Tech</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {testimonialsData.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-accent/20 hover:bg-accent/[0.03] transition-all duration-500"
              >
                <svg className="w-10 h-10 text-accent/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-text-secondary text-sm leading-relaxed mb-6">{t.text}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-text-secondary">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── FEATURE ROWS ───────────────────────────────────────────────────── */}
        <section id="solucoes" className="space-y-32 py-20 px-[4vw] max-w-7xl mx-auto relative z-20">
          <FeatureRow
            tag="PROTEÇÃO"
            title="Segurança e Controle de Acesso"
            desc="O futuro da proteção domiciliar chegou. Nossas fechaduras biométricas inteligentes e câmeras com IA não apenas registram, mas compreendem quem está na sua porta."
            list={["Fechaduras com leitor facial", "Visão noturna avançada", "Notificações instantâneas"]}
            visual={
              <div className="relative w-[280px] aspect-[3/4] flex items-center justify-center overflow-hidden rounded-2xl">
                <img src="/assets/fechadura.png" loading="lazy" className="w-full drop-shadow-[0_0_20px_rgba(94,234,212,0.3)]" alt="Fechadura inteligente" />
              </div>
            }
          />
          <FeatureRow
            tag="ENTRETENIMENTO"
            title="Áudio Imersivo de Alta Fidelidade"
            desc="Preencha sua casa com som de cinema incrível. Com nossos sistemas de som integrados e invisíveis, sua trilha sonora perfeita segue você pelos cômodos."
            list={["Sincronização perfeita", "Acústica ajustada por ambiente", "Controle por voz simples"]}
            visual={<img src="/assets/receiver.png" loading="lazy" className="w-[350px] drop-shadow-[0_0_15px_rgba(94,234,212,0.2)]" alt="Receiver de áudio" />}
            reverse
          />
          <FeatureRow
            tag="AMBIENTAÇÃO"
            title="Sistema de Iluminação com Dimmer"
            desc="A luz certa transforma qualquer espaço. Com o sistema Dimmer, você tem controle total da intensidade e temperatura, criando o clima perfeito para cada momento."
            list={["Controle preciso de intensidade (0-100%)", "Transições suaves e automáticas", "Otimização do consumo de energia"]}
            visual={<img src="/assets/iluminação diimer.gif" loading="lazy" className="rounded-3xl w-[350px] h-auto" alt="Iluminação dimerizável" />}
          />
          <FeatureRow
            tag="CONFORTO"
            title="Climatização Inteligente"
            desc="Encontre sempre a temperatura perfeita. Nossos termostatos inteligentes aprendem sua rotina, condicionando o ambiente antes mesmo de você chegar em casa."
            list={["Controle seccional por cômodo", "Integração com cortinas para otimização térmica", "Monitoramento da qualidade do ar"]}
            visual={<img src="/assets/ar-condicionado.gif" loading="lazy" className="rounded-3xl w-[350px] h-auto" alt="Ar-condicionado inteligente" />}
            reverse
          />
        </section>

        {/* ── SOBRE NÓS ──────────────────────────────────────────────────────── */}
        <section id="sobre-nos" className="py-24 px-[4vw] relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16"
          >
            <div className="flex-1 space-y-6">
              <span className="feature-tag">Sobre Nós</span>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Tecnologia Criada Para O <span className="text-accent">Seu Dia a Dia</span>
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed">
                A Maxiimus Tech é uma empresa criada para deixar seu ambiente mais <strong className="text-white font-medium">seguro, produtivo, confortável e tecnológico</strong>.
              </p>
              <p className="text-text-secondary text-lg leading-relaxed">
                Nossas soluções são inteiramente <strong className="text-white font-medium">personalizáveis</strong> de acordo com cada morador, adequando-se perfeitamente às rotinas do seu dia a dia.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {[
                  { icon: Cpu, label: 'Tecnologia de Ponta', desc: 'Equipamentos das melhores marcas mundiais' },
                  { icon: Headphones, label: 'Suporte 24/7', desc: 'Assistência técnica a qualquer momento' },
                  { icon: Shield, label: '100% Personalizado', desc: 'Soluções sob medida para sua rotina' },
                ].map((diff, i) => (
                  <motion.div
                    key={diff.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                    className="flex flex-col items-center sm:items-start gap-2 p-4 rounded-2xl border border-white/5 bg-white/[0.02]"
                  >
                    <diff.icon size={22} className="text-accent" />
                    <span className="text-sm font-semibold">{diff.label}</span>
                    <span className="text-xs text-text-secondary">{diff.desc}</span>
                  </motion.div>
                ))}
              </div>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent font-medium group hover:gap-3 transition-all duration-300 mt-2"
              >
                Fale com um especialista
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
            <div className="flex-1 w-full flex justify-center lg:justify-end">
              <motion.div
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.4 }}
                className="relative w-full max-w-sm md:max-w-md aspect-square rounded-[3rem] overflow-hidden border border-white/5 bg-white/5 backdrop-blur-sm flex items-center justify-center shadow-[0_0_60px_rgba(94,234,212,0.07)]"
              >
                <div className="absolute inset-0 bg-accent/10 blur-[80px] rounded-full" />
                <img src="/assets/logo.png" alt="Maxiimus Tech" className="w-[45%] h-[45%] object-contain relative z-10 drop-shadow-[0_0_25px_rgba(94,234,212,0.3)] opacity-90" />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ── CTA ────────────────────────────────────────────────────────────── */}
        <section id="contato" className="py-20 px-[4vw] relative z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-panel max-w-4xl mx-auto p-12 rounded-[2rem] text-center border border-white/10 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">Pronto para modernizar seu lar?</h2>
              <p className="text-text-secondary mb-8">Fale diretamente com nossos especialistas e agende um projeto de automação para a sua residência.</p>
              <motion.a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold py-4 px-8 rounded-full shadow-[0_0_20px_rgba(94,234,212,0.15)] hover:bg-white/20 hover:shadow-[0_0_40px_rgba(94,234,212,0.35)] transition-all duration-300"
              >
                <MessageSquare size={20} className="text-accent" />
                Agendar Orçamento Via WhatsApp
              </motion.a>
            </div>
          </motion.div>
        </section>
      </main>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="py-20 px-[4vw] border-t border-accent/10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src="/assets/logo.png" className="w-8 h-8" alt="Logo" />
              <div className="flex flex-col">
                <span className="font-semibold tracking-wider">MAXIIMUS TECH</span>
                <span className="text-[0.45rem] text-accent tracking-[1px] uppercase">TECNOLOGIA RESIDENCIAL</span>
              </div>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">Redefinindo o padrão de vida através da automação residencial avançada, design sofisticado e integração perfeita de sistemas.</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold">Soluções</h3>
            <ul className="text-sm text-text-secondary space-y-2">
              <li><a href="#solucoes" className="hover:text-accent transition-colors">Segurança & Acesso</a></li>
              <li><a href="#solucoes" className="hover:text-accent transition-colors">Áudio & Vídeo</a></li>
              <li><a href="#solucoes" className="hover:text-accent transition-colors">Iluminação Inteligente</a></li>
              <li><a href="#solucoes" className="hover:text-accent transition-colors">Climatização</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold">Empresa</h3>
            <ul className="text-sm text-text-secondary space-y-2">
              <li><a href="#sobre-nos" className="hover:text-accent transition-colors">Sobre Nós</a></li>
              <li><a href="#solucoes" className="hover:text-accent transition-colors">Nossos Projetos</a></li>
              <li><a href="#contato" className="hover:text-accent transition-colors">Contato</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold">Fale Conosco</h3>
            <p className="text-sm text-text-secondary">maxiimustech33@gmail.com</p>
            <div className="flex gap-4 pt-2">
              <a href="https://www.instagram.com/maxiimus_tech" target="_blank" rel="noopener noreferrer" aria-label="Instagram da Maxiimus Tech"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-accent/30 hover:text-accent transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@maxiimus_tech" target="_blank" rel="noopener noreferrer" aria-label="TikTok da Maxiimus Tech"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-accent/30 hover:text-accent transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-accent/10 text-center text-xs text-text-secondary">
          &copy; 2026 Maxiimus Tecnologia Residencial. Todos os direitos reservados.
        </div>
      </footer>

      {/* ── WHATSAPP FLUTUANTE ────────────────────────────────────────────── */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 left-8 z-[90] w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_4px_30px_rgba(37,211,102,0.6)] transition-all duration-300"
        aria-label="Falar no WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#25D366] rounded-full animate-ping opacity-75" />
      </a>

      {/* ── SCROLL TO TOP ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-[90] w-12 h-12 bg-accent/20 border border-accent/40 rounded-full flex items-center justify-center text-accent hover:bg-accent/30 transition-colors backdrop-blur-sm shadow-[0_0_20px_rgba(94,234,212,0.2)]"
            aria-label="Voltar ao topo"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── MODAL ──────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedBenefit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-[#02050B]/80 backdrop-blur-md"
            onClick={() => setSelectedBenefit(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="bg-[#050B14]/95 border border-accent/20 rounded-[2rem] p-6 md:p-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-[0_0_100px_rgba(94,234,212,0.15)] relative flex flex-col gap-8 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-thumb]:bg-accent/50 [&::-webkit-scrollbar-thumb]:rounded-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedBenefit(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all z-10"
                aria-label="Fechar"
              >
                <X size={20} />
              </button>

              {(() => {
                const data = benefitsData.find(b => b.id === selectedBenefit)
                if (!data) return null
                return (
                  <>
                    <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                      <div className="w-full md:w-2/5 flex items-center justify-center bg-white/5 rounded-[2rem] p-8 border border-white/5">
                        <img
                          src={data.img}
                          alt={data.title}
                          className={`w-full ${data.large ? 'max-w-[300px]' : 'max-w-[200px]'} object-contain drop-shadow-[0_0_30px_rgba(94,234,212,0.2)]`}
                        />
                      </div>
                      <div className="w-full md:w-3/5 space-y-6">
                        <span className="bg-accent/10 text-accent border border-accent/20 px-3 py-1 rounded-full text-xs font-semibold tracking-[2px] uppercase">
                          Detalhes da Solução
                        </span>
                        <h2 className="text-3xl md:text-5xl font-['Rajdhani'] font-bold text-white tracking-wider">{data.title}</h2>
                        <p className="text-text-secondary text-base md:text-lg leading-relaxed">{data.fullDesc}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                          {data.features.map((feat, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <ChevronRight size={18} className="text-accent shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-300 font-medium">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6 mt-4">
                      <h3 className="text-xl md:text-2xl font-bold font-['Rajdhani'] border-b border-white/10 pb-4">Galeria de Dispositivos</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {data.gallery.map((imgSrc, i) => (
                          <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-center h-32 md:h-40 group overflow-hidden">
                            <img
                              src={imgSrc}
                              className="max-w-[80%] max-h-[80%] object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-500"
                              alt={`Mídia ${i + 1}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
