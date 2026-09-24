import React, { useState, useEffect, useCallback } from 'react'
import { Heart, Activity, Stethoscope, ChevronLeft, ChevronRight, Loader2, ArrowRight, ShieldCheck, Mail, Phone, MapPin, BookOpen, Menu, X, ClipboardList, FileText, BarChart3, Clock, AlertTriangle, Users } from 'lucide-react'
import EcgTrace from './components/EcgTrace.jsx'
import LeadRail from './components/LeadRail.jsx'
import { NumberField, OptionPicker } from './components/Fields.jsx'
import ResultPanel from './components/ResultPanel.jsx'
import ModelInfoPanel from './components/ModelInfoPanel.jsx'

const STEPS = [{ lead: 'Lead I', label: 'Personal' }, { lead: 'Lead II', label: 'Vitals' }, { lead: 'Lead III', label: 'Labs' }, { lead: 'Lead V', label: 'Lifestyle' }]
const initialForm = { age_years: 45, gender: 2, height: 170, weight: 75, ap_hi: 120, ap_lo: 80, cholesterol: 1, gluc: 1, smoke: 0, alco: 0, active: 1 }

export default function App() {
  const [page, setPage] = useState('home'); const [menuOpen, setMenuOpen] = useState(false)
  const go = (next) => { setPage(next); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  return <div className="ecg-paper min-h-screen flex flex-col"><Navigation page={page} go={go} open={menuOpen} setOpen={setMenuOpen} /><main className="flex-grow">{page === 'home' && <HomePage go={go} />}{page === 'about' && <AboutPage />}{page === 'assessment' && <AssessmentPage />}{page === 'contact' && <ContactPage />}</main><Footer go={go} /></div>
}

function Footer({ go }) {
  return (
    <footer className="border-t border-line/70 bg-white/90 backdrop-blur mt-12">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <span className="flex items-center gap-2 font-mono text-lg font-semibold text-ink"><Heart size={20} className="text-blue" fill="currentColor" /> VITALIS</span>
            <p className="mt-4 text-sm text-inkmute leading-relaxed">
              Bridging the gap between clinical machine learning and personal cardiovascular health awareness. 
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-ink">Navigation</h3>
            <ul className="mt-4 space-y-3 text-sm text-inkmute">
              <li><button onClick={() => go('home')} className="hover:text-blue transition-colors">Home</button></li>
              <li><button onClick={() => go('about')} className="hover:text-blue transition-colors">About the Model</button></li>
              <li><button onClick={() => go('assessment')} className="hover:text-blue transition-colors">Risk Assessment</button></li>
              <li><button onClick={() => go('contact')} className="hover:text-blue transition-colors">Contact Us</button></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-ink">Legal & Privacy</h3>
            <ul className="mt-4 space-y-3 text-sm text-inkmute">
              <li><button className="hover:text-blue transition-colors">Terms of Service</button></li>
              <li><button className="hover:text-blue transition-colors">Privacy Policy</button></li>
              <li><button className="hover:text-blue transition-colors">Data Handling</button></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-ink">Stay Updated</h3>
            <p className="mt-4 text-sm text-inkmute">Subscribe for project updates.</p>
            <form className="mt-4 flex" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="Email address" className="w-full rounded-l-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-blue" />
              <button className="rounded-r-lg bg-blue px-4 text-sm font-semibold text-white hover:bg-blue/90">Join</button>
            </form>
          </div>
        </div>
        <div className="mt-12 border-t border-line/70 pt-8 flex flex-col items-center justify-between gap-4 text-xs text-inkmute sm:flex-row">
          <p>© {new Date().getFullYear()} Vitalis Project. All rights reserved.</p>
          <p>Academic project · Not a substitute for professional medical advice</p>
        </div>
      </div>
    </footer>
  )
}

function Navigation({ page, go, open, setOpen }) {
  const links = [['home', 'Home'], ['about', 'About'], ['assessment', 'Risk assessment'], ['contact', 'Contact']]
  return <header className="sticky top-0 z-20 border-b border-line/80 bg-white/95 backdrop-blur"><div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6"><button onClick={() => go('home')} className="flex items-center gap-2.5 text-left" aria-label="Vitalis home"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue text-white"><Heart size={18} fill="currentColor" /></span><span><span className="block font-mono text-[15px] font-semibold leading-none text-ink">VITALIS</span><span className="block pt-1 text-[10px] leading-none text-inkmute">cardiovascular health</span></span></button><nav className="hidden items-center gap-1 md:flex">{links.map(([id, label]) => <NavLink key={id} active={page === id} onClick={() => go(id)}>{label}</NavLink>)}</nav><button className="rounded-lg p-2 text-ink md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X size={20} /> : <Menu size={20} />}</button></div>{open && <nav className="border-t border-line bg-white px-4 py-3 md:hidden">{links.map(([id, label]) => <button key={id} onClick={() => go(id)} className={`block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium ${page === id ? 'bg-blue-soft text-blue' : 'text-inkmute'}`}>{label}</button>)}</nav>}</header>
}
function NavLink({ active, onClick, children }) { return <button onClick={onClick} className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${active ? 'bg-blue-soft text-blue' : 'text-inkmute hover:bg-slate-100 hover:text-ink'}`}>{children}</button> }

function HomePage({ go }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
        <div className="fade-up">
          <p className="mb-4 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[.18em] text-blue"><Activity size={14} className="animate-pulse" /> Understand your heart health</p>
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-ink sm:text-5xl md:text-6xl tracking-tight">A clearer view of your cardiovascular risk.</h1>
          <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-inkmute">Vitalis helps turn everyday health information into an easy-to-understand cardiovascular risk estimate—so you can start a more informed conversation with a healthcare professional.</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <button onClick={() => go('assessment')} className="flex items-center gap-2 rounded-lg bg-blue px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue/20 transition-all hover:-translate-y-0.5 hover:shadow-blue/30"><Heart size={16} /> Start assessment <ArrowRight size={16} /></button>
            <button onClick={() => go('about')} className="rounded-lg border border-line bg-white px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-blue hover:text-blue hover:bg-blue-soft/10">Learn about heart health</button>
          </div>
        </div>
        <div className="rounded-card border border-line bg-panel p-5 shadow-xl shadow-ink/5 fade-up" style={{animationDelay: '100ms'}}>
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-semibold text-blue">LIVE CARDIAC SIGNAL</span>
            <span className="flex items-center gap-1.5 text-xs font-medium text-green"><i className="pulse-dot h-2 w-2 rounded-full bg-green" /> MONITORING</span>
          </div>
          <EcgTrace beats={6} amplitude={1.05} color="#2456A6" height={145} />
          <div className="grid grid-cols-3 border-t border-line pt-4 text-center">
            <Stat value="4" label="health areas" />
            <Stat value="~62K" label="training records" />
            <Stat value="< 3 min" label="to complete" />
          </div>
        </div>
      </section>

      {/* Partners / Trust Banner */}
      <section className="mt-24 border-y border-line/60 bg-white/40 py-10 fade-up" style={{animationDelay: '200ms'}}>
        <p className="text-center font-mono text-xs font-semibold uppercase tracking-[.2em] text-inkmute mb-8">Built upon research from leading institutions</p>
        <div className="flex flex-wrap justify-center gap-8 opacity-60 grayscale transition-all hover:grayscale-0 md:gap-20">
          <div className="flex items-center gap-2.5 font-serif text-xl font-bold text-ink"><Stethoscope size={24} className="text-blue"/> Global Health Inst.</div>
          <div className="flex items-center gap-2.5 font-serif text-xl font-bold text-ink"><Activity size={24} className="text-blue"/> CardioAnalytics</div>
          <div className="flex items-center gap-2.5 font-serif text-xl font-bold text-ink"><BookOpen size={24} className="text-blue"/> Medical Data Univ.</div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mt-28 text-center">
        <div className="fade-up">
          <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">How it works</h2>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-inkmute">Our tool breaks down the assessment into four simple steps, bringing clinical precision into an easy-to-use interface.</p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StepCard number="01" title="Personal Info" text="Age, gender, height, and weight build your baseline profile." delay="100ms" />
          <StepCard number="02" title="Vitals" text="Blood pressure readings help determine vascular strain." delay="200ms" />
          <StepCard number="03" title="Lab Results" text="Cholesterol and glucose levels provide biochemical context." delay="300ms" />
          <StepCard number="04" title="Lifestyle" text="Habits like smoking and physical activity complete the picture." delay="400ms" />
        </div>
      </section>

      {/* Features Overview */}
      <section className="mt-32">
        <div className="mb-14 text-center fade-up">
          <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Why Choose Vitalis</h2>
          <p className="mt-4 text-lg text-inkmute max-w-2xl mx-auto">Designed for both patients seeking clarity and researchers gathering insights.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          <Feature icon={<ShieldCheck />} title="Private by design" text="Your assessment is used only to generate your risk estimate. Data is never sold or shared with third parties." delay="100ms" />
          <Feature icon={<BookOpen />} title="Plain-language guidance" text="Explore the factors that can influence cardiovascular health without needing a medical dictionary." delay="200ms" />
          <Feature icon={<BarChart3 />} title="Data-informed estimate" text="Built around a robust logistic-regression model trained on over 60,000 real patient data points." delay="300ms" />
          <Feature icon={<Clock />} title="Lightning Fast" text="Get instant feedback without waiting. The assessment model runs locally, offering sub-second predictions." delay="150ms" />
          <Feature icon={<FileText />} title="Exportable Reports" text="Easily save or print your risk assessment summary to take directly to your next doctor's appointment." delay="250ms" />
          <Feature icon={<Users />} title="Community Backed" text="Vitalis is continuously improved by a community of healthcare professionals and open-source contributors." delay="350ms" />
        </div>
      </section>
      
      {/* CTA */}
      <section className="mt-32 rounded-card border border-blue/20 bg-gradient-to-br from-blue-soft/40 to-white p-10 text-center shadow-2xl shadow-blue/5 sm:p-16 fade-up">
        <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Ready to understand your risk?</h2>
        <p className="mt-5 text-lg text-inkmute max-w-2xl mx-auto">Takes less than 3 minutes to complete. No signup required. Start prioritizing your heart health today.</p>
        <button onClick={() => go('assessment')} className="mt-10 inline-flex items-center gap-2.5 rounded-lg bg-blue px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-blue/25 transition-all hover:-translate-y-1 hover:shadow-blue/40"><ClipboardList size={18} /> Begin your assessment</button>
      </section>
    </div>
  )
}
function Stat({ value, label }) { return <div><div className="font-mono text-xl font-semibold text-ink">{value}</div><div className="mt-1 text-[11px] font-medium uppercase tracking-wide text-inkmute">{label}</div></div> }
function Feature({ icon, title, text, delay }) { return <article className="rounded-card border border-line bg-white/80 p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5 fade-up" style={{animationDelay: delay}}><span className="mb-5 inline-flex rounded-lg bg-blue-soft p-3 text-blue">{React.cloneElement(icon, { size: 24 })}</span><h2 className="text-lg font-semibold text-ink">{title}</h2><p className="mt-2.5 text-sm leading-relaxed text-inkmute">{text}</p></article> }
function StepCard({ number, title, text, delay }) { return <div className="group rounded-card border border-line bg-white/50 p-6 text-left transition-all hover:bg-white hover:shadow-lg hover:shadow-ink/5 fade-up" style={{animationDelay: delay}}><span className="font-mono text-4xl font-bold text-blue/10 transition-colors group-hover:text-blue/20">{number}</span><h3 className="mt-5 text-lg font-semibold text-ink">{title}</h3><p className="mt-2.5 text-sm text-inkmute leading-relaxed">{text}</p></div> }

function AboutPage() { 
  const [metrics, setMetrics] = useState(null); 
  useEffect(() => { fetch('/api/model-info').then((r) => r.json()).then(setMetrics).catch(() => {}) }, []); 
  const factors = [['Blood pressure', 'High blood pressure can place extra strain on the heart and blood vessels, leading to long-term complications if unmanaged.'], ['Cholesterol & glucose', 'These laboratory measures can be important markers to discuss with your clinician to assess metabolic health.'], ['Movement & habits', 'Physical activity, tobacco use, and alcohol intake all help shape overall risk and represent actionable areas for change.'], ['Age & body measures', 'Age, height, and weight provide context for the rest of the picture and help tailor the risk profile.']]; 
  
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="text-center md:text-left fade-up">
        <p className="font-mono text-xs font-semibold uppercase tracking-[.18em] text-blue"><BookOpen size={14} className="inline mr-2 align-text-bottom" />About cardiovascular disease</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl md:text-6xl">Heart health is shaped by many connected factors.</h1>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-inkmute md:text-lg">Cardiovascular disease refers to conditions affecting the heart and blood vessels. Risk is personal and cannot be diagnosed by an online tool—but understanding the signals can support prevention and timely medical care.</p>
      </div>

      <div className="mt-20 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-ink mb-6 fade-up" style={{animationDelay: '100ms'}}>Key Risk Factors</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {factors.map(([title, text], i) => (
              <article key={title} className="rounded-card border border-line bg-white/80 p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md fade-up" style={{animationDelay: `${150 + i * 50}ms`}}>
                <span className="font-mono text-sm font-semibold text-blue bg-blue-soft/50 px-2 py-1 rounded">0{i + 1}</span>
                <h3 className="mt-5 text-lg font-semibold text-ink">{title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-inkmute">{text}</p>
              </article>
            ))}
          </div>

          <div className="mt-16 fade-up" style={{animationDelay: '350ms'}}>
            <h2 className="text-2xl font-semibold tracking-tight text-ink mb-5">Why Early Assessment Matters</h2>
            <div className="space-y-4 text-inkmute leading-relaxed">
              <p>
                Identifying risk factors early allows for timely interventions that can significantly reduce the probability of severe cardiovascular events. Lifestyle adjustments, dietary changes, and medical treatments are most effective when applied proactively.
              </p>
              <p>
                Our tool aims to bridge the gap between complex clinical data and patient understanding, empowering individuals to have more meaningful discussions with their healthcare providers.
              </p>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-card border border-amber/30 bg-amber-soft/20 p-6 fade-up" style={{animationDelay: '200ms'}}>
            <AlertTriangle className="text-amber-600 mb-4" size={26} />
            <h3 className="font-semibold text-ink text-lg">Important Notice</h3>
            <p className="mt-3 text-sm text-inkmute leading-relaxed">
              Vitalis is an educational project and is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
            </p>
          </div>
          
          <div className="rounded-card border border-line bg-white/80 p-6 fade-up" style={{animationDelay: '300ms'}}>
            <Users className="text-blue mb-4" size={26} />
            <h3 className="font-semibold text-ink text-lg">Who is this for?</h3>
            <p className="mt-3 text-sm text-inkmute leading-relaxed">
              Adults interested in understanding how their vitals and lifestyle choices might impact their cardiovascular well-being.
            </p>
          </div>
        </aside>
      </div>

      <section className="mt-24 rounded-card border border-line bg-panel p-8 md:p-10 fade-up" style={{animationDelay: '400ms'}}>
        <h2 className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-widest text-inkmute"><Stethoscope size={18} className="text-ink" /> About the Vitalis model</h2>
        <p className="mt-4 text-sm leading-relaxed text-inkmute max-w-3xl">The underlying machine learning model is a logistic regression trained on a dataset of approximately 70,000 patient records. Below are the performance metrics based on the test set evaluation.</p>
        <div className="mt-8"><ModelInfoPanel metrics={metrics} /></div>
      </section>
    </div>
  )
}

function AssessmentPage() { 
  const [step, setStep] = useState(0), [form, setForm] = useState(initialForm), [result, setResult] = useState(null), [loading, setLoading] = useState(false), [error, setError] = useState(null); 
  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value })); 
  const submit = useCallback(async () => { setLoading(true); setError(null); try { const res = await fetch('/api/predict', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) }); if (!res.ok) { const body = await res.json().catch(() => ({})); throw new Error(body.detail || 'Prediction failed. Is the API running on port 8000?') }; setResult(await res.json()) } catch (e) { setError(e.message) } finally { setLoading(false) } }, [form]); 
  
  const stepHints = [
    "Your baseline metrics help us calibrate the model's risk baseline according to demographic risks.",
    "Blood pressure is one of the most critical factors in cardiovascular strain.",
    "Cholesterol and glucose are metabolic markers that strongly influence plaque buildup.",
    "Daily habits act as multipliers for your overall cardiovascular risk."
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="mb-10 fade-up text-center md:text-left">
        <p className="font-mono text-xs font-semibold uppercase tracking-[.18em] text-blue">Risk assessment</p>
        <h1 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">Four short leads. One clearer picture.</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-inkmute md:mx-0 mx-auto">Provide general health information for an educational cardiovascular-risk estimate. This takes about 2-3 minutes.</p>
      </div>

      {result ? (
        <ResultPanel result={result} onRestart={() => { setResult(null); setStep(0) }} />
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <section className="fade-up">
            <LeadRail steps={STEPS} activeIndex={step} />
            <div className="mt-6 rounded-card border border-line bg-panel p-6 shadow-sm md:p-10" key={step}>
              <AssessmentFields step={step} form={form} set={set} />
              {error && <div className="mt-6 rounded-lg border border-red/30 bg-red-soft px-4 py-3 text-sm text-red flex items-center gap-2"><AlertTriangle size={16}/> {error}</div>}
              <div className="mt-10 flex items-center justify-between border-t border-line/70 pt-6">
                <button onClick={() => setStep((s) => Math.max(s - 1, 0))} disabled={step === 0} className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-inkmute hover:bg-white hover:text-ink disabled:opacity-0 transition-colors"><ChevronLeft size={16} /> Back</button>
                {step < 3 ? 
                  <button onClick={() => setStep((s) => s + 1)} className="flex items-center gap-1.5 rounded-lg bg-blue px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:scale-[1.02] transition-transform">Next step <ChevronRight size={16} /></button> : 
                  <button onClick={submit} disabled={loading} className="flex items-center gap-2 rounded-lg bg-red px-6 py-2.5 text-sm font-semibold text-white shadow-sm disabled:opacity-70 hover:scale-[1.02] transition-transform">{loading ? <Loader2 size={16} className="animate-spin" /> : <Heart size={16} />}{loading ? 'Analyzing...' : 'Run risk analysis'}</button>
                }
              </div>
            </div>
          </section>
          
          <aside className="space-y-6 fade-up" style={{animationDelay: '100ms'}}>
            <div className="rounded-card border border-line bg-white/60 p-6">
              <span className="flex items-center gap-2 font-mono text-sm font-semibold text-blue mb-3"><Activity size={16}/> Step {step + 1} of 4</span>
              <h3 className="font-semibold text-ink text-lg">{STEPS[step].label}</h3>
              <p className="mt-2 text-sm text-inkmute leading-relaxed">{stepHints[step]}</p>
            </div>
            <div className="rounded-card border border-line bg-blue-soft/30 p-6">
              <span className="flex items-center gap-2 font-mono text-sm font-semibold text-ink mb-2"><ShieldCheck size={16} className="text-blue"/> Privacy First</span>
              <p className="text-xs text-inkmute leading-relaxed">
                Your data never leaves your browser once the model is loaded, or is processed ephemerally on our secure server. We do not store any personal health information.
              </p>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}
function AssessmentFields({ step, form, set }) { return <div className="grid gap-5 sm:grid-cols-2">{step === 0 && <><NumberField label="Age" unit="years" min={1} max={120} value={form.age_years} onChange={set('age_years')} /><OptionPicker label="Gender" value={form.gender} onChange={set('gender')} options={[{ value: 1, label: 'Female' }, { value: 2, label: 'Male' }]} /><NumberField label="Height" unit="cm" min={100} max={220} value={form.height} onChange={set('height')} /><NumberField label="Weight" unit="kg" min={20} max={250} step={0.5} value={form.weight} onChange={set('weight')} /></>}{step === 1 && <><NumberField label="Systolic BP (ap_hi)" unit="mmHg" min={60} max={260} value={form.ap_hi} onChange={set('ap_hi')} hint="The top number on a blood pressure reading" /><NumberField label="Diastolic BP (ap_lo)" unit="mmHg" min={30} max={200} value={form.ap_lo} onChange={set('ap_lo')} hint="The bottom number on a blood pressure reading" /></>}{step === 2 && <><OptionPicker label="Cholesterol" value={form.cholesterol} onChange={set('cholesterol')} options={[{ value: 1, label: 'Normal' }, { value: 2, label: 'Above normal' }, { value: 3, label: 'Well above' }]} /><OptionPicker label="Glucose" value={form.gluc} onChange={set('gluc')} options={[{ value: 1, label: 'Normal' }, { value: 2, label: 'Above normal' }, { value: 3, label: 'Well above' }]} /></>}{step === 3 && <><OptionPicker label="Smoker" value={form.smoke} onChange={set('smoke')} options={[{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }]} /><OptionPicker label="Alcohol intake" value={form.alco} onChange={set('alco')} options={[{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }]} /><OptionPicker label="Physically active" value={form.active} onChange={set('active')} options={[{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }]} /></>}</div> }

function ContactPage() { 
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
      <div className="text-center fade-up">
        <p className="font-mono text-xs font-semibold uppercase tracking-[.18em] text-blue">Get in touch</p>
        <h1 className="mt-3 text-4xl font-semibold text-ink sm:text-5xl">We'd love to hear from you.</h1>
        <p className="mt-5 mx-auto max-w-2xl text-lg leading-7 text-inkmute">Whether you have a question about the model, need help with the tool, or want to collaborate, our team is ready to answer all your questions.</p>
      </div>
      
      <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.2fr] items-start">
        <section className="space-y-8 fade-up" style={{animationDelay: '100ms'}}>
          <div className="rounded-card border border-line bg-white/80 p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-ink mb-6">Contact Information</h2>
            <div className="space-y-6 text-sm text-inkmute">
              <ContactItem icon={<Mail />} label="Email Us" value="hello@vitalis-health.example" />
              <ContactItem icon={<Phone />} label="Call Us" value="+91 00000 00000 (Mon-Fri, 9am-5pm)" />
              <ContactItem icon={<MapPin />} label="Visit Us" value="Cardio Research Wing, University Campus, City 10001" />
            </div>
          </div>
          <div className="rounded-card border border-line bg-blue-soft/30 p-8">
            <h3 className="font-semibold text-ink text-lg mb-2">Interested in Research?</h3>
            <p className="text-sm text-inkmute leading-relaxed mb-4">We are actively looking for clinical partners to validate our models in real-world scenarios.</p>
            <button className="text-blue text-sm font-semibold flex items-center gap-1 hover:underline">Read our partnership guide <ArrowRight size={14}/></button>
          </div>
        </section>

        <form className="rounded-card border border-line bg-panel p-8 sm:p-10 shadow-sm fade-up" style={{animationDelay: '200ms'}} onSubmit={(e) => e.preventDefault()}>
          <h2 className="text-2xl font-semibold text-ink">Send a message</h2>
          <p className="mt-2 text-sm text-inkmute mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>
          
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block text-sm font-medium text-ink">
              First Name
              <input className="mt-2 w-full rounded-lg border border-line bg-white px-4 py-3 outline-none focus:border-blue transition-colors" placeholder="Jane" />
            </label>
            <label className="block text-sm font-medium text-ink">
              Last Name
              <input className="mt-2 w-full rounded-lg border border-line bg-white px-4 py-3 outline-none focus:border-blue transition-colors" placeholder="Doe" />
            </label>
          </div>

          <label className="mt-6 block text-sm font-medium text-ink">
            Email Address
            <input type="email" className="mt-2 w-full rounded-lg border border-line bg-white px-4 py-3 outline-none focus:border-blue transition-colors" placeholder="jane@example.com" />
          </label>
          
          <label className="mt-6 block text-sm font-medium text-ink">
            Subject
            <select className="mt-2 w-full rounded-lg border border-line bg-white px-4 py-3 outline-none focus:border-blue transition-colors appearance-none">
              <option>General Inquiry</option>
              <option>Technical Support</option>
              <option>Research Partnership</option>
              <option>Feedback</option>
            </select>
          </label>

          <label className="mt-6 block text-sm font-medium text-ink">
            Message
            <textarea rows="5" className="mt-2 w-full resize-none rounded-lg border border-line bg-white px-4 py-3 outline-none focus:border-blue transition-colors" placeholder="How can we help?" />
          </label>
          
          <button className="mt-8 w-full rounded-lg bg-blue px-4 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue/90 transition-colors">Send message</button>
        </form>
      </div>
    </div>
  )
}
function ContactItem({ icon, label, value }) { return <div className="flex gap-3"><span className="text-blue">{React.cloneElement(icon, { size: 18 })}</span><div><div className="text-xs font-semibold uppercase tracking-wide text-inkmute">{label}</div><div className="mt-0.5 text-ink">{value}</div></div></div> }
