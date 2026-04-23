import React, { useState, useEffect, useRef, useCallback } from 'react'

/* ============================================
   NAVIGATION
   ============================================ */
function Navigation({ activeSection, onNavigate }) {
  const sections = [
    { id: 'philosophy', label: 'Philosophy', num: '01' },
    { id: 'pipelines', label: 'Pipelines', num: '02' },
    { id: 'agents', label: 'Agents', num: '03' },
    { id: 'facts', label: 'Facts', num: '04' }
  ]

  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="brand">
          <span className="dot" />
          <span>bash</span>
          <span className="muted">/is-all-you-need</span>
        </div>
        <div className="nav-links">
          {sections.map((s) => (
            <button
              key={s.id}
              data-target={s.id}
              className={activeSection === s.id ? 'active' : ''}
              onClick={() => onNavigate(s.id)}
            >
              <span className="num">{s.num}</span>
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

/* ============================================
   HERO SECTION
   ============================================ */
function Hero() {
  return (
    <header className="hero">
      <div className="eyebrow">My quiet rebellion against over-engineering</div>
      <h1>
        The <span className="accent">$Bash</span> shell is still the fastest, most <span className="accent">deterministic</span> tool you own
        <span className="cursor" />
      </h1>
      <p className="lede">
        In an era obsessed with autonomous agents and thousand-line orchestration frameworks, <span className="accent">$Bash 'The Bourne Again Shell'</span>, remains the most reliable way to engineer modern workflows. The insight is "Putting intelligence at the edges and keeping the core pipeline rigid".
      </p>
      <div style={{ fontSize: '15px', color: 'rgb(74, 222, 128)', fontFamily: '\'JetBrains Mono\', monospace', marginTop: '14px', display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
        <span>— Gregory Kennedy: ML Engineer</span>
        <span className="socials" style={{ display: 'inline-flex', gap: '10px', alignItems: 'center' }}>
          <a
            href="https://github.com/mindful-ai-dude"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="GitHub"
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', border: '1px solid var(--line-2)', borderRadius: '6px', color: 'var(--ink-2)', transition: 'all .15s ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#4ade80'; e.currentTarget.style.borderColor = '#4ade80'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = ''; e.currentTarget.style.borderColor = ''; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .5C5.73.5.5 5.73.5 12.02c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.78.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18A11.1 11.1 0 0 1 12 6.8c.98 0 1.96.13 2.88.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56A11.52 11.52 0 0 0 23.5 12.02C23.5 5.73 18.27.5 12 .5z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/gregorykennedymindfuldude/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', border: '1px solid var(--line-2)', borderRadius: '6px', color: 'var(--ink-2)', transition: 'all .15s ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#4ade80'; e.currentTarget.style.borderColor = '#4ade80'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = ''; e.currentTarget.style.borderColor = ''; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
            </svg>
          </a>
          <a
            href="https://www.youtube.com/@gregorykennedy-mindfuldude/videos"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            title="YouTube"
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', border: '1px solid var(--line-2)', borderRadius: '6px', color: 'var(--ink-2)', transition: 'all .15s ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#4ade80'; e.currentTarget.style.borderColor = '#4ade80'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = ''; e.currentTarget.style.borderColor = ''; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4L15.8 12l-6.2 3.6z" />
            </svg>
          </a>
        </span>
      </div>
      <div className="meta">
        <span><b>Written</b> April 2026</span>
        <span><b>Read time</b> 6 min</span>
        <span><b>Topic</b> ML ops · AI agents · Unix</span>
      </div>
    </header>
  )
}

/* ============================================
   TERMINAL DEMO
   ============================================ */
function TerminalDemo() {
  const termLines = [
    { t: 'p', x: 'echo "Starting AI pipeline..."' },
    { t: 'o', x: 'Starting AI pipeline...' },
    { t: 'p', x: "cat raw_data.jsonl | jq '.text' | tr '[A-Z]' '[a-z]' > clean.txt" },
    { t: 'p', x: 'python train_model.py --input clean.txt && echo "Success"' },
    { t: 'o', x: 'Training epoch 1/10...' },
    { t: 'o', x: '...' },
    { t: 'o', x: 'Success' },
    { t: 'p', x: 'wc -l clean.txt' },
    { t: 'o', x: '154320 clean.txt' },
  ]

  return (
    <div className="terminal">
      <div className="t-bar">
        <span className="t-dot r" />
        <span className="t-dot y" />
        <span className="t-dot g" />
        <span className="t-title">user@ai-workstation:~</span>
      </div>
      <div className="t-body">
        {termLines.map((line, i) => (
          line.t === 'p'
            ? <div key={i} className="p">{line.x}</div>
            : <div key={i} className="o">{line.x}</div>
        ))}
        <div className="p"><span className="c" /></div>
      </div>
    </div>
  )
}

/* ============================================
   WORKFLOW SIMULATOR
   ============================================ */
function WorkflowSimulator() {
  const [running, setRunning] = useState(false)
  const [output, setOutput] = useState(null)

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

  const runSim = useCallback(async () => {
    setRunning(true)
    setOutput('agent')
    await sleep(800)
    setOutput('agent-error')
    await sleep(900)
    setOutput('bash-done')
    setRunning(false)
  }, [])

  return (
    <div className="sim">
      <div className="sim-bar">
        <div className="t">Workflow simulator <span className="muted">— compare agent vs script on the same task</span></div>
        <button className="sim-btn" onClick={runSim} disabled={running}>
          {running ? 'Running...' : output === 'bash-done' ? 'Run again' : 'Run comparison'}
        </button>
      </div>
      <div className="sim-out">
        {output === null && <span className="dim">{'// Click run to simulate.'}</span>}
        {output === 'agent' && (
          <>
            <div className="h">{'>>> Autonomous Agent Pipeline'}</div>
            <div className="indent dim">Thinking... Plan: read file, parse json, loop data.</div>
          </>
        )}
        {output === 'agent-error' && (
          <>
            <div className="h">{'>>> Autonomous Agent Pipeline'}</div>
            <div className="indent dim">Thinking... Plan: read file, parse json, loop data.</div>
            <div className="indent err">Error: Hallucinated function `parse_json_fast()` not found.</div>
            <div className="indent dim">Retrying... Rate limit exceeded.</div>
          </>
        )}
        {output === 'bash-done' && (
          <>
            <div className="h">{'>>> Autonomous Agent Pipeline'}</div>
            <div className="indent dim">Thinking... Plan: read file, parse json, loop data.</div>
            <div className="indent err">Error: Hallucinated function `parse_json_fast()` not found.</div>
            <div className="indent dim">Retrying... Rate limit exceeded.</div>
            <div className="h g">{'>>> Strict Bash Pipeline'}</div>
            <div className="indent">
              <span className="code">cat data.jsonl | jq -r '.id' {'>'} out.txt</span>
            </div>
            <div className="indent ok">Executed in 0.04s · exit 0</div>
          </>
        )}
      </div>
    </div>
  )
}

/* ============================================
   FACT CARD
   ============================================ */
function FactCard({ cls, kicker, title, desc, detail, danger }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`fact ${cls} ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
      <div className="k">{kicker}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
      <div className="detail">
        {danger ? (
          <code>{detail}</code>
        ) : (
          <span>{detail}</span>
        )}
      </div>
    </div>
  )
}

/* ============================================
   MAIN APP
   ============================================ */
export default function App() {
  const [activeSection, setActiveSection] = useState('philosophy')
  const philosophyRef = useRef(null)
  const pipelinesRef = useRef(null)
  const agentsRef = useRef(null)
  const factsRef = useRef(null)

  const navigate = useCallback((id) => {
    setActiveSection(id)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    const sections = [philosophyRef, pipelinesRef, agentsRef, factsRef]
    sections.forEach((ref) => {
      if (ref.current) observer.observe(ref.current)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div>
      <Hero />

      <Navigation activeSection={activeSection} onNavigate={navigate} />

      {/* ===== 01 PHILOSOPHY ===== */}
      <section id="philosophy" ref={philosophyRef} className="sec">
        <div className="sec-head">
          <h2><span className="num">01</span>Philosophy</h2>
          <p className="desc">Three properties make Bash uniquely suited to sit at the core of non-deterministic probabilistic systems.</p>
        </div>

        <div className="pillars">
          <div className="pillar">
            <div className="k">01 / Determinism</div>
            <h3>Exact execution</h3>
            <p>Unlike non-deterministic probabilistic agents that can hallucinate logic, Bash executes exactly what is written. Exit codes provide binary clarity: success (<code>0</code>) or failure (<code>{'>'}0</code>).</p>
          </div>
          <div className="pillar">
            <div className="k">02 / Composition</div>
            <h3>The ultimate glue</h3>
            <p>Bash isn't meant to write neural networks — it connects the tools that do. Piping <code>curl</code> to <code>jq</code> to <code>python</code> beats a 500-line wrapper for robustness.</p>
          </div>
          <div className="pillar">
            <div className="k">03 / Adaptability</div>
            <h3>Change in seconds</h3>
            <p>When APIs shift or dependencies break, a shell script is adapted with <code>sed</code> or <code>awk</code>. Modifying a heavy abstraction layer takes hours.</p>
          </div>
        </div>

        <TerminalDemo />
      </section>

      {/* ===== 02 PIPELINES ===== */}
      <section id="pipelines" ref={pipelinesRef} className="sec">
        <div className="sec-head">
          <h2><span className="num">02</span>ML & AI Pipelines</h2>
          <p className="desc">Python is the language of ML modeling. <span className="accent">Bash is the language of ML operations.</span></p>
        </div>

        <div className="data-grid">
          <div className="stat-block" style={{ gridRow: '1 / span 2' }}>
            <div className="stat-big">80%</div>
            <div className="stat-label">of ML work is data wrangling</div>
            <p className="stat-text">Building an AI model is mostly moving and shaping data. When handling millions of log lines, Pandas can OOM; Bash tools stream, so they handle arbitrary-sized inputs with near-zero memory footprint.</p>

            <div className="bar-breakdown">
              <div className="bar-row"><span className="lbl">Data collection & preprocessing</span><span className="val">65%</span></div>
              <div className="bar-track"><div className="bar-fill" style={{ width: '65%' }} /></div>
              <div className="bar-row"><span className="lbl">Model training</span><span className="val">15%</span></div>
              <div className="bar-track"><div className="bar-fill dim" style={{ width: '15%' }} /></div>
              <div className="bar-row"><span className="lbl">Evaluation & tuning</span><span className="val">10%</span></div>
              <div className="bar-track"><div className="bar-fill muted" style={{ width: '10%' }} /></div>
              <div className="bar-row"><span className="lbl">Deployment config</span><span className="val">10%</span></div>
              <div className="bar-track"><div className="bar-fill muted" style={{ width: '10%' }} /></div>
            </div>
          </div>

          <div className="pipe-wrap">
            <h4>— From ingestion to training</h4>
            <div className="pipe">
              <div className="pipe-step">
                <div className="n">01</div>
                <div className="t">Ingest</div>
                <div className="d">Pull raw data from remote APIs.</div>
                <code>curl · wget</code>
              </div>
              <div className="pipe-step">
                <div className="n">02</div>
                <div className="t">Extract</div>
                <div className="d">Parse JSON structures flawlessly.</div>
                <code>jq '.text'</code>
              </div>
              <div className="pipe-step">
                <div className="n">03</div>
                <div className="t">Transform</div>
                <div className="d">Clean and tokenize text.</div>
                <code>sed · awk · tr</code>
              </div>
              <div className="pipe-step">
                <div className="n">04</div>
                <div className="t">Execute</div>
                <div className="d">Trigger the core ML model.</div>
                <code>python train.py</code>
              </div>
            </div>
            <div className="pipe-code">
              <span className="pr">$</span>
              <span className="cmd"> curl -s api.data.com/v1 | jq -r '.items[].text' | awk '{'{print tolower($0)}'}' {'>'} clean.txt && python train.py</span>
            </div>
          </div>

          <div className="reality-box" style={{ gridColumn: 2 }}>
            <h4>— The backdrop</h4>
            <h3>The <span className="accent">Machine Learning</span> reality</h3>
            <p>The glamour of artificial intelligence lies in model architecture and training, but the reality of building these systems is overwhelmingly <em>data-centric</em>. Before a GPU processes a single tensor, terabytes of unstructured text, logs, and images must be fetched, cleaned, filtered, and formatted. This is where high-level abstractions fail and bare-metal scripting shines.</p>
          </div>
        </div>
      </section>

      {/* ===== 03 AGENTS ===== */}
      <section id="agents" ref={agentsRef} className="sec">
        <div className="sec-head">
          <h2><span className="num">03</span>The Agent Problem</h2>
          <p className="desc">Why deterministic scripts beat autonomous agents for the core loop.</p>
        </div>

        <div className="agent-grid">
          <div className="cmp bad">
            <div className="tag">{'\u26A0'} Agent — non-deterministic & probabilistic</div>
            <h3>The autonomy trap</h3>
            <p>Asking an AI agent to decide <em>how</em> to execute a deployment introduces non-deterministic probabilistic failure. If context shifts slightly, the agent picks the wrong tool or loops trying to fix its own errors.</p>
            <ul>
              <li>Reliability ≈ 45%</li>
              <li>Heavy abstraction overhead</li>
              <li>Non-reviewable decision path</li>
            </ul>
          </div>
          <div className="cmp good">
            <div className="tag">{'\u2713'} Bash — deterministic</div>
            <h3>Intelligence at the edges</h3>
            <p>Use the LLM to <em>write</em> a strict, reviewable Bash script once. Humans verify it. Bash executes it deterministically forever. The core pipeline stays rigid.</p>
            <ul>
              <li>Reliability ≈ 98%</li>
              <li>Minimal overhead</li>
              <li>Diff-able, auditable, reproducible</li>
            </ul>
          </div>
        </div>

        <WorkflowSimulator />
      </section>

      {/* ===== 04 FACTS ===== */}
      <section id="facts" ref={factsRef} className="sec">
        <div className="sec-head">
          <h2><span className="num">04</span>Fast Facts</h2>
          <p className="desc">A few foundational facts worth internalizing.</p>
        </div>

        <div className="facts">
          <FactCard
            cls="hist"
            kicker="History"
            title="Born in 1989"
            desc="Written by Brian Fox for the GNU Project as a free replacement for the Bourne shell (sh)."
            detail='"Bourne Again Shell" is a pun on the original Bourne shell built by Stephen Bourne at Bell Labs.'
          />
          <FactCard
            cls="ubiq"
            kicker="Ubiquity"
            title="It's Everywhere"
            desc="Default login shell on most Linux distros; was the macOS default for over a decade."
            detail="macOS switched to Zsh in Catalina, but Bash is still bundled and dominates containerized environments."
          />
          <FactCard
            cls="feat"
            kicker="Feature"
            title="The pipe |"
            desc="The vertical bar hands stdout of one command directly to stdin of the next — the foundation of composition."
            detail='ls -l | grep "html" | wc -l'
          />
          <FactCard
            cls="dang"
            kicker="Danger"
            title="rm -rf /"
            desc="With great power comes the ability to delete your entire operating system instantly."
            detail="rm -rf /"
            danger
          />
        </div>
        <p className="facts-hint">— click a card to expand</p>
      </section>

      <footer>
        Compiled for the "Bash is All You Need" research project<br />
        <span className="exit">$ exit 0</span>
      </footer>
    </div>
  )
}