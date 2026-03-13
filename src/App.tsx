import { motion } from 'framer-motion'
import {
  Bot, BarChart3, Workflow, CheckCircle2,
  Mail, Linkedin, FileText, ArrowRight,
  Zap, TrendingUp, Building2, DollarSign
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

function Section({ children, dark, id }: { children: React.ReactNode; dark?: boolean; id?: string }) {
  return (
    <section id={id} className={`py-16 px-6 ${dark ? 'bg-slate-900' : ''}`}>
      <div className="max-w-5xl mx-auto">{children}</div>
    </section>
  )
}

function SectionHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <motion.div className="text-center mb-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{title}</h2>
      {sub && <p className="text-slate-400 text-lg">{sub}</p>}
    </motion.div>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">

      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-coffee">AI Automation</span>
          <a href="#contact" className="bg-coffee hover:bg-coffee/80 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors">
            Book AI Audit
          </a>
        </div>
      </nav>

      {/* 1. HERO */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-charcoal/30 pointer-events-none" />
        <motion.div className="relative max-w-4xl mx-auto text-center" initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2 mb-6">
            {['Fintech AI integrations', 'Manufacturing automation', 'Full-stack + AI expertise'].map(t => (
              <span key={t} className="bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium px-3 py-1 rounded-full">{t}</span>
            ))}
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-extrabold leading-tight mb-5 text-white">
            Intelligence Is Becoming Cheap.{' '}
            <span className="text-coffee">Companies Without AI Will Become Uncompetitive.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg text-slate-300 mb-9 max-w-2xl mx-auto">
            I help businesses integrate AI automation and AI agents to reduce operational costs,
            accelerate processes, and win in the new economy.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#contact" className="bg-coffee hover:bg-coffee/80 text-white px-7 py-3.5 rounded-2xl font-bold transition-colors inline-flex items-center gap-2 justify-center">
              Book AI Audit <ArrowRight size={18} />
            </a>
            <a href="#process" className="border border-slate-600 hover:border-slate-400 text-slate-300 px-7 py-3.5 rounded-2xl font-semibold transition-colors">
              How it works
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. ECONOMIC SHIFT */}
      <Section dark id="economic-shift">
        <SectionHeader title="We Are Entering the Fastest Economic Transformation in History" />
        <motion.div className="max-w-2xl mx-auto space-y-4 text-slate-300 text-lg leading-relaxed" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <p>Artificial intelligence is beginning to automate human cognitive work. For decades the main constraint in business was human intelligence and time. <strong className="text-white">That constraint is disappearing.</strong></p>
          <p>The cost of intelligence is collapsing. But these resources are <em>not</em> getting cheaper:</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
            {['Land', 'Energy', 'Raw materials', 'Human attention'].map(r => (
              <div key={r} className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-center text-sm font-medium text-slate-200">{r}</div>
            ))}
          </div>
          <p>The companies that win in the next decade will combine <strong className="text-white">cheap intelligence</strong> with real-world assets and processes.</p>
        </motion.div>
      </Section>

      {/* 3. NEW BUSINESS REALITY */}
      <Section id="new-reality">
        <SectionHeader title="Companies Are Starting To Appear Without Employees" />
        <motion.div className="grid md:grid-cols-2 gap-6 items-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="text-slate-300 text-lg leading-relaxed space-y-3">
            <p>AI agents are already capable of managing:</p>
            <ul className="space-y-1.5">
              {['Email', 'Calendars', 'Online purchases', 'Scheduling', 'Communications'].map(i => (
                <li key={i} className="flex items-center gap-2"><Zap size={14} className="text-coffee flex-shrink-0" />{i}</li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={fadeUp} className="bg-slate-900 border border-slate-700 rounded-2xl p-6 text-slate-300 text-lg leading-relaxed space-y-3">
            <p>Some agents perform tasks their creators never explicitly programmed.</p>
            <p className="text-white font-semibold">This is not just a technology shift.<br />It is a new economic model.</p>
          </motion.div>
        </motion.div>
      </Section>

      {/* 4. COMPETITION */}
      <Section dark id="competition">
        <SectionHeader title="The Biggest Risk Today Is Not Using AI" />
        <motion.div className="grid md:grid-cols-2 gap-6 mb-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3"><Building2 size={18} className="text-slate-400" /><span className="font-bold text-white">Company A</span></div>
            <div className="flex items-center gap-2"><DollarSign size={16} className="text-red-400" /><span className="text-slate-300">Annual payroll: <strong className="text-red-400">5,000,000 €</strong></span></div>
          </motion.div>
          <motion.div variants={fadeUp} className="bg-sage-green/10 border border-sage-green/40 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3"><Bot size={18} className="text-sage-green" /><span className="font-bold text-white">Company B</span></div>
            <div className="flex items-center gap-2 mb-1"><DollarSign size={16} className="text-sage-green" /><span className="text-slate-300">Annual payroll: <strong className="text-sage-green">300,000 €</strong></span></div>
            <p className="text-slate-400 text-sm">AI automation handles most operational work.</p>
          </motion.div>
        </motion.div>
        <motion.p className="text-center text-slate-300 text-lg" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          Both companies deliver the same service. <strong className="text-white">Which company wins the market over time?</strong><br />
          <span className="text-slate-400 text-base">Companies that automate processes will outperform competitors every single month.</span>
        </motion.p>
      </Section>

      {/* 5. HISTORICAL CONTEXT */}
      <Section id="history">
        <SectionHeader title="Every Technological Revolution Makes Resources Cheaper" />
        <motion.div className="max-w-2xl mx-auto text-slate-300 text-lg leading-relaxed space-y-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <p>When clothing production became cheap, people didn't buy the same amount at lower prices. <strong className="text-white">They bought far more clothing.</strong></p>
          <p>The same pattern applies to intelligence. When intelligence becomes cheap, we don't simply do the same work for less money — <strong className="text-white">we do dramatically more work and innovation.</strong></p>
          <p className="text-slate-400">The result historically has always been economic expansion.</p>
        </motion.div>
      </Section>

      {/* 6. WHAT AI CAN DO TODAY */}
      <Section dark id="ai-today">
        <SectionHeader title="AI Can Already Do In Hours What Took Weeks" />
        <motion.div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          {[
            { icon: <BarChart3 size={18} className="text-blue-400" />, text: 'Analyze complex datasets' },
            { icon: <Workflow size={18} className="text-sage-green" />, text: 'Generate software code' },
            { icon: <FileText size={18} className="text-coffee" />, text: 'Process documents' },
            { icon: <Mail size={18} className="text-purple-400" />, text: 'Automate communication' },
            { icon: <BarChart3 size={18} className="text-yellow-400" />, text: 'Produce analytics reports' },
            { icon: <Bot size={18} className="text-cyan-400" />, text: 'Coordinate workflows' },
          ].map(({ icon, text }) => (
            <motion.div key={text} variants={fadeUp} className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex items-center gap-3 text-slate-300">
              {icon}<span>{text}</span>
            </motion.div>
          ))}
        </motion.div>
        <motion.p className="text-center text-slate-400 mt-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          Tasks that previously required 2–4 weeks of human effort can now be completed in a few hours.
        </motion.p>
      </Section>

      {/* 7. BUSINESS APPLICATIONS */}
      <Section id="applications">
        <SectionHeader title="Where AI Creates Immediate Business Value" sub="Processes ready for automation — and the results companies typically see." />
        <motion.div className="grid md:grid-cols-2 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
            <h3 className="font-bold text-white mb-4">AI can automate</h3>
            <div className="flex flex-wrap gap-2">
              {['Customer Support', 'Email Processing', 'Document Generation', 'CRM Updates', 'Data Analysis', 'Sales Workflows', 'Marketing Operations', 'Internal Reporting'].map(i => (
                <span key={i} className="bg-slate-800 text-slate-300 text-sm px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                  <Zap size={12} className="text-coffee" />{i}
                </span>
              ))}
            </div>
          </motion.div>
          <motion.div variants={fadeUp} className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
            <h3 className="font-bold text-white mb-4">Results companies typically see</h3>
            <ul className="space-y-3">
              {['Lower operational costs', 'Faster execution', 'Fewer manual tasks', 'Higher productivity'].map(r => (
                <li key={r} className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 size={16} className="text-sage-green flex-shrink-0" />{r}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </Section>

      {/* 8. IMPLEMENTATION PROCESS */}
      <Section dark id="process">
        <SectionHeader title="How AI Automation Is Implemented" />
        <motion.div className="grid md:grid-cols-4 gap-5" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          {[
            { step: '01', title: 'AI Audit', desc: 'Analyze company processes and identify automation opportunities.' },
            { step: '02', title: 'AI Roadmap', desc: 'Design a practical AI integration strategy.' },
            { step: '03', title: 'Development', desc: 'Build AI automation, agents, and integrations.' },
            { step: '04', title: 'Deployment', desc: 'Launch the system and onboard the team.' },
          ].map(item => (
            <motion.div key={item.step} variants={fadeUp} className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-coffee/20 border border-coffee/40 flex items-center justify-center mx-auto mb-3">
                <span className="text-coffee font-bold">{item.step}</span>
              </div>
              <h3 className="font-bold text-white mb-1.5">{item.title}</h3>
              <p className="text-slate-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* 9. CORE IDEA */}
      <Section id="core-idea">
        <motion.div className="max-w-2xl mx-auto text-center space-y-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl font-bold text-white">Intelligence Is Becoming Cheap. Value Moves To The Physical World.</h2>
          <p className="text-slate-300 text-lg">In the next decade most digital intelligence will become abundant. Real competitive advantage belongs to companies that combine:</p>
          <div className="grid grid-cols-2 gap-3">
            {['Cheap intelligence', 'Real assets', 'Real processes', 'Real customer attention'].map(i => (
              <div key={i} className="bg-slate-900 border border-coffee/30 rounded-xl px-4 py-3 text-coffee font-semibold text-sm">{i}</div>
            ))}
          </div>
          <p className="text-slate-400">AI automation lets companies scale operations while keeping teams small and efficient.</p>
        </motion.div>
      </Section>

      {/* 10. SERVICES */}
      <Section dark id="services">
        <SectionHeader title="Services" sub="Choose the right engagement level for your business." />
        <motion.div className="grid md:grid-cols-3 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          {[
            {
              title: 'AI Audit',
              price: '300–1,000 €',
              items: ['Business process analysis', 'AI opportunity mapping', 'Automation strategy roadmap'],
              highlight: false,
            },
            {
              title: 'AI Automation',
              price: '3,000 €+',
              items: ['Workflow automation', 'AI integrations', 'Process optimization'],
              highlight: true,
            },
            {
              title: 'AI Transformation',
              price: 'Custom',
              items: ['Automation strategy', 'Multiple system integrations', 'Long-term optimization'],
              highlight: false,
            },
          ].map(pkg => (
            <motion.div key={pkg.title} variants={fadeUp} className={`rounded-2xl p-6 border flex flex-col ${pkg.highlight ? 'bg-coffee/10 border-coffee' : 'bg-slate-800 border-slate-700'}`}>
              {pkg.highlight && <span className="self-start bg-coffee text-white text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">Most Popular</span>}
              <h3 className="text-xl font-bold text-white mb-1">{pkg.title}</h3>
              <div className="text-2xl font-extrabold text-coffee my-3">{pkg.price}</div>
              <ul className="space-y-2 mb-6 flex-1">
                {pkg.items.map(i => (
                  <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                    <CheckCircle2 size={14} className="text-sage-green flex-shrink-0" />{i}
                  </li>
                ))}
              </ul>
              <a href="#contact" className={`text-center py-3 rounded-xl font-semibold transition-colors text-sm ${pkg.highlight ? 'bg-coffee hover:bg-coffee/80 text-white' : 'border border-slate-600 hover:border-slate-400 text-slate-300'}`}>
                Get Started
              </a>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* 11. ABOUT */}
      <Section id="about">
        <motion.div className="grid md:grid-cols-2 gap-10 items-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp}>
            <h2 className="text-3xl font-bold text-white mb-5">Why Work With Me</h2>
            <ul className="space-y-3">
              {[
                'Full-stack developer with deep AI integration experience',
                'Built and integrated AI solutions in real production systems',
                'Background in fintech and manufacturing workflows',
                'Focus on measurable business outcomes and ROI',
              ].map(item => (
                <li key={item} className="flex items-start gap-3 text-slate-300">
                  <TrendingUp size={17} className="text-sage-green flex-shrink-0 mt-0.5" />{item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={fadeUp} className="bg-slate-900 border border-slate-700 rounded-2xl p-7 text-slate-300 leading-relaxed">
            Not just impressive demos — practical automation that creates measurable ROI across fintech, manufacturing, and SaaS businesses.
          </motion.div>
        </motion.div>
      </Section>

      {/* 12. FAQ */}
      <Section dark id="faq">
        <SectionHeader title="Frequently Asked Questions" />
        <motion.div className="space-y-3 max-w-2xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          {[
            { q: 'How long does implementation take?', a: 'Typical AI automation projects take 2–6 weeks depending on complexity.' },
            { q: 'Do we need new infrastructure?', a: 'Most AI solutions integrate with existing tools — CRM, APIs, databases, and communication platforms.' },
            { q: 'What technologies are used?', a: 'Modern AI APIs, automation platforms, backend integrations, and custom agent systems.' },
            { q: 'Is this relevant for small businesses?', a: 'Yes. Small teams benefit the most — automation dramatically increases their operational capacity.' },
          ].map(item => (
            <motion.div key={item.q} variants={fadeUp} className="bg-slate-800 border border-slate-700 rounded-xl p-5">
              <h3 className="font-semibold text-white mb-1.5">{item.q}</h3>
              <p className="text-slate-400 text-sm">{item.a}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* 13. FINAL CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-coffee/20 via-slate-900 to-charcoal/30" id="contact">
        <motion.div className="max-w-xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="text-3xl font-bold text-white mb-4">
            Discover How AI Can Automate Your Business
          </motion.h2>
          <motion.div variants={fadeUp} className="text-slate-300 mb-8 space-y-1.5">
            <p className="text-slate-400 mb-4">Book an AI audit to identify:</p>
            {['Which processes can be automated', 'Potential cost reductions', 'The highest-impact AI opportunities'].map(i => (
              <div key={i} className="flex items-center gap-2 justify-center text-slate-300">
                <CheckCircle2 size={15} className="text-sage-green" />{i}
              </div>
            ))}
          </motion.div>
          <motion.a
            variants={fadeUp}
            href="mailto:contact@example.com"
            className="bg-coffee hover:bg-coffee/80 text-white px-8 py-4 rounded-2xl font-bold transition-colors inline-flex items-center gap-2"
          >
            Book Consultation <Mail size={18} />
          </motion.a>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-800 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-slate-500 text-sm">© 2026 AI Automation Consulting</span>
          <div className="flex items-center gap-5">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-coffee transition-colors flex items-center gap-1.5 text-sm"><Linkedin size={15} />LinkedIn</a>
            <a href="mailto:contact@example.com" className="text-slate-400 hover:text-coffee transition-colors flex items-center gap-1.5 text-sm"><Mail size={15} />Email</a>
            <a href="#" className="text-slate-400 hover:text-coffee transition-colors flex items-center gap-1.5 text-sm"><FileText size={15} />Blog</a>
            <a href="#" className="text-slate-400 hover:text-coffee transition-colors text-sm">Privacy Policy</a>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default App
