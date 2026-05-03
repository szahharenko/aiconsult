import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Euro, Clock, Calculator } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { fadeUp, stagger } from '../../animations'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'

export function ROICalculator() {
  const { t } = useTranslation()
  const [employees, setEmployees] = useState(15)
  const [salary, setSalary] = useState(2000)
  const [hoursPerDay, setHoursPerDay] = useState(3)

  const hourlyRate = salary / 22 / 8
  const automatedHours = hoursPerDay * 0.6
  const annualSavings = Math.round(employees * automatedHours * hourlyRate * 250)
  const monthlySavings = Math.round(annualSavings / 12)
  const hoursFreed = Math.round(employees * automatedHours * 250)

  const fmt = (n: number) => n.toLocaleString('ru-RU')

  return (
    <Section id="roi">
      <SectionHeader
        title={t('roi.title')}
        sub={t('roi.sub')}
      />
      <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        <motion.div variants={fadeUp} className="bg-slate-900 border border-slate-700 rounded-2xl p-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">

            {/* Employees */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-3 flex items-center gap-2">
                <Users size={16} className="text-coffee" />
                {t('roi.employees')}
              </label>
              <input type="range" min={2} max={200} value={employees}
                onChange={e => setEmployees(Number(e.target.value))}
                className="w-full accent-coffee mb-2" />
              <div className="text-center text-white font-bold text-xl">{employees}</div>
            </div>

            {/* Salary */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-3 flex items-center gap-2">
                <Euro size={16} className="text-coffee" />
                {t('roi.salary')}
              </label>
              <input type="range" min={800} max={6000} step={100} value={salary}
                onChange={e => setSalary(Number(e.target.value))}
                className="w-full accent-coffee mb-2" />
              <div className="text-center text-white font-bold text-xl">{fmt(salary)} &euro;</div>
            </div>

            {/* Hours */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-3 flex items-center gap-2">
                <Clock size={16} className="text-coffee" />
                {t('roi.hours')}
              </label>
              <input type="range" min={0.5} max={8} step={0.5} value={hoursPerDay}
                onChange={e => setHoursPerDay(Number(e.target.value))}
                className="w-full accent-coffee mb-2" />
              <div className="text-center text-white font-bold text-xl">{hoursPerDay} {t('roi.hourUnit')}</div>
            </div>
          </div>

          {/* Results */}
          <motion.div
            key={annualSavings}
            initial={{ scale: 0.98, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-br from-coffee/15 to-coffee/5 border border-coffee/30 rounded-xl p-6">
            <p className="text-slate-400 text-sm text-center mb-4">
              {t('roi.automating')}
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-coffee font-extrabold text-2xl md:text-3xl">{fmt(monthlySavings)} &euro;</p>
                <p className="text-slate-400 text-xs mt-1">{t('roi.monthly')}</p>
              </div>
              <div className="border-x border-coffee/20">
                <p className="text-coffee font-extrabold text-2xl md:text-3xl">{fmt(annualSavings)} &euro;</p>
                <p className="text-slate-400 text-xs mt-1">{t('roi.annual')}</p>
              </div>
              <div>
                <p className="text-coffee font-extrabold text-2xl md:text-3xl">{fmt(hoursFreed)}</p>
                <p className="text-slate-400 text-xs mt-1">{t('roi.freed')}</p>
              </div>
            </div>
          </motion.div>

          <p className="text-slate-500 text-xs text-center mt-4">
            {t('roi.estimate')}
          </p>
          <div className="mt-4 text-center">
            <a href="#contact"
              className="inline-flex items-center gap-2 bg-coffee hover:bg-coffee/80 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors">
              <Calculator size={16} />
              {t('roi.getCta')}
            </a>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  )
}
