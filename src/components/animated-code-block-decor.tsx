"use client";

import { useEffect, useRef, useState } from "react";

type Tone = "kw" | "str" | "num" | "cmt" | "fn";
type Token = [text: string, tone?: Tone];
type CodeScenario = { lines: Token[][]; executeLine: number };
type Phase = "typing" | "executing" | "settled";

const TONE: Record<Tone, string> = {
  kw: "color-mix(in srgb, var(--text-accent) 85%, white)",
  str: "var(--text-accent)",
  num: "color-mix(in srgb, var(--text-accent) 70%, white)",
  cmt: "color-mix(in srgb, var(--text-secondary) 60%, transparent)",
  fn: "color-mix(in srgb, var(--text-primary) 70%, transparent)",
};

const SCENARIOS: CodeScenario[] = [
  {
    lines: [
      [["const ", "kw"], ["system"], [" = {"]],
      [["  status: "], ['"Operational"', "str"], [","]],
      [["  integrity: "], ["100", "num"], [","]],
      [["  latency: "], ['"12ms"', "str"], ["," ]],
      [["};"]],
      [[""]],
      [["// Core infrastructure is ready", "cmt"]],
      [["system"], [".deploy", "fn"], ["();"]],
    ],
    executeLine: 7,
  },
  {
    lines: [
      [["const ", "kw"], ["release"], [" = "], ["await ", "kw"], ["build", "fn"], ["({"]],
      [["  region: "], ['"East Africa"', "str"], [","]],
      [["  version: "], ['"v3.0.0"', "str"]],
      [["});"]],
      [[""]],
      [["if ", "kw"], ["(release.ready) {"]],
      [["  publish", "fn"], ["(release);"]],
      [["}"]],
    ],
    executeLine: 6,
  },
  {
    lines: [
      [["async ", "kw"], ["function ", "kw"], ["syncRecords", "fn"], ["() {"]],
      [["  const ", "kw"], ["result"], [" = "], ["await ", "kw"], ["queue.flush", "fn"], ["();"]],
      [[""]],
      [["  if ", "kw"], ["(result.complete) {"]],
      [["    return ", "kw"], ["{ synced: "], ["true", "num"], [" };"]],
      [["  }"]],
      [[""]],
      [["  return ", "kw"], ["retry", "fn"], ["(result);"]],
      [["}"]],
      [["syncRecords", "fn"], ["();"]],
    ],
    executeLine: 9,
  },
];

function sourceFor(lines: Token[][]) {
  return lines.map((line) => line.map(([text]) => text).join("")).join("\n");
}

function characterDelay(character: string) {
  if (character === "\n") return 115;
  if (character === " ") return 12;
  return 18 + Math.floor(Math.random() * 20);
}

export default function AnimatedCodeBlockDecor({
  className,
  size = 384,
  opacity = 1,
}: {
  className?: string;
  size?: number;
  opacity?: number;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [typedCharacters, setTypedCharacters] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const scenario = SCENARIOS[scenarioIndex];
  const source = sourceFor(scenario.lines);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    if (!("IntersectionObserver" in window)) {
      const timer = setTimeout(() => setInView(true), 0);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.45,
    });
    observer.observe(panel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      const timer = window.setTimeout(() => {
        setTypedCharacters(source.length);
        setPhase("settled");
      }, 0);
      return () => window.clearTimeout(timer);
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    let index = 0;

    const typeNextCharacter = () => {
      index += 1;
      setTypedCharacters(index);

      if (index < source.length) {
        timers.push(setTimeout(typeNextCharacter, characterDelay(source[index])));
        return;
      }

      timers.push(setTimeout(() => setPhase("executing"), 280));
      timers.push(setTimeout(() => setPhase("settled"), 1_050));
      timers.push(setTimeout(() => setScenarioIndex((current) => (current + 1) % SCENARIOS.length), 3_250));
    };

    timers.push(setTimeout(() => {
      setTypedCharacters(0);
      setPhase("typing");
      typeNextCharacter();
    }, 280));
    return () => timers.forEach(clearTimeout);
  }, [inView, scenarioIndex, source]);

  let cursorLine = 0;
  let sourcePosition = 0;

  for (let index = 0; index < scenario.lines.length; index += 1) {
    const lineLength = scenario.lines[index].reduce((total, [text]) => total + text.length, 0);
    if (typedCharacters >= sourcePosition && typedCharacters <= sourcePosition + lineLength) {
      cursorLine = index;
      break;
    }
    sourcePosition += lineLength + 1;
    cursorLine = index;
  }

  if (phase !== "typing") cursorLine = scenario.executeLine;

  return (
    <div
      ref={panelRef}
      aria-hidden="true"
      className={`pointer-events-none absolute ${className ?? ""}`}
      style={{ width: size, height: size, opacity }}
    >
      <div
        className={`flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border-subtle tak-code-${phase}`}
        style={{ background: "var(--bg-code)" }}
      >
        <div className="flex items-center gap-2 px-5 pt-5 pb-3">
          {[0, 1, 2].map((index) => (
            <span key={index} className="block h-[9px] w-[9px] rounded-full" style={{ background: "#3f4442" }} />
          ))}
        </div>
        <div className="mx-5 border-t border-border-subtle" />
        <div className="font-mono-eyebrow flex flex-col gap-[5px] px-5 py-4 text-[10.5px] leading-[1.5] text-text-secondary">
          {scenario.lines.map((line, lineIndex) => {
            const charactersBeforeLine = scenario.lines
              .slice(0, lineIndex)
              .reduce(
                (total, priorLine) =>
                  total + priorLine.reduce((lineTotal, [text]) => lineTotal + text.length, 0) + 1,
                0,
              );
            const lineRemaining = typedCharacters - charactersBeforeLine;
            const isExecuting = lineIndex === scenario.executeLine && phase === "executing";

            return (
              <div
                key={lineIndex}
                className={`relative min-h-[1.5em] whitespace-pre ${isExecuting ? "tak-code-execute" : ""}`}
              >
                {line.map(([text, tone], tokenIndex) => {
                  const charactersBeforeToken = line
                    .slice(0, tokenIndex)
                    .reduce((total, [priorText]) => total + priorText.length, 0);
                  const visibleLength = Math.max(
                    0,
                    Math.min(text.length, lineRemaining - charactersBeforeToken),
                  );
                  return (
                    <span key={tokenIndex} style={tone ? { color: TONE[tone] } : undefined}>
                      {text.slice(0, visibleLength)}
                    </span>
                  );
                })}
                {lineIndex === cursorLine && phase === "typing" && <span className="tak-code-cursor" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
