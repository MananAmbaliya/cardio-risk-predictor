import React, { useState, useEffect } from 'react'
import { AlertCircle, CheckCircle, RefreshCcw, Download } from 'lucide-react'
import Gauge from './Gauge.jsx'
import EcgTrace from './EcgTrace.jsx'

const FEATURE_LABELS = {
  age: 'Age', gender: 'Gender', height: 'Height', weight: 'Weight',
  ap_hi: 'Systolic BP', ap_lo: 'Diastolic BP', cholesterol: 'Cholesterol',
  gluc: 'Glucose', smoke: 'Smoking', alco: 'Alcohol', active: 'Activity',
}

export default function ResultPanel({ result, onRestart }) {
  const isHigh = result.prediction === 1
  const amplitude = isHigh ? 1.7 : 0.75
  const color = isHigh ? '#D6402C' : '#17845A'
  const speed = isHigh ? 3 : 6

  // Animation trigger for the bars
  const [showBars, setShowBars] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setShowBars(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={`fade-up rounded-card shadow-2xl transition-shadow duration-1000 ${isHigh ? 'shadow-red/10' : 'shadow-green/10'}`}>
      <div className={`rounded-t-card border-b-0 border border-line bg-panel px-6 pt-5 relative overflow-hidden ${isHigh ? 'bg-red-soft/20' : 'bg-green-soft/20'}`}>
        <div className="absolute top-4 left-6 z-10 flex items-center gap-2">
           {isHigh ? <AlertCircle size={18} className="text-red" /> : <CheckCircle size={18} className="text-green" />}
           <span className={`font-mono text-xs font-semibold uppercase tracking-widest ${isHigh ? 'text-red' : 'text-green'}`}>
             Analysis Complete
           </span>
        </div>
        <EcgTrace beats={5} amplitude={amplitude} color={color} scroll speed={speed} height={90} className="mt-4" />
      </div>

      <div className="grid gap-8 rounded-b-card border border-line bg-panel p-6 md:grid-cols-[300px_1fr] md:p-10 relative z-10">
        <div className="flex flex-col items-center justify-center rounded-xl border border-line/50 bg-white/50 p-6 shadow-sm">
          <Gauge probability={result.probability} />
          <div className="mt-6 text-center">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-bold uppercase tracking-wide shadow-sm ${
                isHigh ? 'bg-red text-white' : 'bg-green text-white'
              }`}
            >
              {isHigh ? 'Elevated Risk' : 'Lower Risk'}
            </span>
            <p className="mt-3 text-xs text-inkmute leading-relaxed max-w-[220px]">
              {isHigh 
                ? 'Your profile suggests an increased probability of cardiovascular strain.' 
                : 'Your profile suggests a lower probability of cardiovascular strain.'}
            </p>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <MiniStat label="BMI" value={result.bmi} sub={result.bmi_category} delay="100ms" />
            <MiniStat label="Pulse pressure" value={`${result.pulse_pressure}`} sub="mmHg" delay="200ms" />
            <MiniStat label="Model verdict" value={result.risk_label} sub="risk class" delay="300ms" />
          </div>

          <div className="flex-grow">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-inkmute border-b border-line/50 pb-2">
              What moved this reading most
            </p>
            <div className="space-y-3.5">
              {result.top_contributors.map((c, i) => {
                const magnitude = Math.min(Math.abs(c.contribution) / 2, 1)
                const raising = c.contribution > 0
                return (
                  <div key={c.feature} className="flex items-center gap-3 fade-up" style={{ animationDelay: `${300 + i * 100}ms` }}>
                    <span className="w-28 shrink-0 text-sm font-medium text-ink">
                      {FEATURE_LABELS[c.feature] || c.feature}
                    </span>
                    <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-paper shadow-inner">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: showBars ? `${magnitude * 100}%` : '0%',
                          backgroundColor: raising ? '#D6402C' : '#17845A',
                        }}
                      />
                    </div>
                    <span className={`w-16 shrink-0 text-right text-xs font-mono font-semibold ${raising ? 'text-red' : 'text-green'}`}>
                      {raising ? 'raises' : 'lowers'}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-10 border-t border-line/70 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs leading-relaxed text-inkmute max-w-sm">
              Model trained on ~62k records. Not a clinical diagnosis. Please consult a healthcare provider.
            </p>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                className="flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-lg border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-blue hover:text-blue shadow-sm"
                onClick={() => alert('This is a dummy button - PDF Report generation would trigger here.')}
              >
                <Download size={16} /> Save
              </button>
              <button
                onClick={onRestart}
                className="flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-lg bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 shadow-md shadow-ink/20"
              >
                <RefreshCcw size={16} /> New reading
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MiniStat({ label, value, sub, delay }) {
  return (
    <div className="rounded-xl border border-line bg-white p-4 shadow-sm transition-transform hover:-translate-y-1 fade-up" style={{ animationDelay: delay }}>
      <div className="font-mono text-2xl font-bold tabular text-ink tracking-tight">{value}</div>
      <div className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-inkmute">
        {label} <span className="opacity-70 font-normal">· {sub}</span>
      </div>
    </div>
  )
}
