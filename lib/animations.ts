/** Shared easing curve used across all motion components */
export const EASE_OUT_CUBIC: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Standard scroll-triggered animation preset */
export function scrollRevealProps(delay: number = 0) {
  return {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.7, delay, ease: EASE_OUT_CUBIC },
  } as const;
}
