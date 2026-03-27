"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/* ════════════════════════════════════════════════
   DOCKERFILE LINES (19 lines matching screenshot)
   ════════════════════════════════════════════════ */
const DOCKERFILE = [
  '',                                                    // 1
  '',                                                    // 2
  '',                                                    // 3 <- cursor types here
  '',                                                    // 4
  '# Set working directory inside container',            // 5
  'WORKDIR /app',                                        // 6
  '',                                                    // 7
  '# Upgrade pip to latest',                             // 8
  'RUN pip install --upgrade pip',                       // 9
  '',                                                    // 10
  '# Copy application files into the container',        // 11
  'COPY . .',                                            // 12
  '',                                                    // 13
  '# Install dependencies (if requirements.txt exists)',// 14
  'RUN pip install --no-cache-dir -r requirements.txt', // 15
  '',                                                    // 16
  '# Default command to run',                            // 17
  'CMD ["python", "app.py"]',                            // 18
  '',                                                    // 19
];

const FROM_TEXT = 'FROM python:3.12.0';

/* ════════════════════════════════════════════════
   CVE TERMINAL LINES (matching screenshot)
   ════════════════════════════════════════════════ */
const CVE_LINES = [
  { ts: '2025-03-06T14:09:33', tag: 'INFO', color: '#a78bfa', text: 'Vulnerability scanning is enabled' },
  { ts: '2025-03-06T14:09:33', tag: 'INFO', color: '#a78bfa', text: 'Secret scanning is enabled' },
  { ts: '2025-03-06T14:09:33', tag: 'INFO', color: '#a78bfa', text: "If your scanning is slow, please try '--scanners vuln'" },
  { ts: '2025-03-06T14:09:40', tag: 'INFO', color: '#a78bfa', text: 'Detected OS family="debian" version="12.9"' },
  { ts: '2025-03-06T14:09:40', tag: 'INFO', color: '#a78bfa', text: 'Detecting vulnerabilities... os_version="12"' },
  { ts: '2025-03-06T14:09:40', tag: 'INFO', color: '#a78bfa', text: 'Number of language-specific files num=1' },
  { ts: '2025-03-06T14:09:40', tag: 'WARN', color: '#facc15', text: 'Using severities from other vendors' },
];

const CVE_COMMAND = 'trivy image python:latest';

const TABLE_ROWS = [
  { lib: 'apt', cve: 'CVE-2011-3374', sev: 'LOW', sevColor: '#facc15', status: 'affected', ver: '2.6.1' },
  { lib: 'libc6', cve: 'CVE-2024-2961', sev: 'HIGH', sevColor: '#f87171', status: 'affected', ver: '2.36-9' },
  { lib: 'openssl', cve: 'CVE-2024-0727', sev: 'MEDIUM', sevColor: '#fb923c', status: 'affected', ver: '3.0.11' },
];

const PHASE_DUR = [600, 1800, 800, 1600, 1000, 400, 1200, 1800, 2400, 1500];

/* ════════════════════════════════════════════════
   SYNTAX COLOR HELPER
   ════════════════════════════════════════════════ */
function syntaxColor(line: string): { kw: string; kwC: string; rest: string; restC: string } {
  if (line.startsWith('#')) return { kw: '', kwC: '', rest: line, restC: '#6A9955' };
  if (line.startsWith('FROM')) return { kw: 'FROM', kwC: '#c586c0', rest: line.slice(4), restC: '#9cdcfe' };
  if (line.startsWith('WORKDIR')) return { kw: 'WORKDIR', kwC: '#569cd6', rest: line.slice(7), restC: '#ce9178' };
  if (line.startsWith('RUN')) return { kw: 'RUN', kwC: '#569cd6', rest: line.slice(3), restC: '#dcdcdc' };
  if (line.startsWith('COPY')) return { kw: 'COPY', kwC: '#569cd6', rest: line.slice(4), restC: '#dcdcdc' };
  if (line.startsWith('CMD')) return { kw: 'CMD', kwC: '#569cd6', rest: line.slice(3), restC: '#ce9178' };
  return { kw: '', kwC: '', rest: line, restC: '#dcdcdc' };
}

/* ════════════════════════════════════════════════
   BLINKING TEXT CARET
   ════════════════════════════════════════════════ */
function Caret() {
  return (
    <motion.span
      className="inline-block w-[2px] h-[1.15em] align-middle ml-[1px]"
      style={{ background: '#ffffffdd' }}
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.53, repeat: Infinity, repeatType: 'reverse' }}
    />
  );
}

/* ════════════════════════════════════════════════
   CUSTOM AUTO-CURSOR (white arrow + cyan glow)
   ════════════════════════════════════════════════ */
interface CursorXY {
  x: number;
  y: number;
  visible: boolean;
  clicking: boolean;
}

function AutoCursor({ x, y, visible, clicking }: CursorXY) {
  return (
    <motion.div
      className="absolute z-50 pointer-events-none"
      animate={{ left: x, top: y, opacity: visible ? 1 : 0 }}
      transition={{
        left: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        top: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.2 },
      }}
      style={{ filter: 'drop-shadow(0 2px 10px rgba(6,199,242,0.4))' }}
    >
      <motion.svg
        width="18"
        height="22"
        viewBox="0 0 20 24"
        fill="none"
        animate={{ scale: clicking ? 0.78 : 1 }}
        transition={{ duration: 0.1 }}
      >
        <path
          d="M1 1L1 17.5L5.5 13.5L9.5 22L12.5 20.5L8.5 12H14.5L1 1Z"
          fill="white"
          stroke="rgba(6,199,242,0.65)"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </motion.svg>
      <AnimatePresence>
        {clicking && (
          <motion.div
            className="absolute top-[2px] left-[2px] w-5 h-5 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(6,199,242,0.55) 0%, transparent 70%)' }}
            initial={{ scale: 0.3, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════ */
export function SidePanelAnimation({ title }: { title?: string }) {
  const [phase, setPhase] = useState(0);
  const [typedCount, setTypedCount] = useState(0);
  const [cveTypedCount, setCveTypedCount] = useState(0);
  const [codeVisible, setCodeVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [highlightFrom, setHighlightFrom] = useState(false);
  const [showCVE, setShowCVE] = useState(false);
  const [termLinesShown, setTermLinesShown] = useState(0);
  const [showTotal, setShowTotal] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [cursorClicking, setCursorClicking] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout | typeof setInterval>[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => clearTimeout(t as unknown as number));
    timers.current = [];
  }, []);

  const resetAll = useCallback(() => {
    setTypedCount(0);
    setCveTypedCount(0);
    setCodeVisible(false);
    setScrollY(0);
    setHighlightFrom(false);
    setShowCVE(false);
    setTermLinesShown(0);
    setShowTotal(false);
    setShowTable(false);
    setCursorClicking(false);
  }, []);

  useEffect(() => {
    clearTimers();

    switch (phase) {
      case 0: {
        resetAll();
        const t = setTimeout(() => setPhase(1), PHASE_DUR[0]);
        timers.current.push(t);
        break;
      }

      case 1: {
        let i = 0;
        const iv = setInterval(() => {
          i++;
          setTypedCount(i);
          if (i >= FROM_TEXT.length) {
            clearInterval(iv);
            const t = setTimeout(() => setPhase(2), 300);
            timers.current.push(t);
          }
        }, Math.floor(PHASE_DUR[1] / FROM_TEXT.length));
        timers.current.push(iv);
        break;
      }

      case 2: {
        setCodeVisible(true);
        const t = setTimeout(() => setPhase(3), PHASE_DUR[2]);
        timers.current.push(t);
        break;
      }

      case 3: {
        const steps = 40;
        const maxScroll = 200;
        let step = 0;
        const iv = setInterval(() => {
          step++;
          const p = step / steps;
          const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
          setScrollY(eased * maxScroll);
          if (step >= steps) {
            clearInterval(iv);
            const t = setTimeout(() => setPhase(4), 200);
            timers.current.push(t);
          }
        }, PHASE_DUR[3] / steps);
        timers.current.push(iv);
        break;
      }

      case 4: {
        setScrollY(0);
        const t1 = setTimeout(() => setHighlightFrom(true), 300);
        const t2 = setTimeout(() => {
          setCursorClicking(true);
          setTimeout(() => setCursorClicking(false), 300);
        }, 500);
        const t3 = setTimeout(() => setPhase(5), PHASE_DUR[4]);
        timers.current.push(t1, t2, t3);
        break;
      }

      case 5: {
        setHighlightFrom(false);
        setShowCVE(true);
        const t = setTimeout(() => setPhase(6), PHASE_DUR[5]);
        timers.current.push(t);
        break;
      }

      case 6: {
        let i = 0;
        const iv = setInterval(() => {
          i++;
          setCveTypedCount(i);
          if (i >= CVE_COMMAND.length) {
            clearInterval(iv);
            const t = setTimeout(() => setPhase(7), 200);
            timers.current.push(t);
          }
        }, Math.floor(PHASE_DUR[6] / CVE_COMMAND.length));
        timers.current.push(iv);
        break;
      }

      case 7: {
        let i = 0;
        const iv = setInterval(() => {
          i++;
          setTermLinesShown(i);
          if (i >= CVE_LINES.length) {
            clearInterval(iv);
            const t = setTimeout(() => setPhase(8), 200);
            timers.current.push(t);
          }
        }, Math.floor(PHASE_DUR[7] / CVE_LINES.length));
        timers.current.push(iv);
        break;
      }

      case 8: {
        const t1 = setTimeout(() => setShowTotal(true), 300);
        const t2 = setTimeout(() => {
          setCursorClicking(true);
          setTimeout(() => setCursorClicking(false), 300);
        }, 500);
        const t3 = setTimeout(() => setShowTable(true), 1000);
        const t4 = setTimeout(() => setPhase(9), PHASE_DUR[8]);
        timers.current.push(t1, t2, t3, t4);
        break;
      }

      case 9: {
        const t = setTimeout(() => setPhase(0), PHASE_DUR[9]);
        timers.current.push(t);
        break;
      }
    }

    return clearTimers;
  }, [phase, clearTimers, resetAll]);

  const cursorPos: CursorXY = (() => {
    switch (phase) {
      case 0:
        return { x: 70, y: 82, visible: true, clicking: false };
      case 1: {
        const charW = 8.2;
        const baseX = 58 + typedCount * charW;
        return { x: Math.min(baseX, 350), y: 82, visible: true, clicking: false };
      }
      case 2:
        return { x: 200, y: 140, visible: true, clicking: false };
      case 3: {
        const p = scrollY / 200;
        return { x: 220, y: 150 + p * 120, visible: true, clicking: false };
      }
      case 4:
        return { x: 260, y: 82, visible: true, clicking: cursorClicking };
      case 5:
        return { x: 200, y: 60, visible: false, clicking: false };
      case 6: {
        const charW = 7.5;
        return { x: 95 + cveTypedCount * charW, y: 108, visible: true, clicking: false };
      }
      case 7: {
        const y = 140 + termLinesShown * 18;
        return { x: 170 + Math.sin(termLinesShown) * 30, y: Math.min(y, 310), visible: true, clicking: false };
      }
      case 8:
        return { x: 200, y: showTable ? 420 : 350, visible: true, clicking: cursorClicking };
      case 9:
        return { x: 250, y: 380, visible: true, clicking: false };
      default:
        return { x: 100, y: 100, visible: false, clicking: false };
    }
  })();

  const isEditor = !showCVE;

  return (
    <div
      className={`${title ? '' : 'rounded-[16px] md:rounded-[20px]'} relative overflow-hidden flex flex-col h-full w-full`}
      style={{
        background: 'linear-gradient(180deg, #0d1b2e 0%, #091324 100%)',
        border: title ? 'none' : '1px solid rgba(6,199,242,0.12)',
        boxShadow: title
          ? 'none'
          : '0 0 60px rgba(6,199,242,0.05), 0 0 120px rgba(6,199,242,0.02), 0 20px 60px rgba(0,0,0,0.5)',
      }}
    >
      <AutoCursor {...cursorPos} />

      <div
        className="flex items-center px-4 md:px-5 py-3 shrink-0"
        style={{
          background: 'linear-gradient(180deg, rgba(20,35,60,0.95) 0%, rgba(14,26,48,0.9) 100%)',
          borderBottom: '1px solid rgba(6,199,242,0.08)',
        }}
      >
        <div className="flex items-center gap-[7px]">
          <div className="w-[11px] h-[11px] rounded-full bg-[#ff5f57]" />
          <div className="w-[11px] h-[11px] rounded-full bg-[#febc2e]" />
          <div className="w-[11px] h-[11px] rounded-full bg-[#28c840]" />
        </div>
        {title ? (
          <span className="font-['Google_Sans',sans-serif] font-normal text-white text-[20px] md:text-[28px] lg:text-[36px] ml-5 md:ml-8 tracking-[-0.5px] select-none">
            {title}
          </span>
        ) : (
          <span className="text-white/25 text-[12px] font-mono ml-4 tracking-wide select-none">
            {showCVE ? 'terminal — bash' : 'Dockerfile'}
          </span>
        )}
      </div>

      <div className="h-[1px] shrink-0" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(6,199,242,0.2) 30%, rgba(6,199,242,0.3) 50%, rgba(6,199,242,0.2) 70%, transparent 100%)' }} />

      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {isEditor ? (
            <motion.div
              key="editor"
              className="absolute inset-0 font-mono px-4 md:px-5 pt-4 pb-3 overflow-hidden"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div style={{ transform: `translateY(-${scrollY}px)`, transition: 'none' }}>
                {DOCKERFILE.map((line, i) => {
                  const lineNum = i + 1;
                  const isFromLine = i === 2;
                  const syn = syntaxColor(isFromLine ? FROM_TEXT : line);

                  let fromDisplay = '';
                  if (isFromLine) {
                    fromDisplay = FROM_TEXT.slice(0, typedCount);
                  }

                  const vis = i <= 2 || codeVisible;

                  return (
                    <div
                      key={lineNum}
                      className="flex leading-[1.85] relative"
                      style={{
                        opacity: vis ? 1 : 0,
                        transition: i > 2 ? 'opacity 0.4s ease' : 'none',
                      }}
                    >
                      {isFromLine && highlightFrom && (
                        <motion.div
                          className="absolute inset-0 -mx-1 rounded-[4px]"
                          style={{
                            background: 'rgba(6,199,242,0.07)',
                            border: '1px solid rgba(6,199,242,0.18)',
                            boxShadow: '0 0 20px rgba(6,199,242,0.06)',
                          }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}

                      <span className="text-white/15 select-none w-[38px] text-right shrink-0 text-[12px] md:text-[13px] pr-4 relative z-10">
                        {lineNum}
                      </span>

                      <span className="relative z-10 text-[12px] md:text-[13px] pl-1">
                        {isFromLine ? (
                          <>
                            {fromDisplay.length > 0 && fromDisplay.length <= 4 && (
                              <span style={{ color: syn.kwC }}>{fromDisplay}</span>
                            )}
                            {fromDisplay.length > 4 && (
                              <>
                                <span style={{ color: syn.kwC }}>FROM</span>
                                <span style={{ color: syn.restC }}>{fromDisplay.slice(4)}</span>
                              </>
                            )}
                            {phase <= 1 && <Caret />}
                          </>
                        ) : line ? (
                          syn.kw ? (
                            <>
                              <span style={{ color: syn.kwC }}>{syn.kw}</span>
                              <span style={{ color: syn.restC }}>{syn.rest}</span>
                            </>
                          ) : (
                            <span style={{ color: syn.restC }}>{syn.rest}</span>
                          )
                        ) : (
                          <span>{'\u00A0'}</span>
                        )}
                        {lineNum === 19 && codeVisible && phase >= 2 && phase <= 4 && <Caret />}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="cve"
              className="absolute inset-0 font-mono px-4 md:px-5 pt-4 pb-3 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
            >
              <div className="text-white text-[17px] md:text-[19px] font-semibold mb-3 tracking-tight">
                CVE Report
              </div>

              <div className="text-[10px] md:text-[11px] leading-[1.65] mb-1.5">
                <div className="text-white/25">biswajitde@MBP ~ %</div>
                <div className="flex items-center flex-wrap">
                  <span className="text-white/25">biswajitde@MBP ~ % </span>
                  <span
                    className="text-white px-1 py-[1px] rounded-[2px]"
                    style={{ background: 'rgba(80,130,200,0.3)' }}
                  >
                    {CVE_COMMAND.slice(0, cveTypedCount)}
                  </span>
                  {phase === 6 && <Caret />}
                </div>
              </div>

              <div className="flex flex-col gap-0 mt-1 mb-2">
                {CVE_LINES.slice(0, termLinesShown).map((line, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start text-[9px] md:text-[10px] leading-[1.65] overflow-hidden whitespace-nowrap"
                    initial={{ opacity: 0, x: -3 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.12 }}
                  >
                    <span className="text-white/20 shrink-0">{line.ts}</span>
                    <span className="shrink-0 ml-1.5 font-semibold w-[30px]" style={{ color: line.color }}>
                      {line.tag}
                    </span>
                    <span className="text-white/40 ml-1.5 truncate">{line.text}</span>
                  </motion.div>
                ))}
              </div>

              {showTotal && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="text-white/40 text-[10px] md:text-[11px] mb-1.5">
                    python:latest (debian 12.9)
                  </p>
                  <motion.div
                    className="rounded-[4px] px-3 py-2 mb-3"
                    style={{ background: 'rgba(220,38,38,0.85)' }}
                    initial={{ scaleX: 0.85, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="text-white text-[10px] md:text-[12px] font-semibold tracking-wide">
                      Total: 1365 (UNKNOWN: 2, LOW: 675, MEDIUM: 586, HIGH: 96, CRITICAL: 6)
                    </span>
                  </motion.div>
                </motion.div>
              )}

              {showTable && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div
                    className="grid grid-cols-[1.2fr_1.5fr_0.7fr_0.7fr_0.7fr] gap-x-2 text-[9px] md:text-[10px] px-2 py-[5px] border-b border-white/10"
                    style={{ background: 'rgba(255,255,255,0.03)' }}
                  >
                    <span className="text-white/50 font-semibold">Library</span>
                    <span className="text-white/50 font-semibold">Vulnerability</span>
                    <span className="text-white/50 font-semibold">Severity</span>
                    <span className="text-white/50 font-semibold">Status</span>
                    <span className="text-white/50 font-semibold">Installed</span>
                  </div>
                  {TABLE_ROWS.map((row, i) => (
                    <motion.div
                      key={i}
                      className="grid grid-cols-[1.2fr_1.5fr_0.7fr_0.7fr_0.7fr] gap-x-2 text-[9px] md:text-[10px] px-2 py-[5px] border-b border-white/[0.04]"
                      style={{ opacity: i === 0 ? 1 : 0.45 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: i === 0 ? 1 : 0.45 }}
                      transition={{ delay: i * 0.12, duration: 0.25 }}
                    >
                      <span className="text-white/60">{row.lib}</span>
                      <span className="text-white/60">{row.cve}</span>
                      <span className="font-semibold" style={{ color: row.sevColor }}>{row.sev}</span>
                      <span className="text-white/40">{row.status}</span>
                      <span className="text-white/40">{row.ver}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="h-[2px] bg-white/[0.02] relative shrink-0">
        <motion.div
          className="absolute top-0 left-0 h-full"
          style={{ background: 'rgba(6,199,242,0.25)' }}
          animate={{
            width: `${((PHASE_DUR.slice(0, phase).reduce((a, b) => a + b, 0)) / PHASE_DUR.reduce((a, b) => a + b, 0)) * 100}%`,
          }}
          transition={{ duration: 0.5, ease: 'linear' }}
        />
      </div>
    </div>
  );
}
