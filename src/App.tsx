import { motion } from 'framer-motion'
import {
  Bot, BarChart3, Headphones, Workflow, CheckCircle2,
  ChevronDown, Mail, Linkedin, FileText, ArrowRight,
  Zap, TrendingUp, Clock, Layers
} from 'lucide-react'
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
}

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-lg text-coffee">AI Automation</span>
          <a
            href="#contact"
            className="bg-coffee hover:bg-coffee/80 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors"
          >
            Book AI Audit
          </a>
        </div>
      </nav>

      {/* ── 1. HERO ── */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-charcoal/40 pointer-events-none" />
        <motion.div
          className="relative max-w-4xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="flex justify-center gap-3 mb-6">
            <span className="bg-sage-green/20 text-sage-green text-xs font-semibold px-3 py-1 rounded-full">Fintech AI integrations</span>
            <span className="bg-coffee/20 text-coffee text-xs font-semibold px-3 py-1 rounded-full">Manufacturing automation</span>
            <span className="bg-charcoal/40 text-slate-300 text-xs font-semibold px-3 py-1 rounded-full">Full-stack + AI expertise</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-white"
          >
            AI Automation for Business Processes{' '}
            <span className="text-coffee">in 30 Days</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            I help companies integrate AI agents and automation to reduce operational
            workload and increase efficiency.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="bg-coffee hover:bg-coffee/80 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-colors inline-flex items-center gap-2"
            >
              Book AI Audit <ArrowRight size={20} />
            </a>
            <a
              href="#process"
              className="border border-slate-600 hover:border-slate-400 text-slate-300 px-8 py-4 rounded-2xl font-semibold text-lg transition-colors"
            >
              How it works
            </a>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-slate-600" size={24} />
        </div>
      </section>

      {/* ── 2. PROBLEM SECTION ── */}
      <section className="py-20 px-6 bg-slate-900" id="problems">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Does your business face these challenges?
            </h2>
            <p className="text-slate-400 text-lg">You're not alone — these are the most common operational bottlenecks.</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-6"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          >
            {[
              {
                icon: <Clock size={24} className="text-red-400" />,
                title: 'Manual Processes',
                desc: 'Employees spend hours on repetitive tasks that could be automated.',
              },
              {
                icon: <Headphones size={24} className="text-orange-400" />,
                title: 'Overloaded Customer Support',
                desc: 'Support teams struggle with repetitive inquiries around the clock.',
              },
              {
                icon: <BarChart3 size={24} className="text-yellow-400" />,
                title: 'Manual Reporting',
                desc: 'Data exists but reports require significant manual effort to produce.',
              },
              {
                icon: <Layers size={24} className="text-blue-400" />,
                title: 'Fragmented Tools',
                desc: 'CRM, spreadsheets, Slack, email — disconnected workflows slow you down.',
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 flex gap-4"
              >
                <div className="mt-1">{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-white text-lg mb-1">{item.title}</h3>
                  <p className="text-slate-400">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 3. SOLUTION SECTION ── */}
      <section className="py-20 px-6" id="solutions">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">AI Solutions That Work</h2>
            <p className="text-slate-400 text-lg">Four areas where AI delivers measurable impact.</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-6"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          >
            {[
              {
                icon: <Workflow size={28} className="text-sage-green" />,
                title: 'AI Process Automation',
                items: ['Document processing', 'Request handling', 'CRM updates', 'Automated reporting'],
              },
              {
                icon: <Headphones size={28} className="text-coffee" />,
                title: 'AI Customer Support',
                items: ['Answers up to 80% of inquiries', 'Works 24/7', 'Reduces support load', 'Instant responses'],
              },
              {
                icon: <BarChart3 size={28} className="text-blue-400" />,
                title: 'AI Analytics',
                items: ['Sales reports', 'Financial performance', 'Customer behavior', 'Automated dashboards'],
              },
              {
                icon: <Bot size={28} className="text-purple-400" />,
                title: 'AI Agents',
                items: ['Data analysis', 'Document generation', 'API interaction', 'Workflow orchestration'],
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="bg-slate-900 border border-slate-700 rounded-2xl p-7"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                <ul className="space-y-2">
                  {item.items.map((i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-300">
                      <CheckCircle2 size={16} className="text-sage-green flex-shrink-0" />
                      {i}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 4. CASE STUDIES ── */}
      <section className="py-20 px-6 bg-slate-900" id="cases">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Real Results</h2>
            <p className="text-slate-400 text-lg">Case studies from actual client engagements.</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          >
            <motion.div variants={fadeUp} className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
              <span className="bg-coffee/20 text-coffee text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Fintech</span>
              <h3 className="text-xl font-bold text-white mt-4 mb-2">Customer Support Overload</h3>
              <p className="text-slate-400 mb-6">Built an AI support assistant to handle repetitive customer inquiries automatically.</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900 rounded-xl p-4 text-center">
                  <div className="text-3xl font-extrabold text-coffee">40%</div>
                  <div className="text-slate-400 text-sm mt-1">Reduction in support workload</div>
                </div>
                <div className="bg-slate-900 rounded-xl p-4 text-center">
                  <div className="text-3xl font-extrabold text-sage-green">24/7</div>
                  <div className="text-slate-400 text-sm mt-1">Instant responses to customers</div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
              <span className="bg-sage-green/20 text-sage-green text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Manufacturing</span>
              <h3 className="text-xl font-bold text-white mt-4 mb-2">Manual Order Processing</h3>
              <p className="text-slate-400 mb-6">Deployed an AI document processing system to automate the entire order workflow.</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900 rounded-xl p-4 text-center">
                  <div className="text-3xl font-extrabold text-sage-green">100%</div>
                  <div className="text-slate-400 text-sm mt-1">Automated order processing</div>
                </div>
                <div className="bg-slate-900 rounded-xl p-4 text-center">
                  <div className="text-3xl font-extrabold text-blue-400">Faster</div>
                  <div className="text-slate-400 text-sm mt-1">Operational flow</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 5. AUTOMATION OPPORTUNITIES ── */}
      <section className="py-20 px-6" id="opportunities">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Can Be Automated?</h2>
            <p className="text-slate-400 text-lg">Processes ready for AI in most businesses today.</p>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-3"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          >
            {[
              'Customer Support', 'Email Processing', 'Document Creation',
              'CRM Updates', 'Analytics', 'Marketing Automation',
              'Sales Workflows', 'Internal Reporting',
            ].map((item) => (
              <motion.span
                key={item}
                variants={fadeUp}
                className="bg-slate-800 border border-slate-700 text-slate-200 px-5 py-3 rounded-xl font-medium flex items-center gap-2"
              >
                <Zap size={14} className="text-coffee" />
                {item}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 6. IMPLEMENTATION PROCESS ── */}
      <section className="py-20 px-6 bg-slate-900" id="process">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Implementation Process</h2>
            <p className="text-slate-400 text-lg">A clear 4-step path from audit to deployment.</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-4 gap-6"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          >
            {[
              { step: '01', title: 'AI Audit', desc: 'Business process analysis and automation opportunities.' },
              { step: '02', title: 'AI Roadmap', desc: 'Strategy and implementation planning tailored to your goals.' },
              { step: '03', title: 'Development', desc: 'AI system development and integration with your existing tools.' },
              { step: '04', title: 'Deployment', desc: 'Launch and team onboarding for smooth adoption.' },
            ].map((item) => (
              <motion.div
                key={item.step}
                variants={fadeUp}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-coffee/20 border border-coffee/40 flex items-center justify-center mx-auto mb-4">
                  <span className="text-coffee font-bold text-lg">{item.step}</span>
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 7. SERVICES / PRICING ── */}
      <section className="py-20 px-6" id="services">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Services</h2>
            <p className="text-slate-400 text-lg">Choose the right engagement level for your business.</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          >
            {[
              {
                title: 'AI Audit',
                price: '300–1,000 €',
                desc: 'Identify your biggest automation wins.',
                items: ['Process analysis', 'Automation opportunities', 'Implementation roadmap'],
                highlight: false,
              },
              {
                title: 'AI Automation',
                price: '3,000 €+',
                desc: 'Build and deploy AI solutions.',
                items: ['Development', 'AI integration', 'Workflow automation'],
                highlight: true,
              },
              {
                title: 'AI Transformation',
                price: 'Custom',
                desc: 'Full AI transformation of operations.',
                items: ['Multiple automations', 'Strategic roadmap', 'Long-term implementation'],
                highlight: false,
              },
            ].map((pkg) => (
              <motion.div
                key={pkg.title}
                variants={fadeUp}
                className={`rounded-2xl p-8 border flex flex-col ${
                  pkg.highlight
                    ? 'bg-coffee/10 border-coffee shadow-lg shadow-coffee/10'
                    : 'bg-slate-900 border-slate-700'
                }`}
              >
                {pkg.highlight && (
                  <span className="self-start bg-coffee text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-white mb-1">{pkg.title}</h3>
                <div className="text-3xl font-extrabold text-coffee my-3">{pkg.price}</div>
                <p className="text-slate-400 mb-6 text-sm">{pkg.desc}</p>
                <ul className="space-y-2 mb-8 flex-1">
                  {pkg.items.map((i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                      <CheckCircle2 size={15} className="text-sage-green flex-shrink-0" />
                      {i}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`text-center py-3 rounded-xl font-semibold transition-colors ${
                    pkg.highlight
                      ? 'bg-coffee hover:bg-coffee/80 text-white'
                      : 'border border-slate-600 hover:border-slate-400 text-slate-300'
                  }`}
                >
                  Get Started
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 8. ABOUT ── */}
      <section className="py-20 px-6 bg-slate-900" id="about">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="flex flex-col md:flex-row gap-12 items-center"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          >
            <motion.div variants={fadeUp} className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Why Work With Me</h2>
              <ul className="space-y-3">
                {[
                  'Full-stack developer',
                  'AI integration specialist',
                  'Experience in fintech systems',
                  'Manufacturing automation experience',
                  'Focus on real business ROI',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-300">
                    <TrendingUp size={18} className="text-sage-green flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={fadeUp} className="flex-1 bg-slate-800 border border-slate-700 rounded-2xl p-8">
              <p className="text-slate-300 text-lg leading-relaxed">
                I'm a full-stack developer and AI integration specialist with hands-on
                experience across fintech and manufacturing. I focus on delivering
                practical AI automation that creates measurable ROI — not just
                impressive demos.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 9. FAQ ── */}
      <section className="py-20 px-6" id="faq">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          >
            {[
              {
                q: 'How long does implementation take?',
                a: 'Usually 2–6 weeks depending on the complexity of the automation.',
              },
              {
                q: 'Do we need new infrastructure?',
                a: 'No. AI solutions usually integrate with your existing systems — CRM, email, databases, etc.',
              },
              {
                q: 'What technologies are used?',
                a: 'OpenAI APIs, AI agents, workflow automation tools, and backend integrations tailored to your stack.',
              },
              {
                q: 'Is this suitable for small businesses?',
                a: 'Yes. Many processes can be automated even in small companies — often with a quick payback period.',
              },
            ].map((item) => (
              <motion.div
                key={item.q}
                variants={fadeUp}
                className="bg-slate-900 border border-slate-700 rounded-xl p-6"
              >
                <h3 className="font-semibold text-white mb-2">{item.q}</h3>
                <p className="text-slate-400">{item.a}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 10. FINAL CTA ── */}
      <section className="py-24 px-6 bg-gradient-to-br from-coffee/20 via-slate-900 to-charcoal/30" id="contact">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white mb-4">
            Discover how AI can automate your business
          </motion.h2>
          <motion.p variants={fadeUp} className="text-slate-300 text-lg mb-10">
            Book an AI audit and receive a roadmap of processes that can be automated.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contact@example.com"
              className="bg-coffee hover:bg-coffee/80 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-colors inline-flex items-center gap-2 justify-center"
            >
              Book Consultation <Mail size={20} />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-950 border-t border-slate-800 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-slate-500 text-sm">© 2026 AI Automation Consulting</span>
          <div className="flex items-center gap-6">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-coffee transition-colors flex items-center gap-1.5 text-sm"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
            <a
              href="mailto:contact@example.com"
              className="text-slate-400 hover:text-coffee transition-colors flex items-center gap-1.5 text-sm"
            >
              <Mail size={16} /> Email
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-coffee transition-colors flex items-center gap-1.5 text-sm"
            >
              <FileText size={16} /> Blog
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-coffee transition-colors text-sm"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default App
