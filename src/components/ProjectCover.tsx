import type { Cover } from "../data/content";

/** Covers for projects with no public site, drawn in code. Every detail on them is real. */
export function ProjectCover({ kind }: { kind: Cover }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-indigo text-starch">
      <div className="adire-dots absolute inset-0 text-starch/[0.07]" />
      <div className="relative flex h-full w-full items-center justify-center p-5 sm:p-8">
        {kind === "llm" && <Llm />}
        {kind === "translator" && <Translator />}
        {kind === "dropout" && <Dropout />}
        {kind === "kdp" && <Kdp />}
      </div>
    </div>
  );
}

function Window({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="w-full max-w-[440px] overflow-hidden rounded-xl border border-starch/15 bg-indigo-deep/80 shadow-2xl">
      <div className="flex items-center gap-1.5 border-b border-starch/10 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-coral" /><span className="h-2 w-2 rounded-full bg-starch/30" /><span className="h-2 w-2 rounded-full bg-starch/30" />
        <span className="ml-2 font-mono text-[10px] text-starch/60">{title}</span>
      </div>
      <div className="p-3 sm:p-4">{children}</div>
    </div>
  );
}

function Llm() {
  const models = [["mistral-7b", true], ["qwen-72b · 4-bit", false], ["deepseek-r1", false]] as const;
  return (
    <Window title="colab-gpu · flask api">
      <div className="space-y-1 font-mono text-[10px] leading-relaxed sm:text-[11px]">
        <p><span className="text-coral">POST</span> /generate <span className="text-starch/50">→ 200</span></p>
        <p><span className="text-coral">GET</span>&nbsp; /health&nbsp;&nbsp; <span className="text-starch/50">→ ok · A100</span></p>
        <p><span className="text-coral">POST</span> /switch&nbsp;&nbsp; <span className="text-starch/50">→ qwen-72b</span></p>
        <p><span className="text-coral">GET</span>&nbsp; /models</p>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {models.map(([m, on]) => (
          <span key={m} className={`rounded-full border px-2 py-0.5 font-mono text-[10px] ${on ? "border-coral bg-coral/15 text-starch" : "border-starch/20 text-starch/70"}`}>{on ? "● " : "○ "}{m}</span>
        ))}
      </div>
      <p className="mt-3 font-mono text-[10px] text-starch/50">cloudflare tunnel → public url · $0 infra</p>
    </Window>
  );
}

function Translator() {
  return (
    <div className="flex w-full max-w-[440px] flex-col gap-3">
      <Bubble lang="EN" align="start" lines={[90, 70]} />
      <div className="flex items-center gap-2 self-center font-mono text-[10px] text-starch/60">
        <span className="h-px w-8 bg-starch/30" /> seq2seq · banking domain <span className="h-px w-8 bg-starch/30" />
      </div>
      <Bubble lang="YO" align="end" lines={[80, 95, 55]} accent />
      <p className="self-center font-display text-2xl font-bold tracking-wide text-starch/80">ẹ ọ ṣ à é ò</p>
    </div>
  );
}
function Bubble({ lang, align, lines, accent }: { lang: string; align: "start" | "end"; lines: number[]; accent?: boolean }) {
  return (
    <div className={`w-4/5 rounded-2xl border p-3 ${align === "end" ? "self-end rounded-br-sm" : "self-start rounded-bl-sm"} ${accent ? "border-coral/50 bg-coral/10" : "border-starch/15 bg-indigo-deep/70"}`}>
      <span className={`font-mono text-[10px] font-bold ${accent ? "text-coral" : "text-starch/60"}`}>{lang}</span>
      <div className="mt-2 space-y-1.5">{lines.map((w, i) => <div key={i} className="h-1.5 rounded-full bg-starch/25" style={{ width: `${w}%` }} />)}</div>
    </div>
  );
}

// Real values from the model's SHAP global ranking (mean |SHAP|).
const SHAP = [["Fee payment status", 0.164], ["Attendance rate", 0.145], ["CA score", 0.139], ["Exam score", 0.131], ["Distance to school", 0.048]] as const;
function Dropout() {
  return (
    <Window title="shap · global feature importance">
      <div className="space-y-2.5">
        {SHAP.map(([name, v], i) => (
          <div key={name} className="grid grid-cols-[1fr_1.4fr] items-center gap-3">
            <span className="truncate font-mono text-[10px] text-starch/75 sm:text-[11px]">{name}</span>
            <div className="h-2.5 rounded-full bg-starch/10">
              <div className={`h-full rounded-full ${i === 0 ? "bg-coral" : "bg-starch/70"}`} style={{ width: `${(v / 0.164) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 font-mono text-[10px] text-starch/50">logistic regression · random forest · xgboost</p>
    </Window>
  );
}

function Kdp() {
  const rows = [78, 64, 52, 41, 33];
  return (
    <Window title="kdp mate · niche research">
      <div className="grid grid-cols-[64px_1fr] gap-3">
        <div className="space-y-1.5">
          {["Keywords", "Niches", "Saved", "Books"].map((t, i) => (
            <div key={t} className={`rounded px-2 py-1 font-mono text-[9px] ${i === 0 ? "bg-coral/20 text-starch" : "text-starch/55"}`}>{t}</div>
          ))}
        </div>
        <div className="space-y-2">
          {rows.map((w, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-1.5 flex-1 rounded-full bg-starch/10"><div className="h-full rounded-full bg-starch/60" style={{ width: `${w}%` }} /></div>
              <span className={`h-1.5 w-6 rounded-full ${i < 2 ? "bg-coral" : "bg-starch/25"}`} />
            </div>
          ))}
          <p className="pt-1 font-mono text-[9px] text-starch/50">bsr · est. sales · opportunity score</p>
        </div>
      </div>
      <p className="mt-3 font-mono text-[10px] text-starch/50">electron · sqlite · browser extension</p>
    </Window>
  );
}
