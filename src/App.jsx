import { useMemo, useState } from "react";

const MOCK = {
  athlete: {
    name: "Alex Rivera",
    role: "Endurance + Strength",
    device: "Garmin Forerunner 965 · Huawei Watch GT",
    lastSync: "Today · 06:14",
  },
  wearable: {
    restingHr: 52,
    restingHrDelta: -2,
    hrv: 68,
    hrvDelta: 4,
    readiness: 87,
    readinessLabel: "Prime",
    sleepHours: 7.4,
    spo2: 98,
    stress: 18,
    bodyBattery: 82,
  },
  macros: {
    protein: { current: 162, target: 180, unit: "g" },
    fat: { current: 78, target: 95, unit: "g" },
    carbs: { current: 41, target: 60, unit: "g" },
    calories: { current: 1684, target: 2100, unit: "kcal" },
  },
  training: {
    cardio: {
      title: "Incline Treadmill Cardio",
      date: "Today · AM",
      duration: "42:00",
      incline: "8%",
      distance: "5.6 km",
      calories: 487,
      avgHr: 141,
      maxHr: 164,
      pace: "7:30 /km",
    },
    strength: {
      title: "Full-Body Strength Supersets",
      date: "Yesterday · PM",
      duration: "54:00",
      calories: 312,
      volume: "18,640 kg",
      supersets: [
        {
          name: "A · Posterior chain",
          pairs: [
            { exercise: "Romanian deadlift", sets: 4, reps: "8", load: "90 kg" },
            { exercise: "Weighted chin-up", sets: 4, reps: "6", load: "+12 kg" },
          ],
        },
        {
          name: "B · Push + core",
          pairs: [
            { exercise: "Incline DB press", sets: 4, reps: "8", load: "32 kg" },
            { exercise: "Hanging knee raise", sets: 4, reps: "12", load: "BW" },
          ],
        },
        {
          name: "C · Unilateral",
          pairs: [
            { exercise: "Walking lunge", sets: 3, reps: "10/leg", load: "24 kg" },
            { exercise: "Single-arm row", sets: 3, reps: "10", load: "28 kg" },
          ],
        },
      ],
    },
  },
  supplements: [
    { id: "omega", name: "Omega-3", dose: "2 g EPA+DHA", timing: "With first meal", taken: true },
    { id: "ashwa", name: "Ashwagandha KSM-66", dose: "600 mg", timing: "Evening", taken: true },
    { id: "enzymes", name: "Digestive Enzymes", dose: "1 capsule", timing: "With lunch", taken: false },
  ],
};

const NAV = [
  { id: "overview", label: "Overview" },
  { id: "wearable", label: "Wearable" },
  { id: "training", label: "Training" },
  { id: "nutrition", label: "Nutrition" },
];

function IconPulse({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 12h3l2.2-6 3.6 12 2.4-6H21" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconLock({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" strokeLinecap="round" />
    </svg>
  );
}

function IconLogout({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M10 6H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h4" strokeLinecap="round" />
      <path d="M14 16l4-4-4-4M10 12h8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconMenu({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 7h16M4 12h16M4 17h10" strokeLinecap="round" />
    </svg>
  );
}

function pct(current, target) {
  if (!target) return 0;
  return Math.min(100, Math.round((current / target) * 100));
}

function Ring({ value, size = 128, stroke = 10, color = "#22e0d0" }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle cx={size / 2} cy={size / 2} r={r} stroke="#1c2a38" strokeWidth={stroke} fill="none" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke={color}
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={c}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 8px ${color})` }}
      />
    </svg>
  );
}

function LoginScreen({ onSignIn }) {
  const [email, setEmail] = useState("alex.rivera@aether.lab");
  const [password, setPassword] = useState("••••••••");
  const [busy, setBusy] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setBusy(true);
    setTimeout(() => onSignIn(), 420);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-16 h-80 w-80 rounded-full bg-cyan-neon/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet-neon/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#94a3b8_1px,transparent_1px),linear-gradient(to_bottom,#94a3b8_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-neon/30 bg-panel shadow-glow">
            <IconPulse className="w-6 h-6 text-cyan-neon" />
          </div>
          <p className="font-mono text-[11px] tracking-[0.28em] text-cyan-neon uppercase">Aether Lab</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Unified Telemetry</h1>
          <p className="mt-2 text-sm text-slate-400">Wearable · Training · Nutrition command surface</p>
        </div>

        <form
          onSubmit={submit}
          className="rounded-2xl border border-line bg-panel/80 backdrop-blur-xl p-6 shadow-glow"
        >
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 w-full rounded-xl border border-line bg-void px-3.5 py-3 text-sm text-slate-100 outline-none focus:border-cyan-neon/60 focus:ring-2 focus:ring-cyan-neon/20"
            placeholder="you@domain.com"
            required
          />
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-5 w-full rounded-xl border border-line bg-void px-3.5 py-3 text-sm text-slate-100 outline-none focus:border-cyan-neon/60 focus:ring-2 focus:ring-cyan-neon/20"
            placeholder="Password"
            required
          />
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-xl bg-cyan-neon py-3 text-sm font-semibold text-void transition hover:brightness-110 disabled:opacity-70"
          >
            {busy ? "Syncing session…" : "Sign In"}
          </button>
          <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
            <IconLock /> Demo gate only · no authentication backend
          </p>
        </form>
      </div>
    </div>
  );
}

function MacroBar({ label, current, target, unit, tone }) {
  const value = pct(current, target);
  const tones = {
    protein: "from-cyan-neon to-emerald-400",
    fat: "from-violet-neon to-fuchsia-400",
    carbs: "from-amber-400 to-orange-400",
    calories: "from-sky-400 to-cyan-neon",
  };
  return (
    <div>
      <div className="mb-1.5 flex items-end justify-between">
        <span className="text-xs uppercase tracking-wider text-slate-400">{label}</span>
        <span className="font-mono text-xs text-slate-200">
          {current}
          <span className="text-slate-500"> / {target} {unit}</span>
        </span>
      </div>
      <div className="h-2 rounded-full bg-void overflow-hidden border border-line">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${tones[tone]} transition-all duration-700`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function Dashboard({ onSignOut }) {
  const [section, setSection] = useState("overview");
  const [mobileNav, setMobileNav] = useState(false);
  const [supps, setSupps] = useState(MOCK.supplements);
  const takenCount = useMemo(() => supps.filter((s) => s.taken).length, [supps]);

  const toggleSupp = (id) => {
    setSupps((prev) => prev.map((s) => (s.id === id ? { ...s, taken: !s.taken } : s)));
  };

  const show = (id) => section === "overview" || section === id;

  return (
    <div className="min-h-screen flex">
      <aside className="hidden lg:flex w-64 flex-col border-r border-line bg-panel/70 backdrop-blur-xl">
        <div className="px-5 py-6 border-b border-line">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-neon/30 bg-void shadow-glow">
              <IconPulse className="text-cyan-neon" />
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-[0.22em] text-cyan-neon uppercase">Aether Lab</p>
              <p className="text-sm font-semibold">Telemetry</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className={`w-full rounded-xl px-3 py-2.5 text-left text-sm transition ${
                section === item.id
                  ? "bg-cyan-neon/10 text-cyan-neon border border-cyan-neon/20"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-line">
          <div className="rounded-xl border border-line bg-void p-3 mb-3">
            <p className="text-sm font-medium">{MOCK.athlete.name}</p>
            <p className="text-[11px] text-slate-500">{MOCK.athlete.role}</p>
          </div>
          <button
            onClick={onSignOut}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-line px-3 py-2 text-xs text-slate-400 hover:text-slate-100 hover:bg-white/5"
          >
            <IconLogout /> Sign out
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-20 border-b border-line bg-void/80 backdrop-blur-xl">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5">
            <div className="flex items-center gap-3">
              <button
                className="lg:hidden rounded-lg border border-line p-2 text-slate-300"
                onClick={() => setMobileNav((v) => !v)}
              >
                <IconMenu />
              </button>
              <div>
                <h2 className="text-base sm:text-lg font-semibold">Command Dashboard</h2>
                <p className="text-[11px] text-slate-500 font-mono">
                  Last sync {MOCK.athlete.lastSync} · {MOCK.athlete.device}
                </p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-neon animate-pulse" />
              <span className="text-xs text-slate-400">Live mock stream</span>
            </div>
          </div>
          {mobileNav && (
            <div className="lg:hidden border-t border-line px-3 py-2 flex gap-2 overflow-x-auto">
              {NAV.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSection(item.id);
                    setMobileNav(false);
                  }}
                  className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs ${
                    section === item.id ? "bg-cyan-neon text-void" : "border border-line text-slate-400"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button onClick={onSignOut} className="whitespace-nowrap rounded-full border border-line px-3 py-1.5 text-xs text-slate-400">
                Sign out
              </button>
            </div>
          )}
        </header>

        <main className="p-4 sm:p-6 space-y-6 max-w-7xl">
          {show("wearable") && (
            <section>
              <div className="mb-3 flex items-end justify-between">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-neon">Wearable telemetry</p>
                  <h3 className="text-xl font-semibold">Readiness stack</h3>
                </div>
                <p className="text-[11px] text-slate-500">Garmin / Huawei mock</p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <article className="rounded-2xl border border-line bg-card p-5 shadow-glow">
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Resting heart rate</p>
                  <div className="mt-3 flex items-end gap-2">
                    <span className="text-4xl font-semibold tabular-nums">{MOCK.wearable.restingHr}</span>
                    <span className="mb-1 text-sm text-slate-500">bpm</span>
                  </div>
                  <p className="mt-2 text-xs text-emerald-400 font-mono">{MOCK.wearable.restingHrDelta} bpm vs 7-day</p>
                  <div className="mt-4 h-12 flex items-end gap-1">
                    {[58, 56, 55, 54, 53, 54, 52].map((v, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm bg-cyan-neon/70"
                        style={{ height: `${((v - 48) / 12) * 100}%` }}
                      />
                    ))}
                  </div>
                </article>

                <article className="rounded-2xl border border-line bg-card p-5 shadow-glow-violet">
                  <p className="text-xs text-slate-400 uppercase tracking-wider">HRV (rMSSD)</p>
                  <div className="mt-3 flex items-end gap-2">
                    <span className="text-4xl font-semibold tabular-nums">{MOCK.wearable.hrv}</span>
                    <span className="mb-1 text-sm text-slate-500">ms</span>
                  </div>
                  <p className="mt-2 text-xs text-emerald-400 font-mono">+{MOCK.wearable.hrvDelta} ms recovery</p>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-[11px]">
                    <div className="rounded-lg border border-line bg-void px-2 py-2">
                      <p className="text-slate-500">Sleep</p>
                      <p className="font-mono text-slate-200">{MOCK.wearable.sleepHours}h</p>
                    </div>
                    <div className="rounded-lg border border-line bg-void px-2 py-2">
                      <p className="text-slate-500">SpO2</p>
                      <p className="font-mono text-slate-200">{MOCK.wearable.spo2}%</p>
                    </div>
                    <div className="rounded-lg border border-line bg-void px-2 py-2">
                      <p className="text-slate-500">Stress</p>
                      <p className="font-mono text-slate-200">{MOCK.wearable.stress}</p>
                    </div>
                  </div>
                </article>

                <article className="rounded-2xl border border-cyan-neon/20 bg-card p-5 flex items-center gap-5">
                  <div className="relative shrink-0">
                    <Ring value={MOCK.wearable.readiness} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center rotate-0">
                      <span className="text-3xl font-semibold tabular-nums">{MOCK.wearable.readiness}</span>
                      <span className="text-[10px] uppercase tracking-widest text-slate-400">score</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider">Daily readiness</p>
                    <p className="mt-1 text-2xl font-semibold text-cyan-neon">{MOCK.wearable.readinessLabel}</p>
                    <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                      Body battery {MOCK.wearable.bodyBattery}. Green-light for mixed session — keep incline work
                      aerobic and leave one set in reserve on strength.
                    </p>
                  </div>
                </article>
              </div>
            </section>
          )}

          {show("training") && (
            <section>
              <div className="mb-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-violet-neon">Training log</p>
                <h3 className="text-xl font-semibold">Cardio vs strength contrast</h3>
              </div>

              <div className="grid gap-4 xl:grid-cols-2">
                <article className="rounded-2xl border border-line bg-card overflow-hidden">
                  <div className="px-5 py-4 border-b border-line flex items-center justify-between bg-gradient-to-r from-cyan-neon/10 to-transparent">
                    <div>
                      <h4 className="font-semibold">{MOCK.training.cardio.title}</h4>
                      <p className="text-[11px] text-slate-500">{MOCK.training.cardio.date}</p>
                    </div>
                    <span className="rounded-full border border-cyan-neon/30 px-2.5 py-1 font-mono text-[10px] text-cyan-neon">
                      ZONE 2–3
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-px bg-line">
                    {[
                      ["Time", MOCK.training.cardio.duration],
                      ["Incline", MOCK.training.cardio.incline],
                      ["Calories", `${MOCK.training.cardio.calories} kcal`],
                      ["Distance", MOCK.training.cardio.distance],
                      ["Avg HR", `${MOCK.training.cardio.avgHr} bpm`],
                      ["Pace", MOCK.training.cardio.pace],
                    ].map(([k, v]) => (
                      <div key={k} className="bg-card px-4 py-4">
                        <p className="text-[10px] uppercase tracking-wider text-slate-500">{k}</p>
                        <p className="mt-1 font-mono text-sm text-slate-100">{v}</p>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="rounded-2xl border border-line bg-card overflow-hidden">
                  <div className="px-5 py-4 border-b border-line flex items-center justify-between bg-gradient-to-r from-violet-neon/10 to-transparent">
                    <div>
                      <h4 className="font-semibold">{MOCK.training.strength.title}</h4>
                      <p className="text-[11px] text-slate-500">
                        {MOCK.training.strength.date} · {MOCK.training.strength.duration} · {MOCK.training.strength.calories} kcal · vol {MOCK.training.strength.volume}
                      </p>
                    </div>
                    <span className="rounded-full border border-violet-neon/30 px-2.5 py-1 font-mono text-[10px] text-violet-neon">
                      SUPERSETS
                    </span>
                  </div>
                  <div className="divide-y divide-line">
                    {MOCK.training.strength.supersets.map((block) => (
                      <div key={block.name} className="px-5 py-3">
                        <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-slate-500">{block.name}</p>
                        <div className="space-y-2">
                          {block.pairs.map((ex) => (
                            <div key={ex.exercise} className="flex items-center justify-between gap-3 text-sm">
                              <span className="text-slate-200">{ex.exercise}</span>
                              <span className="font-mono text-[11px] text-slate-400 whitespace-nowrap">
                                {ex.sets} × {ex.reps} · {ex.load}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              </div>
            </section>
          )}

          {show("nutrition") && (
            <section>
              <div className="mb-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber-300">Nutrition & supplements</p>
                <h3 className="text-xl font-semibold">Low-carbohydrate day</h3>
              </div>

              <div className="grid gap-4 lg:grid-cols-5">
                <article className="lg:col-span-3 rounded-2xl border border-line bg-card p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <p className="text-sm text-slate-300">Macro progress</p>
                    <p className="font-mono text-xs text-slate-500">
                      {MOCK.macros.calories.current} / {MOCK.macros.calories.target} kcal
                    </p>
                  </div>
                  <div className="space-y-4">
                    <MacroBar label="Protein" {...MOCK.macros.protein} tone="protein" />
                    <MacroBar label="Fat" {...MOCK.macros.fat} tone="fat" />
                    <MacroBar label="Carbohydrates" {...MOCK.macros.carbs} tone="carbs" />
                    <MacroBar label="Energy" {...MOCK.macros.calories} tone="calories" />
                  </div>
                  <p className="mt-5 text-xs text-slate-500 leading-relaxed">
                    Protocol: protein-forward, carb cap at 60 g. Remaining budget is best used around the next
                    incline session if HRV stays elevated.
                  </p>
                </article>

                <article className="lg:col-span-2 rounded-2xl border border-line bg-card p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm text-slate-300">Daily checklist</p>
                    <span className="font-mono text-[11px] text-cyan-neon">
                      {takenCount}/{supps.length}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {supps.map((s) => (
                      <li key={s.id}>
                        <button
                          onClick={() => toggleSupp(s.id)}
                          className={`w-full rounded-xl border px-3 py-3 text-left transition ${
                            s.taken
                              ? "border-cyan-neon/30 bg-cyan-neon/5"
                              : "border-line bg-void hover:border-slate-600"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span
                              className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-md border ${
                                s.taken ? "border-cyan-neon bg-cyan-neon text-void" : "border-slate-600"
                              }`}
                            >
                              {s.taken && (
                                <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M2 6.5l2.5 2.5L10 3.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </span>
                            <span>
                              <span className="block text-sm font-medium">{s.name}</span>
                              <span className="block text-[11px] text-slate-500">
                                {s.dose} · {s.timing}
                              </span>
                            </span>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [signedIn, setSignedIn] = useState(false);

  if (!signedIn) {
    return <LoginScreen onSignIn={() => setSignedIn(true)} />;
  }

  return <Dashboard onSignOut={() => setSignedIn(false)} />;
}
